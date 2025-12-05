"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab, Fade } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

import Homepage from "./(pages)/home/page.js";
import LoadingScreen from "../../components/Ultimits/loading.jsx";

function TypingMessage({ text, delay = 40, onComplete, key }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    // إعادة تعيين النص المعروض عند تغيير الرسالة
    setDisplayed("");

    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay, onComplete, key]); // إضافة key للاعتماديات

  return (
    <Box
      sx={{
        m: 2,
        fontSize: { xs: 20, sm: 24 },
        fontFamily: "'Roboto Mono', monospace",
        textAlign: "center",
        maxWidth: "90%",
        minHeight: "32px",
        lineHeight: 1.4,
        color: "#ffffff",
        fontWeight: "500",
      }}
    >
      {displayed}
      <Box
        component="span"
        sx={{
          animation: "blink 1s infinite",
          "@keyframes blink": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0 },
          },
        }}
      >
        |
      </Box>
    </Box>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [completedMessages, setCompletedMessages] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");

  const introMessages = [
    "🎬 Welcome to Islam's Portfolio",
    "💡 Explore his skills and projects",
    "🤝 Let's start the conversation!",
  ];

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#000000" : "#e3f2fd",
            paper: darkMode ? "#0a1929" : "#1976d2",
          },
          text: {
            primary: darkMode ? "#ffffff" : "#1a1a1a",
            secondary: darkMode ? "#b0b0b0" : "#666666",
          },
          primary: {
            main: darkMode ? "#D4AF37" : "#1976d2",
          },
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', sans-serif",
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 600,
          },
          body1: {
            lineHeight: 1.6,
          },
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [darkMode],
  );

  const buttonBg = darkMode ? "#D4AF37" : "#1976d2";
  const buttonHover = darkMode ? "#b8941f" : "#1565c0";

  // دالة للتحقق من مرور يومين
  const shouldShowIntro = () => {
    const seenIntro = localStorage.getItem("seenIntro");
    const introTimestamp = localStorage.getItem("introTimestamp");

    if (!seenIntro) return true;

    if (introTimestamp) {
      const now = Date.now();
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // يومين بالميلي ثانية
      const timePassed = now - parseInt(introTimestamp);

      if (timePassed >= twoDaysInMs) {
        // حذف البيانات القديمة وإعادة العرض
        localStorage.removeItem("seenIntro");
        localStorage.removeItem("introTimestamp");
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (shouldShowIntro()) {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowOverlay(true);
        setCurrentMessage(0);
        setCompletedMessages([]);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
      setShowOverlay(false);
    }
  }, []);

  const handleMessageComplete = () => {
    // إضافة الرسالة الحالية للمكتملة
    const newCompleted = [...completedMessages, introMessages[currentMessage]];
    setCompletedMessages(newCompleted);

    // إذا كانت هناك رسائل أخرى، انتقل للرسالة التالية
    if (currentMessage < introMessages.length - 1) {
      setTimeout(() => {
        setCurrentMessage(currentMessage + 1);
      }, 700);
    } else {
      // إذا كانت هذه آخر رسالة، أنهي العرض بعد تأخير
      setTimeout(() => {
        setShowOverlay(false);
        // حفظ الوقت الحالي عند اكتمال العرض
        localStorage.setItem("seenIntro", "true");
        localStorage.setItem("introTimestamp", Date.now().toString());
      }, 1000);
    }
  };

  useEffect(() => {
    if (openChat) {
      const timer = setTimeout(() => setOpenChat(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openChat]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            position: "relative",
            minHeight: "100vh",
          }}
        >
          {showOverlay && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: darkMode
                  ? "linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(10,25,41,0.98) 100%)"
                  : "linear-gradient(135deg, rgba(227,242,253,0.98) 0%, rgba(187,222,251,0.98) 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: 3,
              }}
            >
              {/* عرض الرسائل المكتملة */}
              {completedMessages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    m: 2,
                    fontSize: { xs: 20, sm: 24 },
                    fontFamily: "'Roboto Mono', monospace",
                    textAlign: "center",
                    maxWidth: "90%",
                    minHeight: "32px",
                    lineHeight: 1.4,
                    color: darkMode ? "#D4AF37" : "#1976d2",
                    fontWeight: "500",
                    opacity: 0.9,
                  }}
                >
                  {msg}
                </Box>
              ))}

              {/* عرض الرسالة الحالية التي تكتب */}
              {currentMessage < introMessages.length && (
                <TypingMessage
                  key={currentMessage} // إضافة key مهمة هنا
                  text={introMessages[currentMessage]}
                  delay={35}
                  onComplete={handleMessageComplete}
                />
              )}
            </Box>
          )}

          {!showOverlay && (
            <>
              <Box
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg, #000000 0%, #0a1929 50%, #001e3c 100%)"
                    : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
                  backgroundSize: "cover",
                  backgroundAttachment: "fixed",
                  transition: "all 0.5s ease-in-out",
                  minHeight: "100vh",
                  color: theme.palette.text.primary,
                }}
              >
                <Homepage toggleTheme={toggleTheme} darkMode={darkMode} />

                <Fab
                  onClick={() => setOpenChat(true)}
                  sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    backgroundColor: buttonBg,
                    color: "#ffffff",
                    fontWeight: "bold",
                    width: 56,
                    height: 56,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor: buttonHover,
                      transform: "scale(1.1)",
                      boxShadow: "0 6px 25px rgba(0,0,0,0.35)",
                    },
                    "&:active": {
                      transform: "scale(0.95)",
                    },
                  }}
                  aria-label="chat"
                >
                  <ChatIcon />
                </Fab>

                <Fade in={openChat} timeout={300}>
                  <Box
                    sx={{
                      position: "fixed",
                      bottom: isMobile ? 80 : 100,
                      right: isMobile ? "5%" : 24,
                      width: isMobile ? "90vw" : 320,
                      maxWidth: "400px",
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.text.primary,
                      borderRadius: 2,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      p: 3,
                      zIndex: 1300,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      border: darkMode
                        ? "1px solid rgba(212, 175, 55, 0.3)"
                        : "1px solid rgba(25, 118, 210, 0.3)",
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: 20,
                        fontWeight: "bold",
                        mb: 2,
                        color: theme.palette.primary.main,
                      }}
                    >
                      🛠 Under Maintenance
                    </Box>
                    <Box
                      sx={{
                        fontSize: 14,
                        color: theme.palette.text.secondary,
                        lineHeight: 1.5,
                      }}
                    >
                      This chat feature is currently being updated to serve you
                      better. Please check back soon!
                    </Box>
                  </Box>
                </Fade>
              </Box>
            </>
          )}
        </Box>
      )}
    </ThemeProvider>
  );
}
