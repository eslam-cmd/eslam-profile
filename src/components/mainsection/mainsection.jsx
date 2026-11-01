"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AppsIcon from "@mui/icons-material/Apps";
import { TypeAnimation } from "react-type-animation";
import VerifiedIcon from "@mui/icons-material/Verified";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CodeIcon from "@mui/icons-material/Code";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { keyframes } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, alpha } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

const typeCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const CODE_LINES = [
  "const developer = {",
  '  name: "Islam Hadaya",',
  '  skills: ["React", "Next.js", "Node.js"],',
  '  passion: "Building integrated systems"',
  "};",
  'console.log("Hello World! 🚀");',
];

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const isRTLText = (text) => {
  if (!text) return false;
  const clean = text.replace(/[*_`#>~\[\]()!\-]/g, "");
  const match = clean.match(/[\u0600-\u06FF\u0590-\u05FF]|[A-Za-z]/);
  if (!match) return false;
  return /[\u0600-\u06FF\u0590-\u05FF]/.test(match[0]);
};

export default function MainSection({ toggleTheme, darkMode: darkModeProp }) {
  const muiTheme = useTheme();
  const darkMode = muiTheme.palette.mode === "dark";
  const isTinyScreen = useMediaQuery("(max-width:400px)");

  const [chatOpen, setChatOpen] = React.useState(false);
  const [inputMessage, setInputMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState([
    {
      role: "model",
      text: `👋 **Welcome! I'm Islam's AI Assistant.**

I can help you explore:

- 🔧 **Engineering projects** — architecture, tech stack, decisions
- 💡 **Technical skills** — frontend, backend, databases, security
- 📐 **System design** — how each system is structured

*Feel free to ask in English, العربية, or any other language.*`,
    },
  ]);
  const messagesEndRef = React.useRef(null);

  const [displayText, setDisplayText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(true);
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    if (textIndex >= CODE_LINES.length) return;
    const line = CODE_LINES[textIndex];
    let charIndex = 0;
    let timeoutId;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex <= line.length) {
        setDisplayText((prev) => {
          const lines = prev.split("\n");
          lines[textIndex] = line.substring(0, charIndex);
          return lines.join("\n");
        });
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        timeoutId = setTimeout(() => {
          if (textIndex < CODE_LINES.length - 1) {
            setDisplayText((prev) => prev + "\n");
            setTextIndex((prev) => prev + 1);
          } else {
            timeoutId = setTimeout(() => {
              setDisplayText("");
              setTextIndex(0);
            }, 3000);
          }
        }, 500);
      }
    }, 40);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(timeoutId);
    };
  }, [textIndex]);

  // ───── متغيرات الألوان (نفس ألوانك) ─────
  const heroVars = {
    "--hero-name-color": darkMode ? "#D4AF37" : "#186e96",
    "--hero-text-color": darkMode ? "#F5F5F5" : "#0A1F44", // تم تعديله ليكون النص أبيض/كحلي بدل الذهبي
    "--hero-border-color": darkMode ? "#D4AF37" : "#186e96",
    "--hero-avatar-shadow": darkMode
      ? "0 6px 58px rgba(212, 175, 55, 0.2)"
      : "0 6px 58px rgba(14, 124, 175, 0.2)",
    "--hero-avatar-bg": darkMode ? "#0A1F44" : "#fff",
    "--hero-code-bg": darkMode
      ? "rgba(255, 255, 255, 0.02)"
      : "rgba(255, 255, 255, 0.7)",
    "--hero-code-border": darkMode
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(24, 110, 150, 0.15)",
    "--hero-code-text": darkMode ? "#D4AF37" : "#186e96",
    "--hero-code-shadow": darkMode
      ? "0 8px 32px rgba(0,0,0,0.2)"
      : "0 8px 32px rgba(24, 110, 150, 0.05)",
    "--hero-code-surface": darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    "--hero-download-bg": darkMode ? "#D4AF37" : "#186e96",
    "--hero-download-text": darkMode ? "#050a14" : "#fff",
    "--hero-email-color": darkMode ? "#F5F5F5" : "#0A1F44",
    "--hero-github-color": darkMode ? "#F5F5F5" : "#0A1F44",
    "--hero-linkedin-color": darkMode ? "#F5F5F5" : "#0A1F44",
    "--hero-heading-color": darkMode ? "#D4AF37" : "#186e96",
    "--hero-dialog-bg": darkMode ? "#050a14" : "#ffffff",
    "--hero-tag-bg": darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    "--hero-tag-border": darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;
    const userText = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "⚠️ **Unexpected Error**\n\nSomething went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "🔌 **Connection Error**\n\nUnable to reach the server. Please check your internet connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const techBtn = {
    borderRadius: "8px", // حواف ناعمة
    px: { xs: 3, sm: 3.5 },
    py: 1.2,
    fontFamily: FONT,
    fontSize: "0.9rem",
    fontWeight: 600,
    textTransform: "none",
    transition: "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
  };

  const socials = [
    {
      label: "GitHub",
      icon: <GitHubIcon sx={{ fontSize: 20 }} />,
      href: "https://github.com/eslam-cmd",
      color: "var(--hero-github-color)",
      hoverColor: darkMode ? "#D4AF37" : "#186e96",
    },
    {
      label: "LinkedIn",
      icon: <LinkedInIcon sx={{ fontSize: 20 }} />,
      href: "https://www.linkedin.com/in/Islam-hadaya",
      color: "var(--hero-linkedin-color)",
      hoverColor: "#0A66C2",
    },
    {
      label: "Email",
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      href: "mailto:hdayaaslam34@gmail.com",
      color: "var(--hero-email-color)",
      hoverColor: darkMode ? "#D4AF37" : "#186e96",
    },
  ];

  // ستايل Markdown لرسائل المساعد
  const mdSx = {
    "& > *:first-of-type": { mt: 0 },
    "& > *:last-child": { mb: 0 },
    "& p": { m: 0, mb: 1, lineHeight: 1.7 },
    "& h1, & h2, & h3, & h4": {
      fontSize: "0.95rem",
      fontWeight: 700,
      mt: 1.5,
      mb: 0.8,
      color: "var(--hero-code-text)",
    },
    "& ul, & ol": { m: 0, my: 0.8, pl: 2.5 },
    "& li": { lineHeight: 1.7, mb: 0.4 },
    "& li::marker": { color: "var(--hero-code-text)" },
    "& strong": { fontWeight: 700, color: "var(--hero-code-text)" },
    "& code": {
      backgroundColor: "var(--hero-code-surface)",
      color: "var(--hero-code-text)",
      px: 0.6,
      py: 0.2,
      borderRadius: "4px",
      fontFamily: "'Fira Code', monospace",
      fontSize: "0.82em",
    },
    "& pre": {
      backgroundColor: "var(--hero-code-surface)",
      p: 1.5,
      borderRadius: "8px",
      overflowX: "auto",
      direction: "ltr",
      textAlign: "left",
      "& code": { backgroundColor: "transparent", p: 0 },
    },
    "& a": { color: "var(--hero-code-text)", textDecoration: "underline" },
  };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        ...heroVars,
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: "transparent", // يحافظ على خلفية الموقع
        fontFamily: FONT,
        color: "var(--hero-text-color)",
        "& .MuiTypography-root, & .MuiButton-root": { fontFamily: FONT },
      }}
    >
      {/* شبكة نقاط تقنية ناعمة */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: darkMode
            ? "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(24,110,150,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, #000 20%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, #000 20%, transparent 75%)",
        }}
      />
      
      {/* توهج ناعم جداً */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: darkMode
            ? "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212,175,55,0.05), transparent 70%)"
            : "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(24,110,150,0.05), transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 20%, #000 70%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 20%, #000 70%, transparent 100%)",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
          px: { xs: 2.5, sm: 5, md: 8 },
          pt: { xs: "90px", md: "110px" },
          pb: { xs: 6, md: 8 },
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          gap: { xs: 4, md: 8 },
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* ───── اليسار ───── */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 55%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
    {/* 1. العنوان الرئيسي H1 مع نص مخفي بصرياً غني بالكلمات المفتاحية لجوجل */}
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: isTinyScreen ? "2.1rem" : "2.5rem",
                sm: "3.4rem",
                md: "3.6rem",
                lg: "4rem",
              },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--hero-text-color)",
              mb: 1.5,
            }}
          >
            Hi, I'm{" "}
            <Box component="span" sx={{ color: "var(--hero-name-color)" }}>
              Islam Hadaya
            </Box>
          </Typography>

          {/* 2. تحويل المسمى الوظيفي إلى H2 حقيقي وإضافة التقنيات الأساسية */}
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              fontWeight: 500,
              color: "var(--hero-name-color)",
              mb: 3,
            }}
          >
            Full-Stack Software Engineer (Next.js, NestJS & Laravel)
          </Typography>

          <Box
            sx={{
              width: 40,
              height: 2,
              bgcolor: "var(--hero-border-color)",
              opacity: 0.4,
              mb: 3,
            }}
          />

          {/* 3. نص ثابت لعناكب البحث + بقاء TypeAnimation للزوار كما هو */}
          <Typography
            component="div"
            sx={{
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              maxWidth: { xs: "100%", sm: "520px" },
              lineHeight: 1.6,
              color: "var(--hero-text-color)",
              opacity: 0.8,
              mb: 4,
              minHeight: "4.5rem",
            }}
          >
            {/* هذا النص يقرؤه Google فوراً في السيرفر ولا يغير شكل التصميم */}
            <Box
              component="p"
              sx={{
                position: "absolute",
                width: "1px",
                height: "1px",
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              إسلام هدايا (Islam Hadaya) مطور ويب فل ستاك ومهندس برمجيات متخصص في بناء تطبيقات الويب ومنصات SaaS وتصميم REST APIs باستخدام Next.js, NestJS, Laravel, Node.js, React, PostgreSQL, Prisma, وأتمتة الأنظمة.
            </Box>

            <TypeAnimation
              sequence={[
                "Full-stack developer turning ideas into impact.",
                2000,
                "Building scalable, secure, and beautiful applications.",
                2000,
                "Next.js • NestJS • Laravel • PostgreSQL.",
                2000,
                "From concept to deployment, I deliver excellence.",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </Typography>

          {/* الأزرار */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: 1.5,
              mb: 5,
              width: "100%",
              maxWidth: { xs: "320px", sm: "100%" },
            }}
          >
            <Button
              variant="contained"
              href="/cv/Islam_Hadaya_CV.pdf"
              download="Islam-Hadaya-CV.pdf"
              endIcon={<DownloadIcon sx={{ fontSize: 18 }} />}
              sx={{
                ...techBtn,
                backgroundColor: "var(--hero-download-bg)",
                color: "var(--hero-download-text)",
                "&:hover": {
                  backgroundColor: "var(--hero-download-bg)",
                  opacity: 0.9,
                },
              }}
            >
              Download CV
            </Button>

            <Button
              variant="contained"
              href="#Portfolio"
              endIcon={<AppsIcon sx={{ fontSize: 18 }} />}
              sx={{
                ...techBtn,
                backgroundColor: "var(--hero-tag-bg)",
                color: "var(--hero-text-color)",
                border: "1px solid var(--hero-tag-border)",
                "&:hover": {
                  backgroundColor: "var(--hero-code-surface)",
                  borderColor: "var(--hero-border-color)",
                },
              }}
            >
              View Projects
            </Button>

            <Button
              variant="outlined"
              startIcon={<SmartToyIcon sx={{ fontSize: 18 }} />}
              onClick={() => setChatOpen(true)}
              sx={{
                ...techBtn,
                borderColor: "var(--hero-tag-border)",
                color: "var(--hero-text-color)",
                "&:hover": {
                  borderColor: "var(--hero-border-color)",
                  backgroundColor: "var(--hero-tag-bg)",
                },
              }}
            >
              Ask AI Assistant
            </Button>
          </Box>

          {/* الروابط الاجتماعية */}
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {socials.map((s) => (
              <IconButton
                key={s.label}
                href={s.href}
                target="_blank"
                aria-label={s.label}
                sx={{
                  color: s.color,
                  width: 44,
                  height: 44,
                  bgcolor: "var(--hero-tag-bg)",
                  border: "1px solid var(--hero-tag-border)",
                  borderRadius: "8px", // حواف ناعمة
                  transition: "color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
                  "&:hover": {
                    color: s.hoverColor,
                    borderColor: s.hoverColor,
                    bgcolor: "transparent",
                  },
                }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* ───── اليمين: بطاقة البروفايل + الترمنال ───── */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 40%" },
            width: "100%",
            maxWidth: { xs: "100%", md: 440 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px", // حواف ناعمة
              p: { xs: 3, sm: 4 },
              textAlign: "center",
              background: "var(--hero-code-bg)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--hero-code-border)",
              boxShadow: "var(--hero-code-shadow)",
              transition: "border-color 0.3s ease",
              "&:hover": { borderColor: "var(--hero-name-color)" },
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                alt="Islam Hadaya"
                src="https://i.ibb.co/P2FpddR/my-photo-2.jpg"
                sx={{
                  width: { xs: 120, sm: 140 },
                  height: { xs: 120, sm: 140 },
                  bgcolor: "var(--hero-avatar-bg)",
                  border: "2px solid var(--hero-border-color)",
                  boxShadow: "none", // إزالة الظل المبالغ فيه
                }}
              />
              <VerifiedIcon
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  fontSize: 24,
                  color: "var(--hero-code-text)",
                  bgcolor: "var(--hero-avatar-bg)",
                  borderRadius: "50%",
                  p: 0.2,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: 700,
                color: "var(--hero-text-color)",
                mt: 2,
              }}
            >
              Islam Hadaya
            </Typography>
            <Typography
              sx={{ fontSize: "0.9rem", color: "var(--hero-name-color)", fontWeight: 500, mt: 0.5 }}
            >
              Full-Stack Developer
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              p: { xs: 1.5, sm: 2 },
              background: "var(--hero-code-bg)",
              backdropFilter: "blur(10px)",
              border: "1px solid var(--hero-code-border)",
              boxShadow: "var(--hero-code-shadow)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                mb: 1.5,
                pb: 1.2,
                borderBottom: "1px solid var(--hero-code-border)",
              }}
            >
              <Box sx={{ display: "flex", gap: 0.8 }}>
                {["#ff5f57", "#ffbd2e", "#28c840"].map((col) => (
                  <Box
                    key={col}
                    sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: col, opacity: 0.7 }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "var(--hero-text-color)",
                  opacity: 0.5,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 600,
                }}
              >
                terminal:~ /developer
              </Typography>
              <CodeIcon
                sx={{ fontSize: 16, color: "var(--hero-code-text)", ml: "auto", opacity: 0.5 }}
              />
            </Box>

            <Box
              sx={{
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: { xs: "11px", sm: "12px" },
                lineHeight: 1.7,
                color: "var(--hero-code-text)",
                minHeight: { xs: "140px", sm: "160px" },
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: "var(--hero-code-surface)",
                borderRadius: "8px",
                p: { xs: 1.2, sm: 1.5 },
                textAlign: "left",
                direction: "ltr",
              }}
            >
              {displayText}
              {isTyping && textIndex < CODE_LINES.length && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "2px",
                    height: "13px",
                    bgcolor: "var(--hero-code-text)",
                    animation: `${typeCursor} 0.8s ease-in-out infinite`,
                    ml: 0.5,
                    verticalAlign: "text-bottom",
                    "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                  }}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* ───── نافذة المساعد الذكي ───── */}
      <Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isTinyScreen}
        PaperProps={{
          sx: {
            ...heroVars,
            fontFamily: FONT,
            "& .MuiTypography-root, & .MuiInputBase-root": { fontFamily: FONT },
            borderRadius: "16px", // حواف ناعمة
            background: "var(--hero-dialog-bg)",
            color: "var(--hero-text-color)",
            border: "1px solid var(--hero-code-border)",
            overflow: "hidden",
            boxShadow: darkMode
              ? "0 20px 60px rgba(0,0,0,0.6)"
              : "0 20px 60px rgba(24,110,150,0.15)",
            m: { xs: 1, sm: 2 },
            maxHeight: { xs: "95vh", sm: "90vh" },
            backgroundImage: "none", // إزالة أي خلفيات إضافية
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: { xs: 1.5, sm: 2 },
            background: "var(--hero-tag-bg)",
            borderBottom: "1px solid var(--hero-code-border)",
            color: "var(--hero-text-color)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                borderRadius: "8px", // حواف ناعمة
                backgroundColor: "var(--hero-code-surface)",
                border: "1px solid var(--hero-code-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SmartToyIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: "var(--hero-name-color)" }} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" }, lineHeight: 1.2 }}
              >
                Islam's AI Assistant
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, fontSize: "0.7rem" }}>
                Online
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={() => setChatOpen(false)}
            sx={{ 
              color: "var(--hero-text-color)",
              "&:hover": { bgcolor: "var(--hero-code-surface)" }
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            flexDirection: "column",
            height: {
              xs: isTinyScreen ? "calc(100dvh - 62px)" : "420px",
              sm: "460px",
            },
            maxHeight: { xs: "calc(100dvh - 62px)", sm: "460px" },
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: { xs: 1.5, sm: 2 },
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.2, sm: 2 },
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "var(--hero-code-border)",
                borderRadius: 2,
              },
            }}
          >
            {messages.map((item, idx) => {
              const isUser = item.role === "user";
              const rtl = isRTLText(item.text);
              return (
                <Box
                  key={idx}
                  dir={rtl ? "rtl" : "ltr"}
                  sx={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: { xs: "90%", sm: "88%" },
                    p: { xs: 1.3, sm: 1.6 },
                    borderRadius: isUser
                      ? "12px 12px 2px 12px"
                      : "12px 12px 12px 2px", // حواف ناعمة
                    backgroundColor: isUser
                      ? "var(--hero-download-bg)"
                      : "var(--hero-code-surface)",
                    color: isUser ? "var(--hero-download-text)" : "inherit",
                    fontSize: { xs: "0.82rem", sm: "0.88rem" },
                    lineHeight: 1.6,
                    border: `1px solid ${
                      isUser ? "transparent" : "var(--hero-code-border)"
                    }`,
                    wordBreak: "break-word",
                    textAlign: rtl ? "right" : "left",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      opacity: 0.7,
                      mb: 0.6,
                      direction: "ltr",
                      textAlign: isUser ? "right" : "left",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {isUser ? "You" : "AI Assistant"}
                  </Typography>
                  {isUser ? (
                    <Box sx={{ whiteSpace: "pre-wrap" }}>{item.text}</Box>
                  ) : (
                    <Box sx={mdSx}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} target="_blank" rel="noopener noreferrer" />
                          ),
                        }}
                      >
                        {item.text}
                      </ReactMarkdown>
                    </Box>
                  )}
                </Box>
              );
            })}

            {loading && (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  p: 1.2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "8px",
                  backgroundColor: "var(--hero-code-surface)",
                  border: "1px solid var(--hero-code-border)",
                  animation: `${pulse} 1.5s ease-in-out infinite`,
                  direction: "ltr",
                }}
              >
                <CircularProgress size={14} sx={{ color: "var(--hero-name-color)" }} />
                <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "0.75rem" }}>
                  Analyzing profile...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: { xs: 1.2, sm: 1.5 },
              borderTop: "1px solid var(--hero-code-border)",
              display: "flex",
              gap: 1,
              alignItems: "center",
              backgroundColor: "var(--hero-code-surface)",
            }}
          >
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={4}
              placeholder="Ask in English or العربية..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px", // حواف ناعمة
                  fontSize: "0.85rem",
                  color: "inherit",
                  "& fieldset": { borderColor: "var(--hero-code-border)" },
                  "&:hover fieldset": { borderColor: "var(--hero-border-color)" },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--hero-border-color)",
                  },
                },
                "& .MuiInputBase-input": {
                  direction: isRTLText(inputMessage) ? "rtl" : "ltr",
                  textAlign: isRTLText(inputMessage) ? "right" : "left",
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={loading || !inputMessage.trim()}
              sx={{
                backgroundColor: "var(--hero-download-bg)",
                color: "var(--hero-download-text)",
                width: 40,
                height: 40,
                borderRadius: "8px", // حواف ناعمة
                flexShrink: 0,
                "&:hover": {
                  backgroundColor: "var(--hero-download-bg)",
                  opacity: 0.9,
                },
                "&.Mui-disabled": {
                  opacity: 0.4,
                  color: "var(--hero-download-text)",
                  backgroundColor: "var(--hero-download-bg)",
                },
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}