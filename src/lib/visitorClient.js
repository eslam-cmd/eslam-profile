"use client";

// ═══════════════════════════════════════════
// توليد / استرجاع معرّف الزائر
// ═══════════════════════════════════════════
export async function getVisitorId() {
  if (typeof window === "undefined") return null;

  // 1. من localStorage
  let id = localStorage.getItem("visitor_id");
  if (id) return id;

  // 2. من Cookie
  const cookieMatch = document.cookie.match(/visitor_id=([^;]+)/);
  if (cookieMatch) {
    id = cookieMatch[1];
    localStorage.setItem("visitor_id", id);
    return id;
  }

  // 3. توليد جديد
  id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  localStorage.setItem("visitor_id", id);
  document.cookie = `visitor_id=${id}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; SameSite=Lax`;
  return id;
}

// ═══════════════════════════════════════════
// جمع معلومات الجهاز
// ═══════════════════════════════════════════
export function getDeviceInfo() {
  if (typeof navigator === "undefined") return {};

  const ua = navigator.userAgent;
  let os = "Unknown";
  let osVersion = "";
  let browser = "Unknown";
  let browserVersion = "";
  let deviceType = "desktop";

  // نظام التشغيل
  if (/Windows NT 10/i.test(ua)) os = "Windows 10/11";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Mac OS X ([\d_.]+)/i.test(ua)) {
    os = "macOS";
    const m = ua.match(/Mac OS X ([\d_.]+)/i);
    if (m) osVersion = m[1].replace(/_/g, ".");
  } else if (/Android ([\d.]+)/i.test(ua)) {
    os = "Android";
    const m = ua.match(/Android ([\d.]+)/i);
    if (m) osVersion = m[1];
  } else if (/iPhone OS ([\d_]+)/i.test(ua)) {
    os = "iOS";
    const m = ua.match(/iPhone OS ([\d_]+)/i);
    if (m) osVersion = m[1].replace(/_/g, ".");
  } else if (/iPad.*OS ([\d_]+)/i.test(ua)) {
    os = "iPadOS";
    const m = ua.match(/OS ([\d_]+)/i);
    if (m) osVersion = m[1].replace(/_/g, ".");
  } else if (/Linux/i.test(ua)) os = "Linux";

  // المتصفح
  if (/Edg\/([\d.]+)/i.test(ua)) {
    browser = "Edge";
    const m = ua.match(/Edg\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/OPR\/([\d.]+)/i.test(ua) || /Opera/i.test(ua)) {
    browser = "Opera";
    const m = ua.match(/OPR\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/Chrome\/([\d.]+)/i.test(ua)) {
    browser = "Chrome";
    const m = ua.match(/Chrome\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/Firefox\/([\d.]+)/i.test(ua)) {
    browser = "Firefox";
    const m = ua.match(/Firefox\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  } else if (/Version\/([\d.]+).*Safari/i.test(ua)) {
    browser = "Safari";
    const m = ua.match(/Version\/([\d.]+)/i);
    if (m) browserVersion = m[1];
  }

  // نوع الجهاز
  if (/iPad|Tablet/i.test(ua)) deviceType = "tablet";
  else if (/Mobi|Android|iPhone|iPod/i.test(ua)) deviceType = "mobile";

  return {
    os,
    osVersion,
    browser,
    browserVersion,
    deviceType,
    screen:
      typeof window !== "undefined"
        ? `${window.screen.width}x${window.screen.height}`
        : "",
    language: navigator.language || "",
    timezone:
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "",
  };
}

// ═══════════════════════════════════════════
// معرّف الجلسة (conversation_id)
// ═══════════════════════════════════════════
export function getConversationId() {
  if (typeof window === "undefined") return null;

  let id = sessionStorage.getItem("conversation_id");
  if (id) return id;

  id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `c_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  sessionStorage.setItem("conversation_id", id);
  return id;
}

// ═══════════════════════════════════════════
// كشف الاتجاه (RTL/LTR) للنص
// ═══════════════════════════════════════════
export const isRTLText = (text) => {
  if (!text) return false;
  const clean = text.replace(/[*_`#>~\[\]()!\-]/g, "");
  const match = clean.match(/[\u0600-\u06FF\u0590-\u05FF]|[A-Za-z]/);
  if (!match) return false;
  return /[\u0600-\u06FF\u0590-\u05FF]/.test(match[0]);
};
