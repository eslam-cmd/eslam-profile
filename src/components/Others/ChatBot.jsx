"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  alpha,
  useTheme,
  Chip,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// ============ الثوابت ============
const INITIAL_MESSAGE = {
  role: "model",
  text: `👋 **Hello! I'm Islam's AI Assistant.**

Ask me anything about his **engineering projects**, **technical stack**, **architecture decisions**, or **professional experience**.

*You can also ask in العربية, Русский, 中文, 日本語, 한국어, or any other language.*`,
};

const SUGGESTIONS = [
  { label: "What's Islam's tech stack?", icon: "⚙️" },
  { label: "Tell me about ScanLens", icon: "🔒" },
  { label: "How does he handle security?", icon: "🛡️" },
  { label: "What databases does he use?", icon: "🗄️" },
];

// ============ كشف اللغة ============
const detectLang = (text) => {
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  if (/[\u4E00-\u9FFF]/.test(text)) return "zh";
  if (/[\u3040-\u30FF]/.test(text)) return "ja";
  if (/[\uAC00-\uD7AF]/.test(text)) return "ko";
  if (/[\u0590-\u05FF]/.test(text)) return "he";
  if (/[\u0E00-\u0E7F]/.test(text)) return "th";
  return "en";
};

const isRTL = (text) => ["ar", "he"].includes(detectLang(text));

