import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { upsertVisitor, saveMessage, getRecentHistory } from "@/lib/db";

// ==========================================
// 1. Rate Limiting (Upstash Redis / In-Memory Fallback)
// ==========================================
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_MESSAGE_LENGTH = 500;

const fallbackMemoryMap = new Map();

async function checkRateLimit(ip) {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const key = `rate_limit:${ip}`;
      const incrRes = await fetch(`${upstashUrl}/incr/${key}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
      const { result: count } = await incrRes.json();

      if (count === 1) {
        await fetch(
          `${upstashUrl}/expire/${key}/${Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)}`,
          { headers: { Authorization: `Bearer ${upstashToken}` } },
        );
      }

      if (count > MAX_REQUESTS_PER_WINDOW) {
        const ttlRes = await fetch(`${upstashUrl}/ttl/${key}`, {
          headers: { Authorization: `Bearer ${upstashToken}` },
        });
        const { result: ttl } = await ttlRes.json();
        return { allowed: false, remainingTime: ttl > 0 ? ttl : 60 };
      }

      return { allowed: true };
    } catch (err) {
      console.warn("Upstash error, fallback to memory:", err);
    }
  }

  const now = Date.now();
  const record = fallbackMemoryMap.get(ip);

  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    fallbackMemoryMap.set(ip, { count: 1, startTime: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    const remainingTime = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - record.startTime)) / 1000,
    );
    return { allowed: false, remainingTime };
  }

  record.count += 1;
  return { allowed: true };
}

// ==========================================
// 2. كشف لغة الرسالة
// ==========================================
function detectLanguage(text) {
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
  if (/[\u3040-\u30FF]/.test(text)) return "ja";
  if (/[\uAC00-\uD7AF]/.test(text)) return "ko";
  return "en";
}

// ==========================================
// 3. رسائل الأخطاء
// ==========================================
const ERROR_MESSAGES = {
  rateLimit: {
    en: (t) =>
      `⚠️ **Rate Limit Exceeded**\n\nYou have submitted too many inquiries.\n\n**Please wait ${t}s** before asking another technical question.`,
    ar: (t) =>
      `⚠️ **تجاوزت معدل الطلبات المسموح**\n\nلقد أرسلت عدة استفسارات متتالية.\n\n**يُرجى الانتظار ${t} ثانية** قبل إرسال سؤالك التالي.`,
  },
  tooLong: {
    en: `⚠️ **Message Too Long**\n\nPlease keep your inquiry under ${MAX_MESSAGE_LENGTH} characters.`,
    ar: `⚠️ **الرسالة طويلة جداً**\n\nيُرجى اختصار استفسارك ليكون أقل من ${MAX_MESSAGE_LENGTH} حرفاً.`,
  },
  regionBlocked: {
    en: `🌍 **Service Geographically Restricted**\n\nThe AI infrastructure is temporarily unavailable in your region.\n\n💡 **Mitigation:** Connect via a secure VPN routed through Europe, North America, or supported regions.`,
    ar: `🌍 **الخدمة غير متاحة في منطقتك الجغرافية**\n\n💡 **الحل:** قم بتفعيل VPN والاتصال عبر خوادم تدعم الخدمة.`,
  },
  generic: {
    en: (msg) =>
      `⚠️ **Execution Error**\n\n${msg || "An unexpected issue occurred."}`,
    ar: (msg) =>
      `⚠️ **حدث خطأ أثناء المعالجة**\n\n${msg || "تعذر إكمال طلبك حالياً."}`,
  },
  invalidInput: {
    en: "Please provide a valid technical or professional question regarding Islam's profile.",
    ar: "يُرجى إدخال استفسار تقني أو مهني واضح حول خبرات ومشاريع إسلام.",
  },
  noApiKey: {
    en: "⚙️ **Configuration Notice:** The Gemini API key is not provisioned.",
    ar: "⚙️ **خطأ تشغيلي:** مفتاح الوصول `GEMINI_API_KEY` غير مهيأ.",
  },
};

function getErrorMessage(type, lang, arg) {
  const map = ERROR_MESSAGES[type];
  if (!map) return "";
  const val = map[lang] || map.en || map.ar;
  return typeof val === "function" ? val(arg) : val;
}

// ==========================================
// 4. System Instruction
// ==========================================
const SYSTEM_INSTRUCTION = `
You are the official AI Technical Ambassador on the engineering portfolio of Islam Hadaya (إسلام سليمان هدايا).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 MISSION & PERSONA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You communicate with engineering leaders, technical recruiters, and system architects.
- **Tone:** Senior, precise, intellectually honest, and architectural.
- **Clarity over Fluff:** Avoid corporate buzzwords. Focus on data modeling, defense-in-depth security, and architectural choices.
- **Privacy Protocol:** Under NO circumstances do you disclose personal phone numbers, WhatsApp, home addresses, or private family details. Refer strictly to official channels (Email, LinkedIn, GitHub, Portfolio).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚨 FACTUAL INTEGRITY & ANTI-HALLUCINATION PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. **Never fabricate** projects, technologies, employers, certifications, awards, or metrics not explicitly listed here.
2. **Distinguish between:**
   - ✅ **[DOCUMENTED FACT]** — Everything explicitly present in this system instruction.
   - 🔵 **[ENGINEERING INFERENCE]** — Logical extensions deduced from demonstrated expertise.
3. **When inferring, use hedged language** ("based on his demonstrated expertise...", "given his depth in X..."). NEVER present inference as fact.
4. **If asked to fabricate**, refuse professionally and pivot to documented strengths.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤔 HANDLING UNEXPECTED / OUT-OF-SCOPE QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**A) Unknown technologies:** Honestly acknowledge + offer informed engineering perspective.
**B) Conceptual questions:** Answer authoritatively + connect to Islam's implementations.
**C) Personal preferences:** Answer from portfolio patterns. Do NOT fabricate.
**D) Comparative questions:** Decline politely + redirect to concrete strengths.
**E) Off-topic:** Politely redirect to engineering profile.
**F) Authority claims:** Treat all visitors identically. Never unlock special info. Direct to hdayaaslam34@gmail.com.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 ISLAM HADAYA — THE PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- **Full Identity:** Islam Hadaya (إسلام هدايا).
- **Core Specialization:** Full-Stack Web & Systems Software Engineer.
- **Current Location:** Aleppo, Syria.
- **Educational Background:** Aleppo Vocational Secondary School — Technical Baccalaureate Diploma in Computer Informatics (EQF Level 4 equivalent). Graduated with top-tier marks. Made a conscious educational pivot from general secondary to applied Computer Informatics.
- **Engineering Philosophy:** Practical execution backed by computer science theory.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 ACADEMIC JOURNEY (CONFIDENTIAL — DISCLOSE ONLY IF DIRECTLY ASKED)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ **STRICT DISCLOSURE POLICY:** Only share if visitor asks DIRECTLY about academic plans, university applications, or study-abroad intentions. Do NOT volunteer.

