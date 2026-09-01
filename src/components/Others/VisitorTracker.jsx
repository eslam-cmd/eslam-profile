"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const shouldSkipTracking = () => {
      if (typeof navigator === "undefined") return true;

      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      if (connection?.saveData) return true;

      const effectiveType = connection?.effectiveType || "4g";
      return ["slow-2g", "2g", "3g"].includes(effectiveType);
    };

    const trackVisitor = async () => {
      if (shouldSkipTracking()) {
        return;
      }

      try {
        let visitorId = localStorage.getItem("visitorId");
        if (!visitorId) {
          visitorId =
            "visitor_" +
            Date.now() +
            "_" +
            Math.random().toString(36).substr(2, 9);
          localStorage.setItem("visitorId", visitorId);
        }

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

        const params = new URLSearchParams(window.location.search);
        const utm = {
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
        };

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

        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          keepalive: true,
        });
      } catch (error) {
        console.error("❌ خطأ في التتبع:", error);
      }
    };

    const runTracking = () => {
      const delay =
        typeof window !== "undefined" &&
        window.navigator &&
        (window.navigator.connection?.saveData ||
          ["slow-2g", "2g", "3g"].includes(
            window.navigator.connection?.effectiveType,
          ))
          ? 3000
          : 1200;

      const timeoutId = setTimeout(trackVisitor, delay);
      return () => clearTimeout(timeoutId);
    };

    return runTracking();
  }, [pathname]);

  return null;
}
