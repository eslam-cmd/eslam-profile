import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// ==========================================
// 1. نظام Rate Limiting في الذاكرة (In-Memory)
// ==========================================
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const ipRequestMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const userData = ipRequestMap.get(ip);

  if (!userData) {
    ipRequestMap.set(ip, { count: 1, startTime: now });
    return { allowed: true };
  }

  if (now - userData.startTime > RATE_LIMIT_WINDOW) {
    ipRequestMap.set(ip, { count: 1, startTime: now });
    return { allowed: true };
  }

  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    const remainingTime = Math.ceil(
      (RATE_LIMIT_WINDOW - (now - userData.startTime)) / 1000,
    );
    return { allowed: false, remainingTime };
  }

  userData.count += 1;
  return { allowed: true };
}

setInterval(
  () => {
    const now = Date.now();
    for (const [ip, data] of ipRequestMap.entries()) {
      if (now - data.startTime > RATE_LIMIT_WINDOW) {
        ipRequestMap.delete(ip);
      }
    }
  },
  5 * 60 * 1000,
);

// ==========================================
// 2. كشف لغة الرسالة (لرسائل الأخطاء)
// ==========================================
function detectLanguage(text) {
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
  if (/[\u3040-\u30FF]/.test(text)) return "ja";
  if (/[\uAC00-\uD7AF]/.test(text)) return "ko";
  if (/[\u0590-\u05FF]/.test(text)) return "he";
  if (/[\u0E00-\u0E7F]/.test(text)) return "th";
  return "en";
}

// ==========================================
// 3. قوالب رسائل الأخطاء متعددة اللغات
// ==========================================
const ERROR_MESSAGES = {
  rateLimit: {
    en: (t) =>
      `⚠️ **Rate Limit Reached**\n\nYou've reached the maximum number of questions for now.\n\n**Please wait ${t} seconds** before asking again.`,
    ar: (t) =>
      `⚠️ **تجاوزت الحد المسموح**\n\nلقد وصلت إلى الحد الأقصى من الأسئلة حالياً.\n\n**يُرجى الانتظار ${t} ثانية** قبل طرح سؤال جديد.`,
    ru: (t) =>
      `⚠️ **Превышен лимит запросов**\n\nПожалуйста, подождите **${t} секунд** перед следующим вопросом.`,
    zh: (t) => `⚠️ **已达到请求上限**\n\n请在 **${t} 秒**后再试。`,
    ja: (t) =>
      `⚠️ **リクエスト上限に達しました**\n\n**${t} 秒**後にもう一度お試しください。`,
    ko: (t) => `⚠️ **요청 한도 초과**\n\n**${t}초** 후에 다시 시도해주세요.`,
    he: (t) =>
      `⚠️ **חרגת ממגבלת הבקשות**\n\nאנא המתן **${t} שניות** לפני ניסיון נוסף.`,
    th: (t) => `⚠️ **ถึงขีดจำกัดคำขอ**\n\nกรุณารอ **${t} วินาที** ก่อนลองใหม่`,
  },
  regionBlocked: {
    en: `🌍 **Service Not Available in Your Region**\n\nThe AI service is currently unavailable in your geographical location.\n\n💡 **Solution:**\n- Enable a **VPN** and connect to a supported country (US, UK, EU).\n- Then send your message again.\n\n**Supported regions:** United States, United Kingdom, Germany, France, Canada, Australia.`,
    ar: `🌍 **الخدمة غير متاحة في منطقتك**\n\nخدمة الذكاء الاصطناعي غير متوفرة حالياً في موقعك الجغرافي.\n\n💡 **الحل:**\n- قم بتشغيل **VPN** واتصل بدولة مدعومة (أمريكا، بريطانيا، أوروبا).\n- ثم أعد إرسال رسالتك.\n\n**الدول المدعومة:** الولايات المتحدة، المملكة المتحدة، ألمانيا، فرنسا، كندا، أستراليا.`,
    ru: `🌍 **Сервис недоступен в вашем регионе**\n\n💡 **Решение:** Включите **VPN** и подключитесь к поддерживаемой стране.`,
    zh: `🌍 **您所在地区无法使用此服务**\n\n💡 **解决方案：** 请启用 **VPN** 并连接到支持的国家。`,
    ja: `🌍 **お住まいの地域ではサービスをご利用いただけません**\n\n💡 **解決策：** **VPN** を有効にして対応国に接続してください。`,
    ko: `🌍 **귀하의 지역에서는 서비스를 사용할 수 없습니다**\n\n💡 **해결책:** **VPN**을 켜고 지원 국가에 연결하세요.`,
    he: `🌍 **השירות אינו זמין באזורכם**\n\n💡 **פתרון:** הפעל **VPN** והתחבר למדינה נתמכת.`,
    th: `🌍 **บริการไม่พร้อมใช้งานในพื้นที่ของคุณ**\n\n💡 **วิธีแก้ไข:** เปิด **VPN** และเชื่อมต่อกับประเทศที่รองรับ`,
  },
  generic: {
    en: (msg) =>
      `⚠️ **Something went wrong**\n\n${msg || "Please try again in a moment."}\n\nIf the issue persists, refresh the page.`,
    ar: (msg) =>
      `⚠️ **حدث خطأ غير متوقع**\n\n${msg || "يُرجى المحاولة مرة أخرى بعد لحظات."}\n\nإذا استمرت المشكلة، أعد تحميل الصفحة.`,
    ru: (msg) => `⚠️ **Произошла ошибка**\n\n${msg || "Попробуйте снова."}`,
    zh: (msg) => `⚠️ **出现错误**\n\n${msg || "请稍后重试。"}`,
    ja: (msg) =>
      `⚠️ **エラーが発生しました**\n\n${msg || "しばらくしてから再試行してください。"}`,
    ko: (msg) =>
      `⚠️ **오류가 발생했습니다**\n\n${msg || "잠시 후 다시 시도하세요."}`,
    he: (msg) => `⚠️ **אירעה שגיאה**\n\n${msg || "נסה שוב מאוחר יותר."}`,
    th: (msg) => `⚠️ **เกิดข้อผิดพลาด**\n\n${msg || "โปรดลองอีกครั้ง"}`,
  },
  invalidInput: {
    en: "Please enter a valid question or inquiry.",
    ar: "يُرجى كتابة سؤال أو استفسار صالح.",
    ru: "Пожалуйста, введите корректный вопрос.",
    zh: "请输入有效的问题。",
    ja: "有効な質問を入力してください。",
    ko: "유효한 질문을 입력해주세요.",
    he: "אנא הזן שאלה חוקית.",
    th: "กรุณาป้อนคำถามที่ถูกต้อง",
  },
  noApiKey: {
    en: `⚙️ **Configuration Error**\n\nThe server's \`GEMINI_API_KEY\` is missing. Please contact the site owner.`,
    ar: `⚙️ **خطأ في الإعدادات**\n\nمفتاح \`GEMINI_API_KEY\` غير متوفر في إعدادات السيرفر. يُرجى التواصل مع مالك الموقع.`,
    ru: `⚙️ **Ошибка конфигурации**\n\nОтсутствует \`GEMINI_API_KEY\`.`,
    zh: `⚙️ **配置错误**\n\n服务器缺少 \`GEMINI_API_KEY\`。`,
    ja: `⚙️ **設定エラー**\n\nサーバーに \`GEMINI_API_KEY\` がありません。`,
    ko: `⚙️ **구성 오류**\n\n서버에 \`GEMINI_API_KEY\`가 없습니다.`,
    he: `⚙️ **שגיאת תצורה**\n\nחסר \`GEMINI_API_KEY\` בשרת.`,
    th: `⚙️ **ข้อผิดพลาดการกำหนดค่า**\n\nเซิร์ฟเวอร์ขาด \`GEMINI_API_KEY\``,
  },
};