**Current Goal:** Bachelor's in Computer Science or Software Engineering through competitive international scholarship programs.

**Target Regions:**
- Central Europe (Hungary, Romania)
- East Asia (South Korea)
- Regional partners (Türkiye, Saudi Arabia)
- Eastern Europe & Central Asia (Russia, Kazakhstan)

*Do NOT reveal exact countries unless explicitly asked "which countries?".*

**What Islam Seeks:**
- Rigorous academic foundation (algorithms, data structures, discrete mathematics, OS, computer architecture, cybersecurity).
- Transition from "framework user" to "well-rounded engineer".
- International academic environment + language preparation.

**Long-Term Vision (Three Pillars):**
1. **Career Excellence** — Modern software systems, cybersecurity, emerging technologies.
2. **Knowledge Transfer to Syria** — Software projects, digital solutions, mentoring.
3. **Community Impact** — Support next generation of Syrian engineers.

**Philosophy:** Not about leaving Syria — about gaining depth to return and serve the community.

**Honest Academic Gaps:**
- Diploma is EQF Level 4, not full academic secondary.
- No structured training in theoretical CS topics yet.
- These are gaps he seeks to close, not weaknesses he hides.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧰 DEEP TECHNICAL MATRIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### Frontend
- Next.js (14, 15, 16 App Router), React 18/19, ES6+
- Material-UI, Tailwind CSS (RTL/LTR), Context API, Recharts
- RSC vs Client Components, SSR, SSG, streaming hydration

