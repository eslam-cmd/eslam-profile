"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Paper, Link } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import VerifiedIcon from "@mui/icons-material/Verified";

// ============================================================
// النصوص
// ============================================================
const NAME = "Islam Hadaya";
const S1 = "Full-stack developer turning ideas into impact.";
const S2 = "Building scalable, secure, and beautiful applications.";
const S3 = "React • Next.js • Node.js — clean code, clear vision.";

const CODE = `const developer = {
  name: "Islam Hadaya",
  skills: ["React", "Next.js", "Node.js"],
  passion: "Building integrated systems"
};
console.log("Hello World! 🚀");`;

// ============================================================
// المكوّن الرئيسي
// ============================================================
export default function MainSection({ toggleTheme, darkMode = true }) {
  // حالة النصوص
  const [nameText, setNameText] = useState("");
  const [s1Text, setS1Text] = useState("");
  const [s2Text, setS2Text] = useState("");
  const [s3Text, setS3Text] = useState("");
  const [codeText, setCodeText] = useState("");

  // ============================================================
  // الأنميشن المنظم: اسم → جملة 1 → جملة 2 → جملة 3 → إعادة
  // ============================================================
  useEffect(() => {
    const TYPE = 60;
    const ERASE = 30;
    const HOLD = 1500;
    const PAUSE = 400;

    let timeout;
    let cancelled = false;

    const sleep = (ms) =>
      new Promise((res) => {
        timeout = setTimeout(res, ms);
      });

    const type = async (fullText, setter) => {
      for (let i = 0; i <= fullText.length; i++) {
        if (cancelled) return;
        setter(fullText.slice(0, i));
        await sleep(TYPE);
      }
    };

    const erase = async (fullText, setter) => {
      for (let i = fullText.length; i >= 0; i--) {
        if (cancelled) return;
        setter(fullText.slice(0, i));
        await sleep(ERASE);
      }
    };

    const run = async () => {
      await type(NAME, setNameText);
      await sleep(HOLD);
      await erase(NAME, setNameText);
      await sleep(PAUSE);

      await type(S1, setS1Text);
      await sleep(HOLD);
      await erase(S1, setS1Text);
      await sleep(PAUSE);

      await type(S2, setS2Text);
      await sleep(HOLD);
      await erase(S2, setS2Text);
      await sleep(PAUSE);

      await type(S3, setS3Text);
      await sleep(HOLD);
      await erase(S3, setS3Text);
      await sleep(PAUSE);

      if (!cancelled) run();
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  // ============================================================
  // أنميشن الكود — مستقل ومتوازٍ
  // ============================================================
  useEffect(() => {
    const TYPE = 25;
    const ERASE = 12;
    const HOLD = 2500;

    let interval;
    let phase = 0;

    const runCode = () => {
      if (phase === 0) {
        let i = 0;
        interval = setInterval(() => {
          if (i <= CODE.length) {
            setCodeText(CODE.slice(0, i));
            i++;
          } else {
            clearInterval(interval);
            phase = 1;
            setTimeout(runCode, HOLD);
          }
        }, TYPE);
      } else {
        let i = CODE.length;
        interval = setInterval(() => {
          if (i >= 0) {
            setCodeText(CODE.slice(0, i));
            i--;
          } else {
            clearInterval(interval);
            phase = 0;
            setTimeout(runCode, 800);
          }
        }, ERASE);
      }
    };

    runCode();

    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // الألوان
  // ============================================================
  const colors = {
    name: darkMode ? "#D4AF37" : "#186e96",
    text: darkMode ? "#ccc" : "#333",
    border: darkMode ? "#D4AF37" : "#186e96",
    codeBg: darkMode ? "rgba(10, 31, 68, 0.9)" : "rgba(255, 255, 255, 0.85)",
    codeBorder: darkMode
      ? "rgba(212, 175, 55, 0.3)"
      : "rgba(24, 110, 150, 0.3)",
    downloadBg: darkMode ? "#0A1F44" : "#186e96",
    downloadText: darkMode ? "#D4AF37" : "#fff",
    email: darkMode ? "#FFD700" : "#D4AF37",
    github: darkMode ? "#EAEAEA" : "#000",
    linkedin: darkMode ? "#64B5F6" : "#0A66C2",
  };

  // ============================================================
  // العرض
  // ============================================================
  return (
    <section
      id="home"
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
    >
      {/* ✅ نص مخفي للـ SEO والذكاء الاصطناعي */}
      <div
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <h1>{NAME}</h1>
        <p>{S1}</p>
        <p>{S2}</p>
        <p>{S3}</p>
        <pre>{CODE}</pre>
      </div>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: { xs: "8px 12px 20px", sm: 2.5, md: 5 },
          minHeight: "100vh",
          gap: { xs: 2, sm: 3, md: 6 },
          maxWidth: 1200,
          mx: "auto",
          mt: { xs: "70px", sm: "80px", md: "100px", lg: "120px" },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* ====================================================
            القسم الأيسر: الصورة + النصوص + الروابط
        ==================================================== */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* الصورة */}
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              alt="Islam Hadaya"
              src="https://i.ibb.co/P2FpddR/my-photo-2.jpg"
              sx={{
                width: { xs: 130, sm: 160, md: 190, lg: 220 },
                height: { xs: 130, sm: 160, md: 190, lg: 220 },
                boxShadow: darkMode
                  ? "0 6px 58px rgba(212, 175, 55, 0.3)"
                  : "rgba(14, 124, 175, 1)",
                border: `3px solid ${colors.border}`,
              }}
            />
            <VerifiedIcon
              sx={{
                position: "absolute",
                bottom: 6,
                right: 6,
                color: colors.name,
                fontSize: { xs: 22, sm: 28, md: 32 },
                background: darkMode ? "#0A1F44" : "#fff",
                borderRadius: "50%",
                p: 0.2,
              }}
            />
          </Box>

          {/* الاسم */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.6rem",
                lg: "3.2rem",
              },
              fontWeight: 700,
              color: colors.name,
              mt: { xs: 2, sm: 3 },
              lineHeight: 1.2,
              minHeight: "1.3em",
            }}
          >
            {nameText}
          </Typography>

          {/* الجمل */}
          <Box
            sx={{
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.05rem" },
              maxWidth: { xs: "100%", sm: 520, md: 600 },
              lineHeight: 1.7,
              mt: { xs: 1.5, sm: 2 },
              color: colors.text,
              px: { xs: 1, sm: 0 },
              minHeight: { xs: "6rem", sm: "5rem" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Box
              component="span"
              sx={{ minHeight: "1.7em", display: "inline-block" }}
            >
              {s1Text}
            </Box>
            <Box
              component="span"
              sx={{ minHeight: "1.7em", display: "inline-block" }}
            >
              {s2Text}
            </Box>
            <Box
              component="span"
              sx={{ minHeight: "1.7em", display: "inline-block" }}
            >
              {s3Text}
            </Box>
          </Box>

          {/* زر تحميل CV */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 3,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="/cv/Islam_Hadaya_CV.pdf"
              download="Islam-Hadaya-CV.pdf"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 25,
                backgroundColor: colors.downloadBg,
                color: colors.downloadText,
                fontWeight: 600,
                fontSize: "0.85rem",
              }}
            >
              <DownloadIcon sx={{ fontSize: 18 }} />
              Download CV
            </a>
          </Box>

          {/* روابط التواصل */}
          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              mt: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link href="mailto:hdayaaslam34@gmail.com" aria-label="Email">
              <EmailIcon sx={{ color: colors.email }} />
            </Link>
            <Link
              href="https://github.com/eslam-cmd"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon sx={{ color: colors.github }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eslam-hd-60a056357"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon sx={{ color: colors.linkedin }} />
            </Link>
          </Box>
        </Box>

        {/* ====================================================
            القسم الأيمن: صندوق الكود
        ==================================================== */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 45%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: { xs: "100%", md: 500 },
            width: "100%",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 440, md: 480 },
              borderRadius: { xs: 3, sm: 4 },
              background: colors.codeBg,
              backdropFilter: "blur(12px)",
              border: `1px solid ${colors.codeBorder}`,
              p: { xs: 1.5, sm: 2.5, md: 3.5 },
            }}
          >
            {/* شريط النافذة */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 2,
                pb: 1.5,
                borderBottom: `1px solid ${colors.codeBorder}`,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#ff5f57",
                }}
              />
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#ffbd2e",
                }}
              />
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#28c840",
                }}
              />
            </Box>

            {/* الكود */}
            <Box
              component="pre"
              sx={{
                m: 0,
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: { xs: 11, sm: 12, md: 14 },
                lineHeight: 1.9,
                color: darkMode ? "#D4AF37" : "#186e96",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: darkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                borderRadius: 2,
                p: 2,
                minHeight: "12em",
              }}
            >
              {codeText}
            </Box>
          </Paper>
        </Box>
      </Box>
    </section>
  );
}