// ============ مكوّن الرسالة ============
function MessageBubble({ msg, primaryColor, isDark, onCopy }) {
  const [copied, setCopied] = useState(false);
  const rtl = isRTL(msg.text);
  const isUser = msg.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(msg.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      onCopy?.();
    } catch {}
  };

  return (
    <Box
      sx={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "90%",
        position: "relative",
        "&:hover .copy-btn": { opacity: 1 },
      }}
    >
      <Box
        sx={{
          p: 1.8,
          borderRadius: isUser ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
          backgroundColor: isUser
            ? primaryColor
            : isDark
              ? alpha("#ffffff", 0.06)
              : alpha("#000000", 0.04),
          color: isUser ? "#ffffff" : isDark ? "#e2e8f0" : "#1e293b",
          fontSize: "0.88rem",
          lineHeight: 1.75,
          direction: rtl ? "rtl" : "ltr",
          textAlign: rtl ? "right" : "left",
          border: `1px solid ${
            isUser
              ? "transparent"
              : isDark
                ? alpha("#ffffff", 0.08)
                : alpha("#000000", 0.06)
          }`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            fontWeight: 700,
            fontSize: "0.68rem",
            opacity: 0.75,
            mb: 0.6,
            letterSpacing: "0.3px",
            textTransform: "uppercase",
          }}
        >
          {isUser ? "You" : "AI Assistant"}
        </Typography>

        <Box
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            "& strong, & b": {
              color: isUser ? "#ffffff" : primaryColor,
              fontWeight: 700,
            },
            "& code": {
              backgroundColor: isDark
                ? "rgba(0,0,0,0.5)"
                : "rgba(24, 110, 150, 0.1)",
              color: isUser ? "#ffffff" : primaryColor,
              padding: "2px 6px",
              borderRadius: "4px",
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: "0.82em",
              fontWeight: 500,
            },
          }}
        >
          {msg.text}
        </Box>
      </Box>

      {/* زر نسخ الرد */}
      {!isUser && (
        <Tooltip title={copied ? "Copied!" : "Copy reply"} arrow>
          <IconButton
            className="copy-btn"
            size="small"
            onClick={handleCopy}
            sx={{
              position: "absolute",
              top: 4,
              [rtl ? "left" : "right"]: 4,
              opacity: 0,
              transition: "opacity 0.2s",
              backgroundColor: isDark
                ? alpha("#000000", 0.5)
                : alpha("#ffffff", 0.8),
              width: 26,
              height: 26,
              "&:hover": {
                backgroundColor: isDark
                  ? alpha("#000000", 0.8)
                  : alpha("#ffffff", 1),
              },
            }}
          >
            {copied ? (
              <CheckIcon sx={{ fontSize: 14, color: "#4caf50" }} />
            ) : (
              <ContentCopyIcon sx={{ fontSize: 13, color: primaryColor }} />
            )}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

// ============ المكوّن الرئيسي ============
export default function ChatBot() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "" });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const primaryColor = isDark ? "#D4AF37" : "#186e96";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // تركيز تلقائي على حقل الإدخال عند الفتح
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const executeSend = async (messageText) => {
    if (!messageText.trim() || loading) return;

    const userMessage = messageText.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
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

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setToast({ open: true, msg: "Chat reset successfully" });
  };

  const showSuggestions = useMemo(
    () => messages.length === 1 && !loading,
    [messages.length, loading],
  );

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          zIndex: 1300,
        }}
      >
        {/* الزر العائم */}
        {!open && (
          <Tooltip title="Ask AI Assistant" placement="left" arrow>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                width: { xs: 54, sm: 62 },
                height: { xs: 54, sm: 62 },
                backgroundColor: primaryColor,
                color: "#ffffff",
                boxShadow: `0 8px 25px ${alpha(primaryColor, 0.45)}`,
                animation: "float 3s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-6px)" },
                },
                "&:hover": {
                  backgroundColor: primaryColor,
                  transform: "scale(1.08)",
                  boxShadow: `0 12px 30px ${alpha(primaryColor, 0.6)}`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <SmartToyIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
            </IconButton>
          </Tooltip>
        )}

        {/* نافذة المحادثة */}
        {open && (
          <Paper
            elevation={12}
            sx={{
              width: {
                xs: "calc(100vw - 24px)",
                sm: "400px",
                md: "440px",
              },
              height: {
                xs: "min(600px, calc(100dvh - 32px))",
                sm: "580px",
              },
              display: "flex",
              flexDirection: "column",
              borderRadius: { xs: 3, sm: 4 },
              overflow: "hidden",
              border: `1px solid ${alpha(primaryColor, 0.25)}`,
              background: isDark
                ? "linear-gradient(145deg, #0d192e, #091222)"
                : "linear-gradient(145deg, #ffffff, #f7fafc)",
              boxShadow: isDark
                ? "0 20px 60px rgba(0, 0, 0, 0.75)"
                : "0 20px 50px rgba(24, 110, 150, 0.15)",
              animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "@keyframes slideUp": {
                from: { opacity: 0, transform: "translateY(20px) scale(0.98)" },
                to: { opacity: 1, transform: "translateY(0) scale(1)" },
              },
            }}
          >
            {/* الشريط العلوي */}
            <Box
              sx={{
                px: { xs: 2, sm: 2.5 },
                py: { xs: 1.5, sm: 1.8 },
                background: isDark
                  ? `linear-gradient(135deg, ${primaryColor}, #b8942e)`
                  : `linear-gradient(135deg, ${primaryColor}, #0f4d68)`,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                      border: "2px solid #ffffff",
                    },
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    sx={{
                      lineHeight: 1.2,
                      fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    }}
                  >
                    Islam's AI Assistant
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, fontSize: "0.68rem" }}
                  >
                    Online
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Tooltip title="Reset Chat" arrow>
                  <IconButton
                    size="small"
                    onClick={handleReset}
                    sx={{
                      color: "#ffffff",
                      opacity: 0.9,
                      "&:hover": { opacity: 1, transform: "rotate(-90deg)" },
                      transition: "transform 0.3s",
                    }}
                  >
                    <RestartAltIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close" arrow>
                  <IconButton
                    size="small"
                    onClick={() => setOpen(false)}
                    sx={{ color: "#ffffff", opacity: 0.9 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* صندوق الرسائل */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 1.5, sm: 2 },
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1.5, sm: 2 },
                "&::-webkit-scrollbar": { width: 5 },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: alpha(primaryColor, 0.25),
                  borderRadius: 4,
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: alpha(primaryColor, 0.45),
                },
              }}
            >
              {messages.map((msg, i) => (
                <MessageBubble
                  key={i}
                  msg={msg}
                  primaryColor={primaryColor}
                  isDark={isDark}
                />
              ))}

              {/* اقتراحات ذكية */}
              {showSuggestions && (
                <Box sx={{ mt: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.6,
                      mb: 1.2,
                    }}
                  >
                    <AutoAwesomeIcon
                      sx={{ fontSize: 15, color: primaryColor }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark
                          ? alpha("#ffffff", 0.7)
                          : alpha("#000000", 0.7),
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                        textTransform: "uppercase",
                        fontSize: "0.68rem",
                      }}
                    >
                      Suggested prompts
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                    {SUGGESTIONS.map((s, idx) => (
                      <Chip
                        key={idx}
                        label={`${s.icon} ${s.label}`}
                        onClick={() => executeSend(s.label)}
                        size="small"
                        sx={{
                          cursor: "pointer",
                          fontSize: "0.76rem",
                          fontWeight: 500,
                          py: 1.6,
                          backgroundColor: isDark
                            ? alpha(primaryColor, 0.12)
                            : alpha(primaryColor, 0.08),
                          color: primaryColor,
                          border: `1px solid ${alpha(primaryColor, 0.25)}`,
                          "&:hover": {
                            backgroundColor: alpha(primaryColor, 0.2),
                            transform: "translateY(-2px)",
                            boxShadow: `0 4px 12px ${alpha(primaryColor, 0.25)}`,
                          },
                          transition: "all 0.2s ease",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* مؤشر التحميل */}
              {loading && (
                <Box
                  sx={{
                    alignSelf: "flex-start",
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    borderRadius: 2,
                    backgroundColor: isDark
                      ? alpha("#ffffff", 0.05)
                      : alpha("#000000", 0.03),
                    animation: "pulse 1.5s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 0.7 },
                      "50%": { opacity: 1 },
                    },
                  }}
                >
                  <CircularProgress size={14} sx={{ color: primaryColor }} />
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.85, fontSize: "0.78rem" }}
                  >
                    Analyzing profile & generating response...
                  </Typography>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* حقل الإدخال */}
            <Box
              sx={{
                p: { xs: 1.2, sm: 1.5 },
                borderTop: "1px solid",
                borderColor: isDark
                  ? alpha("#ffffff", 0.08)
                  : alpha("#000000", 0.08),
                display: "flex",
                gap: 1,
                alignItems: "center",
                backgroundColor: isDark
                  ? alpha("#000000", 0.2)
                  : alpha("#ffffff", 0.7),
              }}
            >
              <TextField
                inputRef={inputRef}
                fullWidth
                size="small"
                multiline
                maxRows={4}
                placeholder="Ask in English, العربية, Русский..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    executeSend(input);
                  }
                }}
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    fontSize: "0.88rem",
                    backgroundColor: isDark
                      ? alpha("#ffffff", 0.04)
                      : alpha("#000000", 0.02),
                    "& fieldset": {
                      borderColor: alpha(primaryColor, 0.2),
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(primaryColor, 0.4),
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: primaryColor,
                    },
                  },
                }}
              />
              <IconButton
                onClick={() => executeSend(input)}
                disabled={loading || !input.trim()}
                sx={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                  width: 42,
                  height: 42,
                  flexShrink: 0,
                  "&:hover": {
                    backgroundColor: primaryColor,
                    transform: "scale(1.08) rotate(-10deg)",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.4,
                    color: "#ffffff",
                    backgroundColor: alpha(primaryColor, 0.5),
                  },
                  transition: "all 0.25s ease",
                }}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Paper>
        )}
      </Box>

      {/* إشعار Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ open: false, msg: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2, fontSize: "0.85rem" }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
