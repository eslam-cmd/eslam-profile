import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { upsertVisitor, saveMessage, getRecentHistory } from "../../../lib/db";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_MESSAGE_LENGTH = 500;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
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

function detectLanguage(text) {
  if (/^[\s\S]*[\u0600-\u06FF]/.test(text)) return "ar";
  if (/^[\s\S]*[\u0400-\u04FF]/.test(text)) return "ru";
  if (/^[\s\S]*[\u4E00-\u9FFF]/.test(text)) return "zh";
  if (/^[\s\S]*[\u3040-\u30FF]/.test(text)) return "ja";
  if (/^[\s\S]*[\uAC00-\uD7AF]/.test(text)) return "ko";
  return "en";
}

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

const SYSTEM_INSTRUCTION = `
You are the official AI technical ambassador for the portfolio of Islam Hadaya.

Mission:
- Help visitors understand Islam's engineering background, projects, stack, and architecture choices.
- Be precise, practical, and professional.
- Do not invent projects, employers, awards, or credentials.
- If unsure, say so and ground the answer in evidence from the portfolio.
- Never disclose private personal details, phone numbers, addresses, or family information.
- Direct all contact requests to the official channels: email, LinkedIn, or GitHub.

Focus areas:
- Full-stack web development, architecture, backend design, data modeling, security, and workflow.
- Technical strengths shown in the portfolio, including Next.js, React, Express, PostgreSQL, Docker, DevOps, and systems thinking.

Reply in the user's language when possible. Keep technical terms in English. Use concise, structured answers with practical detail.
`;

export async function POST(req) {
  let userLang = "en";

  try {
    const forwardedHeader =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    const clientIp = forwardedHeader
      ? forwardedHeader.split(",")[0].trim()
      : "127.0.0.1";

    const rateStatus = await checkRateLimit(clientIp);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        { reply: getErrorMessage("rateLimit", "en", rateStatus.remainingTime) },
        { status: 200 },
      );
    }

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: getErrorMessage("noApiKey", userLang) },
        { status: 200 },
      );
    }

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

    try {
      visitorUuid = await upsertVisitor(
        effectiveVisitorId,
        deviceInfo || {},
        clientIp,
        req.headers.get("user-agent"),
      );

      previousHistory = await getRecentHistory(visitorUuid, 6);

      await saveMessage({
        visitorUuid,
        conversationId: effectiveConversationId,
        role: "user",
        content: trimmedQuery,
        language: userLang,
      });
    } catch (dbErr) {
      console.error("[Chat API] DB Error:", dbErr);
    }

    const contextContents = [
      ...previousHistory.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: trimmedQuery }] },
    ];

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contextContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.35,
        maxOutputTokens: 1000,
      },
    });

    const replyText = response?.text || "I’m not able to answer that right now.";

    if (visitorUuid) {
      try {
        await saveMessage({
          visitorUuid,
          conversationId: effectiveConversationId,
          role: "model",
          content: replyText,
          language: userLang,
        });
      } catch (dbErr) {
        console.error("[Chat API] DB Error (model reply):", dbErr);
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
      {
        reply: getErrorMessage(
          "generic",
          userLang,
          error?.message || "An unexpected issue occurred.",
        ),
      },
      { status: 200 },
    );
  }
}
