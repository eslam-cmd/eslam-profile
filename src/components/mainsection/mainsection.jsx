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
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { TypeAnimation } from "react-type-animation";
import AppsIcon from "@mui/icons-material/Apps";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import CodeIcon from "@mui/icons-material/Code";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { keyframes } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql } from "react-icons/si";

// تأثيرات حركية
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const typeCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

// ✅ كشف اتجاه النص: يرجع true فقط إذا كان النص عربي/عبري
// الافتراضي LTR لكل شيء آخر (إنجليزي، روسي، صيني، ياباني، كوري، تايلاندي...)
const isRTLText = (text) => {
  if (!text) return false;
  // إزالة رموز Markdown والعواطف قبل الفحص
  const clean = text.replace(/[*_`#>~\[\]()!\-]/g, "");
  // البحث عن أول حرف ذي دلالة اتجاه
  const match = clean.match(/[\u0600-\u06FF\u0590-\u05FF]|[A-Za-z]/);
  if (!match) return false;
  return /[\u0600-\u06FF\u0590-\u05FF]/.test(match[0]);
};

export default function MainSection({ toggleTheme, darkMode }) {
  const theme = useTheme();
  const isTinyScreen = useMediaQuery("(max-width:400px)");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [displayText, setDisplayText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(true);
  const [textIndex, setTextIndex] = React.useState(0);

  // حالة نافذة المساعد الذكي
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

  const colors = {
    buttonBg: darkMode ? "#0A1F44" : "#186e96",
    buttonText: darkMode ? "#D4AF37" : "#ffff",
    avatarBorder: darkMode ? "#D4AF37" : "#186e96",
    avatarShadow: darkMode
      ? "0 6px 58px rgba(212, 175, 55, 0.3)"
      : "rgba(14, 124, 175, 1)",
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    codeBg: darkMode ? "rgba(10, 31, 68, 0.9)" : "rgba(255, 255, 255, 0.85)",
    codeBorder: darkMode
      ? "rgba(212, 175, 55, 0.3)"
      : "rgba(24, 110, 150, 0.3)",
    codeText: darkMode ? "#D4AF37" : "#186e96",
    aiAccent: darkMode ? "#D4AF37" : "#186e96",
  };

  const iconColors = {
    email: darkMode ? "#FFD700" : "#D4AF37",
    github: darkMode ? "#EAEAEA" : "#000",
    linkedin: darkMode ? "#64B5F6" : "#0A66C2",
  };

  const codeLines = [
    "const developer = {",
    '  name: "Islam Hadaya",',
    '  skills: ["React", "Next.js", "Node.js"],',
    '  passion: "Building integrated systems"',
    "};",
    'console.log("Hello World! 🚀");',
  ];

  // محاكاة الكتابة
  React.useEffect(() => {
    if (textIndex < codeLines.length) {
      const line = codeLines[textIndex];
      let charIndex = 0;
      setIsTyping(true);

      const typeInterval = setInterval(() => {
        if (charIndex <= line.length) {
          setDisplayText((prev) => {
            const lines = prev.split("\n");
            if (lines.length > textIndex) {
              lines[textIndex] = line.substring(0, charIndex);
              return lines.join("\n");
            } else {
              return [...prev.split("\n"), line.substring(0, charIndex)].join(
                "\n",
              );
            }
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setTimeout(() => {
            setTextIndex((prev) => prev + 1);
            if (textIndex < codeLines.length - 1) {
              setDisplayText((prev) => prev + "\n");
            } else {
              setTimeout(() => {
                setDisplayText("");
                setTextIndex(0);
              }, 3000);
            }
          }, 500);
        }
      }, 40);

      return () => clearInterval(typeInterval);
    }
  }, [textIndex]);

  // تمرير صندوق الرسائل للأسفل تلقائياً
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // إرسال السؤال للـ API
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

  const techIcons = [
    { icon: FaReact, color: "#61DBFB", top: "10%", right: "8%", size: 60 },
    {
      icon: SiNextdotjs,
      color: darkMode ? "#fff" : "#000",
      bottom: "15%",
      right: "12%",
      size: 55,
    },
    { icon: FaNodeJs, color: "#68a063", bottom: "10%", left: "8%", size: 55 },
    { icon: SiPostgresql, color: "#336791", top: "15%", left: "10%", size: 50 },
  ];

  return (
    <section
      id="home"
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {techIcons.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: item.top,
              right: item.right,
              left: item.left,
              bottom: item.bottom,
              opacity: 0.08,
              zIndex: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <item.icon
              style={{
                fontSize: isTinyScreen ? item.size * 0.7 : item.size,
                color: item.color,
              }}
            />
          </Box>
        ))}
      </Box>

      {/* المحتوى الرئيسي */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: {
            xs: "8px 12px 20px",
            sm: "20px",
            md: "40px",
          },
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          gap: { xs: 2, sm: 3, md: 6 },
          maxWidth: "1200px",
          mx: "auto",
          marginTop: {
            xs: "70px",
            sm: "80px",
            md: "100px",
            lg: "120px",
          },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* القسم الأيسر - المعلومات الشخصية */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            px: { xs: 0.5, sm: 0 },
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              alt="Islam Hadaya"
              src="https://i.ibb.co/P2FpddR/my-photo-2.jpg"
              sx={{
                width: {
                  xs: isTinyScreen ? 110 : 130,
                  sm: 160,
                  md: 190,
                  lg: 220,
                },
                height: {
                  xs: isTinyScreen ? 110 : 130,
                  sm: 160,
                  md: 190,
                  lg: 220,
                },
                boxShadow: colors.avatarShadow,
                border: "3px solid " + colors.avatarBorder,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
            <VerifiedIcon
              sx={{
                position: "absolute",
                bottom: 6,
                right: 6,
                color: darkMode ? "#D4AF37" : "#186e96",
                fontSize: { xs: "22px", sm: "28px", md: "32px" },
                background: darkMode ? "#0A1F44" : "#fff",
                borderRadius: "50%",
                p: 0.2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: {
                xs: isTinyScreen ? "1.35rem" : "1.5rem",
                sm: "2rem",
                md: "2.6rem",
                lg: "3.2rem",
              },
              fontWeight: 700,
              color: colors.nameColor,
              letterSpacing: "-0.02em",
              mt: { xs: 2, sm: 3 },
              textShadow: darkMode
                ? "0 0 30px rgba(212, 175, 55, 0.15)"
                : "0 0 30px rgba(24, 110, 150, 0.15)",
              lineHeight: 1.2,
            }}
          >
            Islam Hadaya
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: isTinyScreen ? "0.78rem" : "0.85rem",
                sm: "0.95rem",
                md: "1.05rem",
              },
              maxWidth: { xs: "100%", sm: "520px", md: "600px" },
              lineHeight: 1.7,
              fontWeight: 400,
              mt: { xs: 1.5, sm: 2 },
              minHeight: { xs: "4rem", sm: "3.5rem" },
              color: darkMode ? "#ccc" : "#333",
              px: { xs: 1, sm: 0 },
            }}
          >
            <TypeAnimation
              sequence={[
                "Full-stack developer turning ideas into impact.",
                2000,
                "Building scalable, secure, and beautiful applications.",
                2000,
                "React • Next.js • Node.js — clean code, clear vision.",
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

          {/* الأزرار الثلاثة */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1.2, sm: 1.5 },
              mt: { xs: 2.5, sm: 3 },
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: { xs: "300px", sm: "100%" },
            }}
          >
            <Button
              variant="contained"
              endIcon={<DownloadIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
              sx={{
                width: { xs: "100%", sm: "auto" },
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.7, sm: 0.9, md: 1.1 },
                borderRadius: "25px",
                fontSize: {
                  xs: isTinyScreen ? "0.7rem" : "0.75rem",
                  sm: "0.82rem",
                  md: "0.92rem",
                },
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 8px 30px ${
                    darkMode
                      ? "rgba(212, 175, 55, 0.3)"
                      : "rgba(24, 110, 150, 0.3)"
                  }`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Download CV
            </Button>

            <Button
              variant="contained"
              endIcon={
                <AppsIcon
                  sx={{
                    color: colors.buttonText,
                    fontSize: { xs: 16, sm: 18 },
                  }}
                />
              }
              sx={{
                width: { xs: "100%", sm: "auto" },
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.7, sm: 0.9, md: 1.1 },
                borderRadius: "25px",
                fontSize: {
                  xs: isTinyScreen ? "0.7rem" : "0.75rem",
                  sm: "0.82rem",
                  md: "0.92rem",
                },
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 8px 30px ${
                    darkMode
                      ? "rgba(212, 175, 55, 0.3)"
                      : "rgba(24, 110, 150, 0.3)"
                  }`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <Link
                href="#Portfolio"
                style={{
                  textDecoration: "none",
                  color: colors.buttonText,
                  display: "inline-block",
                }}
              >
                View Projects
              </Link>
            </Button>

            {/* زر المساعد الذكي */}
            <Button
              variant="outlined"
              startIcon={<SmartToyIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
              onClick={() => setChatOpen(true)}
              sx={{
                width: { xs: "100%", sm: "auto" },
                px: { xs: 1.5, sm: 2, md: 2.5 },
                py: { xs: 0.7, sm: 0.9, md: 1.1 },
                borderRadius: "25px",
                fontSize: {
                  xs: isTinyScreen ? "0.7rem" : "0.75rem",
                  sm: "0.82rem",
                  md: "0.92rem",
                },
                borderColor: colors.aiAccent,
                color: colors.aiAccent,
                fontWeight: 600,
                textTransform: "none",
                borderWidth: "1.5px",
                "&:hover": {
                  borderWidth: "1.5px",
                  borderColor: colors.aiAccent,
                  backgroundColor: darkMode
                    ? "rgba(212, 175, 55, 0.1)"
                    : "rgba(24, 110, 150, 0.08)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Ask AI Assistant
            </Button>
          </Box>

          {/* الروابط الاجتماعية */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 2.5 },
              mt: { xs: 3, sm: 4 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="mailto:hdayaaslam34@gmail.com"
              target="_blank"
              aria-label="Email"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15) translateY(-3px)" },
              }}
            >
              <EmailIcon
                sx={{
                  color: iconColors.email,
                  fontSize: { xs: 24, sm: 26, md: 28 },
                }}
              />
            </Link>
            <Link
              href="https://github.com/eslam-cmd"
              target="_blank"
              aria-label="GitHub"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15) translateY(-3px)" },
              }}
            >
              <GitHubIcon
                sx={{
                  color: iconColors.github,
                  fontSize: { xs: 24, sm: 26, md: 28 },
                }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/Islam-hadaya"
              target="_blank"
              aria-label="LinkedIn"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15) translateY(-3px)" },
              }}
            >
              <LinkedInIcon
                sx={{
                  color: iconColors.linkedin,
                  fontSize: { xs: 24, sm: 26, md: 28 },
                }}
              />
            </Link>
          </Box>
        </Box>

        {/* القسم الأيمن - الكود المكتوب */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 45%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: { xs: "100%", md: "500px" },
            width: "100%",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "440px", md: "480px" },
              borderRadius: { xs: 3, sm: 4 },
              background: colors.codeBg,
              backdropFilter: "blur(12px)",
              border: `1px solid ${colors.codeBorder}`,
              padding: {
                xs: 1.5,
                sm: 2.5,
                md: 3.5,
              },
              boxShadow: `0 12px 50px ${
                darkMode
                  ? "rgba(212, 175, 55, 0.08)"
                  : "rgba(24, 110, 150, 0.08)"
              }`,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 20px 60px ${
                  darkMode
                    ? "rgba(212, 175, 55, 0.12)"
                    : "rgba(24, 110, 150, 0.12)"
                }`,
                borderColor: darkMode
                  ? "rgba(212, 175, 55, 0.5)"
                  : "rgba(24, 110, 150, 0.5)",
              },
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* رأس المحرر */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                mb: { xs: 1.5, sm: 2.5 },
                pb: { xs: 1, sm: 1.5 },
                borderBottom: `1px solid ${colors.codeBorder}`,
              }}
            >
              <Box sx={{ display: "flex", gap: { xs: 0.6, sm: 1 } }}>
                <Box
                  sx={{
                    width: { xs: 9, sm: 12 },
                    height: { xs: 9, sm: 12 },
                    borderRadius: "50%",
                    bgcolor: "#ff5f57",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: 9, sm: 12 },
                    height: { xs: 9, sm: 12 },
                    borderRadius: "50%",
                    bgcolor: "#ffbd2e",
                  }}
                />
                <Box
                  sx={{
                    width: { xs: 9, sm: 12 },
                    height: { xs: 9, sm: 12 },
                    borderRadius: "50%",
                    bgcolor: "#28c840",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "9px", sm: "11px" },
                  color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  ml: 0.5,
                  display: { xs: "none", sm: "block" },
                }}
              >
                terminal:~ /developer
              </Typography>
              <CodeIcon
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  color: colors.codeText,
                  ml: "auto",
                  opacity: 0.4,
                }}
              />
            </Box>

            {/* محتوى الكود */}
            <Box
              sx={{
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: {
                  xs: isTinyScreen ? "10px" : "11px",
                  sm: "12px",
                  md: "14px",
                },
                lineHeight: { xs: 1.7, sm: 1.9 },
                color: colors.codeText,
                minHeight: {
                  xs: "170px",
                  sm: "190px",
                  md: "220px",
                },
                position: "relative",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: darkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                borderRadius: 2,
                p: { xs: 1.2, sm: 2 },
                overflow: "hidden",
              }}
            >
              {displayText || (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                    Loading...
                  </Typography>
                </Box>
              )}
              {isTyping && textIndex < codeLines.length && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "2px",
                    height: { xs: "12px", sm: "16px" },
                    bgcolor: colors.codeText,
                    animation: `${typeCursor} 0.8s ease-in-out infinite`,
                    ml: 1,
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* نافذة المساعد الذكي (Modal / Dialog) */}
      <Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isTinyScreen}
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 3 },
            background: darkMode ? "#0c1932" : "#ffffff",
            border: `1px solid ${colors.codeBorder}`,
            overflow: "hidden",
            boxShadow: `0 20px 60px ${
              darkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.15)"
            }`,
            m: { xs: 1, sm: 2 },
            maxHeight: { xs: "95vh", sm: "90vh" },
          },
        }}
      >
        {/* شريط العنوان */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: { xs: 1.5, sm: 2 },
            background: darkMode
              ? `linear-gradient(135deg, ${colors.buttonBg}, #061428)`
              : `linear-gradient(135deg, ${colors.buttonBg}, #0f4d68)`,
            color: colors.buttonText,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              sx={{
                width: { xs: 32, sm: 38 },
                height: { xs: 32, sm: 38 },
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 1,
                  right: 1,
                  width: { xs: 8, sm: 10 },
                  height: { xs: 8, sm: 10 },
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  border: `2px solid ${colors.buttonBg}`,
                },
              }}
            >
              <SmartToyIcon sx={{ fontSize: { xs: 18, sm: 22 } }} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  lineHeight: 1.2,
                }}
              >
                Islam's AI Assistant
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.72rem" },
                  opacity: 0.85,
                }}
              >
                Online
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="small"
            onClick={() => setChatOpen(false)}
            sx={{
              color: colors.buttonText,
              "&:hover": { transform: "rotate(90deg)" },
              transition: "transform 0.3s",
            }}
          >
            <CloseIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
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
          {/* سجل الأسئلة والأجوبة */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 1.5, sm: 2.5 },
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.2, sm: 2 },
              "&::-webkit-scrollbar": { width: 5 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colors.codeBorder,
                borderRadius: 4,
              },
            }}
          >
            {messages.map((item, idx) => {
              const isUser = item.role === "user";
              // ✅ كشف الاتجاه لكل رسالة على حدة (الافتراضي LTR)
              const rtl = isRTLText(item.text);

              return (
                <Box
                  key={idx}
                  dir={rtl ? "rtl" : "ltr"}
                  sx={{
                    alignSelf: isUser ? "flex-end" : "flex-start",
                    maxWidth: { xs: "90%", sm: "88%" },
                    p: { xs: 1.3, sm: 1.8 },
                    borderRadius: isUser
                      ? "14px 14px 2px 14px"
                      : "14px 14px 14px 2px",
                    backgroundColor: isUser
                      ? colors.buttonBg
                      : darkMode
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)",
                    color: isUser ? colors.buttonText : "inherit",
                    fontSize: { xs: "0.82rem", sm: "0.9rem" },
                    lineHeight: 1.7,
                    border: `1px solid ${
                      isUser
                        ? "transparent"
                        : darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.08)"
                    }`,
                    wordBreak: "break-word",
                    direction: rtl ? "rtl" : "ltr",
                    textAlign: rtl ? "right" : "left",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      fontWeight: 700,
                      fontSize: { xs: "0.65rem", sm: "0.72rem" },
                      opacity: 0.8,
                      mb: 0.6,
                      // ✅ تسمية المتحدث دائماً LTR
                      direction: "ltr",
                      textAlign: isUser ? "right" : "left",
                      letterSpacing: "0.3px",
                      textTransform: "uppercase",
                    }}
                  >
                    {isUser ? "You" : "AI Assistant"}
                  </Typography>

                  {isUser ? (
                    // رسائل المستخدم: نص عادي
                    <Box
                      sx={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.text}
                    </Box>
                  ) : (
                    // رسائل المساعد: Markdown منسّق
                    <Box
                      sx={{
                        "& > *:first-of-type": { mt: 0 },
                        "& > *:last-child": { mb: 0 },
                        "& p": {
                          m: 0,
                          mb: 1,
                          lineHeight: 1.75,
                          fontSize: { xs: "0.82rem", sm: "0.9rem" },
                        },
                        "& h1, & h2, & h3": {
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          fontWeight: 700,
                          mt: 1.5,
                          mb: 0.8,
                          color: colors.aiAccent,
                          borderBottom: `1px solid ${colors.codeBorder}`,
                          pb: 0.4,
                        },
                        "& h4, & h5, & h6": {
                          fontSize: { xs: "0.85rem", sm: "0.95rem" },
                          fontWeight: 700,
                          mt: 1.2,
                          mb: 0.6,
                          color: colors.aiAccent,
                        },
                        "& ul, & ol": {
                          m: 0,
                          my: 0.8,
                          pl: 2.5,
                        },
                        "& li": {
                          fontSize: { xs: "0.82rem", sm: "0.9rem" },
                          lineHeight: 1.75,
                          mb: 0.4,
                        },
                        "& li::marker": {
                          color: colors.aiAccent,
                        },
                        "& strong, & b": {
                          fontWeight: 700,
                          color: colors.aiAccent,
                        },
                        "& em": {
                          fontStyle: "italic",
                          opacity: 0.9,
                        },
                        "& code": {
                          backgroundColor: darkMode
                            ? "rgba(212, 175, 55, 0.12)"
                            : "rgba(24, 110, 150, 0.1)",
                          color: colors.aiAccent,
                          px: 0.6,
                          py: 0.2,
                          borderRadius: "4px",
                          fontFamily: "'Fira Code', 'Courier New', monospace",
                          fontSize: "0.82em",
                          fontWeight: 500,
                        },
                        "& pre": {
                          backgroundColor: darkMode
                            ? "rgba(0, 0, 0, 0.4)"
                            : "rgba(0, 0, 0, 0.05)",
                          p: 1.5,
                          borderRadius: 1.5,
                          overflowX: "auto",
                          my: 1,
                          direction: "ltr",
                          textAlign: "left",
                          "& code": {
                            backgroundColor: "transparent",
                            p: 0,
                            color: "inherit",
                          },
                        },
                        "& a": {
                          color: colors.aiAccent,
                          textDecoration: "underline",
                          "&:hover": { opacity: 0.8 },
                        },
                        "& blockquote": {
                          borderLeft: `3px solid ${colors.aiAccent}`,
                          pl: 1.5,
                          my: 1,
                          opacity: 0.9,
                          fontStyle: "italic",
                        },
                        "& hr": {
                          border: "none",
                          borderTop: `1px solid ${colors.codeBorder}`,
                          my: 1.5,
                        },
                        "& table": {
                          width: "100%",
                          borderCollapse: "collapse",
                          my: 1,
                          fontSize: "0.82rem",
                        },
                        "& th, & td": {
                          border: `1px solid ${colors.codeBorder}`,
                          p: 0.8,
                          textAlign: rtl ? "right" : "left",
                        },
                        "& th": {
                          backgroundColor: darkMode
                            ? "rgba(212, 175, 55, 0.08)"
                            : "rgba(24, 110, 150, 0.06)",
                          fontWeight: 700,
                        },
                      }}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
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
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  borderRadius: 2,
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  animation: `${pulse} 1.5s ease-in-out infinite`,
                  direction: "ltr",
                }}
              >
                <CircularProgress size={16} sx={{ color: colors.aiAccent }} />
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.85,
                    fontSize: { xs: "0.72rem", sm: "0.78rem" },
                  }}
                >
                  Analyzing profile & generating response...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* حقل إدخال السؤال والإرسال */}
          <Box
            sx={{
              p: { xs: 1.2, sm: 1.8 },
              borderTop: `1px solid ${
                darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
              }`,
              display: "flex",
              gap: { xs: 1, sm: 1.5 },
              alignItems: "center",
              backgroundColor: darkMode
                ? "rgba(0,0,0,0.15)"
                : "rgba(255,255,255,0.6)",
            }}
          >
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={4}
              placeholder={
                isSmallScreen
                  ? "Ask in English or العربية..."
                  : "Ask your question here (e.g. What is Islam's experience with databases?)..."
              }
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
                  borderRadius: "20px",
                  backgroundColor: darkMode
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.02)",
                  fontSize: { xs: "0.82rem", sm: "0.9rem" },
                  "& fieldset": {
                    borderColor: colors.codeBorder,
                  },
                  "&:hover fieldset": {
                    borderColor: colors.aiAccent,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.aiAccent,
                  },
                },
                "& .MuiInputBase-input": {
                  py: { xs: 0.9, sm: 1 },
                  // ✅ اتجاه الإدخال: عربي إذا كان النص عربي، وإلا LTR
                  direction: isRTLText(inputMessage) ? "rtl" : "ltr",
                  textAlign: isRTLText(inputMessage) ? "right" : "left",
                },
                "& .MuiInputBase-input::placeholder": {
                  direction: "ltr",
                  textAlign: "left",
                  opacity: 0.6,
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={loading || !inputMessage.trim()}
              sx={{
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
                "&:hover": {
                  backgroundColor: colors.buttonBg,
                  transform: "scale(1.08) rotate(-10deg)",
                },
                "&.Mui-disabled": {
                  opacity: 0.4,
                  color: colors.buttonText,
                  backgroundColor: colors.buttonBg,
                },
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            >
              <SendIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </section>
  );
}