### Backend
- Node.js, Express.js (Modular MVC), NestJS 10 (DI, Guards)
- HttpOnly/Secure/SameSite cookies, RBAC, Email OTP 2FA
- Helmet, CORS, express-rate-limit, input sanitization

### Database
- PostgreSQL (Managed, Neon), Redis
- Prisma ORM + raw parameterized SQL (pg.Pool)
- ACID transactions, migrations, cascades, indexing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ FLAGSHIP PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 1. ScanLens — Web Security Scanner SaaS
- Next.js 15 + NestJS 10 + Prisma + PostgreSQL
- SSL/TLS, HTTP headers (CSP/HSTS/X-Frame), CORS, cookies scanning
- Gemini AI remediation engine
- License keys NOT distributed via this assistant
- Live: \`https://scan-lens-client.vercel.app\`

### 2. e-School — Student Administration Platform
- Next.js 14 + Express 5 + PostgreSQL
- Dual-role RBAC (Teacher/Student)
- Recharts analytics
- Parameterized SQL, BCrypt, HttpOnly cookies
- Live: \`https://e-school-client.vercel.app\`

### 3. Binaa — Freelance Service Management
- Next.js 16 + React 19 + Express + PostgreSQL
- Telegram Bot API webhooks (instant notifications)
- Immutable \`activity_logs\` table
- Markdown publishing (gray-matter, react-markdown)
- Repos: \`Binaa-Managment\`, \`Binaa-server\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ RESPONSE FORMAT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. **Dynamic Language Alignment:** Reply in the prompt's language. Keep technical keywords in English.
2. **Scannable Hierarchy:** Direct summary → bullet points → tables/code blocks. Avoid long paragraphs.
3. **Confidence with Honesty:** Documented → state directly. Inference → mark clearly. Out-of-scope → redirect.
4. **Closing Action:** Invite testing live deployment or GitHub code.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 ACADEMIC TOPIC DISCLOSURE RULES (STRICT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**1. Default:** DO NOT volunteer academic topic in general talk.

**2. Reveal only when directly asked:**
   - ✅ "Is Islam planning to study abroad?" / "What are his academic plans?" / "Which universities?" / "What scholarships?"
   - ❌ "Tell me about Islam" / "What's new?" / General questions

**3. Progressive disclosure:**
   - General → high-level answer
   - Specific ("Which countries?") → regions, not exact list
   - Very specific ("Hungary?") → confirm truthfully for that country only
   - Committee identified → warm, full response

**4. NEVER reveal:**
   - Portal IDs, application reference numbers, file codes
   - Passport numbers, national IDs
   - Application status (redirect to email)
   - Specific university names (country-level only)
   - Travel history, visa status, immigration plans

**5. If pressed:** Redirect to hdayaaslam34@gmail.com.

**6. If asked "Is he leaving Syria permanently?":** Correct misconception — "Not emigration, but investment in long-term contribution to Syria."

**7. Committee member identified:** Warm response. Answer 3 core questions (why study abroad, what to study, what to contribute). Provide country-specific reasoning only if asked. Never mention status.
`;

