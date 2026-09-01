"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // 1. جلب أو إنشاء معرف الزائر
        let visitorId = localStorage.getItem("visitorId");
        if (!visitorId) {
          visitorId =
            "visitor_" +
            Date.now() +
            "_" +
            Math.random().toString(36).substr(2, 9);
          localStorage.setItem("visitorId", visitorId);
        }

        // 2. جلب معلومات الجهاز
        const ua = navigator.userAgent;
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
        const isTablet = /Tablet|iPad/i.test(ua);
        const browser = ua.includes("Chrome")
          ? "Chrome"
          : ua.includes("Firefox")
            ? "Firefox"
            : ua.includes("Safari")
              ? "Safari"
              : ua.includes("Edge")
                ? "Edge"
                : "Unknown";
        const os = ua.includes("Windows")
          ? "Windows"
          : ua.includes("Mac")
            ? "macOS"
            : ua.includes("Linux")
              ? "Linux"
              : ua.includes("Android")
                ? "Android"
                : ua.includes("iOS")
                  ? "iOS"
                  : "Unknown";

        // 3. كشف مصدر الزيارة
        const referrer = document.referrer || "";
        const freelanceSites = [
          "upwork.com",
          "freelancer.com",
          "mostaql.com",
          "khamsat.com",
          "binaa.com",
        ];
        const personalSites = [
          "eslamhadaya.com",
          "islamhadaya.com",
          "hadaya.dev",
        ];

        let source = "direct";
        if (freelanceSites.some((site) => referrer.includes(site)))
          source = "freelance";
        else if (personalSites.some((site) => referrer.includes(site)))
          source = "personal";
        else if (referrer) source = "other";

        // 4. جلب UTM parameters
        const params = new URLSearchParams(window.location.search);
        const utm = {
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
        };

        // 5. تجميع البيانات
        const data = {
          visitorId,
          page: pathname || "/",
          browser,
          os,
          device: isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop",
          source,
          referrer: referrer || "direct",
          utm,
          userAgent: ua,
          email: null,
        };

        // 6. إرسال البيانات إلى API
        const response = await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("📊 تم التتبع:", result);
      } catch (error) {
        console.error("❌ خطأ في التتبع:", error);
      }
    };

    const timeoutId = setTimeout(trackVisitor, 500);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