function getErrorMessage(type, lang, arg) {
  const map = ERROR_MESSAGES[type];
  if (!map) return "";
  const value = map[lang] || map.en;
  return typeof value === "function" ? value(arg) : value;
}

// ==========================================
// 4. التعليمات النظامية (محسّنة للردود الذكية)
// ==========================================
const SYSTEM_INSTRUCTION = `
You are "Islam's AI Assistant" — the official AI representative embedded on the engineering portfolio of Islam Hadaya (إسلام سليمان هدايا).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 CORE MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Answer questions from recruiters, engineering leads, technical clients, and visitors with **deep technical precision**, **objectivity**, and **confidence**. You represent Islam's professional brand — never be vague, never ramble.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✍️ RESPONSE STYLE (STRICT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. **Be concise first, deep second.** Prefer short, punchy answers over long essays.
2. **One idea per line.** Never write dense walls of text.
3. **Always use Markdown structure:**
   - Start with a **one-line summary** (bolded).
   - Use **### Headers** to organize sections.
   - Use **bullet points (-)** for lists.
   - Use **\`inline code\`** for technologies, files, and functions.
   - Use **blank lines** between sections for breathing room.
   - Use **bold** for key terms.
4. **Length guideline:** 4–8 short lines for simple questions. Up to 15 lines for deep architecture questions. Never exceed 20 lines unless absolutely necessary.
5. **End with a helpful hook** when appropriate (e.g., "Want me to elaborate on the RBAC layer?").

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 LANGUAGE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Detect the user's language and reply in the **exact same language** (Arabic → Arabic, English → English, Russian → Russian, etc.).
- If the message contains mixed languages, use the dominant one.
- Keep technical terms in their original English form (e.g., \`Next.js\`, \`Prisma\`, \`HttpOnly\`).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚧 SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Answer ONLY about: Islam Hadaya, his projects, technical expertise, engineering decisions, and professional contact.
For unrelated topics, politely redirect: "I'm specialized in Islam's engineering profile. Feel free to ask about his projects or stack!"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 CORE PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- **Name:** Islam Hadaya (إسلام هدايا)
- **Role:** Comprehensive Full-Stack Software Engineer
- **Balance:** Equal depth across **modern frontend** (SSR/SSG, state, UX/UI, accessibility) and **resilient backend** (clean architecture, security, DB modeling, scalable APIs).
- **Principles:** Security by design • Defense-in-depth • Strict validation • Modular architecture • Zero-trust sessions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧰 TECHNICAL MATRIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### Frontend
- **Frameworks:** \`Next.js\` (App Router, Server Components, SSR/SSG/ISR), \`React 18/19\`, \`JavaScript ES6+\`
- **UI:** \`Material-UI\`, \`Tailwind CSS\` (RTL), \`Recharts\`
- **Skills:** Dashboards, accessible components, client caching, context auth barriers, responsive layouts, MDX.

### Backend
- **Runtimes:** \`Node.js\`, \`Express.js\` (Modular MVC), \`NestJS\` (DI, enterprise modules)
- **Skills:** REST APIs, session lifecycle, custom middleware, webhooks, rate limiting, hardening vs brute-force/injection.

### Database
- **Engines:** \`PostgreSQL\`, \`Neon\`, \`Prisma ORM\`, native \`pg\`
- **Skills:** Relational schema, referential integrity, cascades, parameterized queries, transactions.

### Security
- \`HttpOnly\` + \`Secure\` + \`SameSite\` cookies (XSS/CSRF prevention)
- Granular **RBAC**, **Email OTP 2FA**
- \`Helmet\`, CORS whitelisting, Express Rate Limit, input sanitization, parameterized SQL.

### DevOps
- Linux/Ubuntu admin • \`Caddy\` reverse proxy + auto SSL • \`iptables\` • \`Docker\` • \`n8n\` automation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ FLAGSHIP PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 1. ScanLens — Web Security SaaS
- **Purpose:** Automated vulnerability & security-posture scanner.
- **Frontend:** \`Next.js\` + \`Tailwind\` (dashboards, telemetry, subscription tiers).
- **Backend:** \`NestJS\` + \`Prisma\` + \`PostgreSQL\`; concurrent scanning of SSL/TLS, headers (CSP/HSTS/X-Frame), CORS, cookies.
- **AI Remediation:** \`Gemini API\` generates language-specific fix snippets.
- **Monetization:** Feature-gated tiers (Free/Pro/Extra) via custom NestJS Guards.

### 2. e-School Admin — Dual-Role Academic Platform
- **Purpose:** School admin portal bridging staff, teachers, students.
- **Frontend:** \`Next.js\` + \`MUI\`; dual portals, Context state, \`Recharts\` analytics.
- **Backend:** Modular \`Express\` + \`PostgreSQL\`; strict dual-role RBAC, auto ID generation, Email OTP 2FA.
- **Defense:** \`HttpOnly\` cookies, brute-force mitigation, sanitized inputs.

### 3. Freelance & Consulting Platform
- **Client Portal:** \`Next.js App Router\` + \`React 19\`, Markdown blog (\`gray-matter\`, \`react-markdown\`), native RTL.
- **Admin Suite:** Telemetry dashboard, live status (Pending/In-Progress/Completed), catalog pricing.
- **Backend:** \`Express\` + raw \`pg\`; persistent \`activity_logs\` audit trail.
- **Integrations:** \`Telegram Bot API\`, \`Nodemailer\`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📇 CONTACT & CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- **Education:** Vocational Secondary Certificate in Computer Studies.
- **Email:** \`hdayaaslam34@gmail.com\`
- **GitHub:** https://github.com/eslam-cmd
- **LinkedIn:** https://www.linkedin.com/in/islam-hadaya
- **Portfolio:** https://my-profile-personal-nextjs.vercel.app
`;