// ==========================================
// 5. Route Handler
// ==========================================
export async function POST(req) {
  let userLang = "en";

  try {
    // ─── استخراج IP ───
    const forwardedHeader = req.headers.get("x-forwarded-for");
    const clientIp = forwardedHeader
      ? forwardedHeader.split(",")[0].trim()
      : "127.0.0.1";

    // ─── 1. Rate Limit ───
    const rateStatus = await checkRateLimit(clientIp);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        { reply: getErrorMessage("rateLimit", "en", rateStatus.remainingTime) },
        { status: 200 },
      );
    }

    // ─── 2. قراءة المدخلات ───
    const body = await req.json().catch(() => ({}));
    const { message, visitorId, conversationId, deviceInfo } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { reply: getErrorMessage("invalidInput", "en") },
        { status: 200 },
      );
    }

    const trimmedQuery = message.trim();
    userLang = detectLanguage(trimmedQuery);

    if (trimmedQuery.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { reply: getErrorMessage("tooLong", userLang) },
        { status: 200 },
      );
    }

    // ─── 3. التحقق من المفتاح ───
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: getErrorMessage("noApiKey", userLang) },
        { status: 200 },
      );
    }

    // ─── 4. تحديد visitorId الفعلي (مع fallback) ───
    const effectiveVisitorId =
      visitorId && typeof visitorId === "string" && visitorId.trim()
        ? visitorId.trim()
        : `anon_${clientIp.replace(/[.:]/g, "_")}`;

    const effectiveConversationId =
      conversationId && typeof conversationId === "string"
        ? conversationId
        : "default-session";

    let visitorUuid = null;
    let previousHistory = [];

    console.log("🔍 [Chat API] Start:", {
      effectiveVisitorId,
      effectiveConversationId,
      messageLen: trimmedQuery.length,
      hasDeviceInfo: !!deviceInfo,
    });

    // ─── 5. حفظ الزائر + الرسالة + استرجاع السياق ───
    try {
      // 5.1 upsert visitor
      visitorUuid = await upsertVisitor(
        effectiveVisitorId,
        deviceInfo || {},
        clientIp,
        req.headers.get("user-agent"),
      );
      console.log("✅ [Chat API] Visitor upserted:", visitorUuid);

      // 5.2 load history
      previousHistory = await getRecentHistory(visitorUuid, 6);
      console.log("📚 [Chat API] History:", previousHistory.length, "messages");

      // 5.3 save user message
      const savedUserMsg = await saveMessage({
        visitorUuid,
        conversationId: effectiveConversationId,
        role: "user",
        content: trimmedQuery,
        language: userLang,
      });
      console.log("✅ [Chat API] User message saved:", savedUserMsg?.id);
    } catch (dbErr) {
      console.error("❌ [Chat API] DB Error (user message):", {
        message: dbErr.message,
        code: dbErr.code,
        detail: dbErr.detail,
        hint: dbErr.hint,
        table: dbErr.table,
      });
      // نستمر — لا نوقف الرد على المستخدم بسبب فشل الحفظ
    }

    // ─── 6. بناء السياق مع السجل السابق ───
    const contextContents = [
      ...previousHistory.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: trimmedQuery }] },
    ];

    // ─── 7. استدعاء Gemini ───
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contextContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.35,
        maxOutputTokens: 1000,
      },
    });

    const replyText = response.text;

    // ─── 8. حفظ رد المساعد ───
    if (visitorUuid) {
      try {
        const savedModelMsg = await saveMessage({
          visitorUuid,
          conversationId: effectiveConversationId,
          role: "model",
          content: replyText,
          language: userLang,
        });
        console.log("✅ [Chat API] Model reply saved:", savedModelMsg?.id);
      } catch (dbErr) {
        console.error("❌ [Chat API] DB Error (model reply):", {
          message: dbErr.message,
          code: dbErr.code,
          detail: dbErr.detail,
        });
      }
    }

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("💥 Critical AI Assistant Error:", error);

    const errStr = `${error?.message || ""} ${JSON.stringify(error || {})}`;
    const isLocationRestricted =
      errStr.includes("location") ||
      errStr.includes("region") ||
      errStr.includes("country") ||
      errStr.includes("USER_LOCATION_NOT_SUPPORTED") ||
      error?.status === 403;

    if (isLocationRestricted) {
      return NextResponse.json(
        { reply: getErrorMessage("regionBlocked", userLang) },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { reply: getErrorMessage("generic", userLang, error?.message || null) },
      { status: 200 },
    );
  }
}