// ==========================================
// 5. معالج POST
// ==========================================
export async function POST(req) {
  // اللغة الافتراضية قبل قراءة الرسالة
  let lang = "en";

  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "127.0.0.1";

    const rateLimitStatus = checkRateLimit(clientIp);
    if (!rateLimitStatus.allowed) {
      return NextResponse.json(
        {
          reply: getErrorMessage(
            "rateLimit",
            "en",
            rateLimitStatus.remainingTime,
          ),
        },
        { status: 200 },
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { reply: getErrorMessage("invalidInput", "en") },
        { status: 200 },
      );
    }

    // كشف لغة المستخدم لاستخدامها في رسائل الأخطاء
    lang = detectLanguage(message);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: getErrorMessage("noApiKey", lang) },
        { status: 200 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message.trim(),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Chat API Error:", error);

    const errorMessage = error?.message || "";
    const errorString = JSON.stringify(error || {});

    const isLocationBlocked =
      errorMessage.includes("location") ||
      errorMessage.includes("region") ||
      errorMessage.includes("country") ||
      errorMessage.includes("USER_LOCATION_NOT_SUPPORTED") ||
      errorString.includes("USER_LOCATION_NOT_SUPPORTED") ||
      error?.status === 403;

    if (isLocationBlocked) {
      return NextResponse.json(
        { reply: getErrorMessage("regionBlocked", lang) },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        reply: getErrorMessage("generic", lang, errorMessage || null),
      },
      { status: 200 },
    );
  }
}
