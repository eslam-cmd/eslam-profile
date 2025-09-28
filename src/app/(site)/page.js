"use client";

import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab, Modal } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Homepage = lazy(() => import("./(pages)/home/page.js"));
import LoadingScreen from "../../components/Ultimits/loading.jsx";
import ChatWidget from "../../components/chatWidget/ChatWidget.jsx";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false);

  // Intro overlay
  const [showOverlay, setShowOverlay] = useState(false);
  const [step, setStep] = useState(0);

  const introMessages = [
    "🎬 Welcome to Islam's Portfolio",
    "💡 Explore his skills and projects",
    "🤝 Let's start the conversation!"
  ];

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#000" : "#cbe4f0ff",
            paper: darkMode ? "#030d1dff" : "#186e96ff",
          },
          text: {
            primary: darkMode ? "#ddd" : "#282828",
            secondary: darkMode ? "#ccc" : "#555",
          },
          primary: {
            main: "#D4AF37",
          },
        },
        typography: {
          fontFamily: "Roboto, sans-serif",
        },
      }),
    [darkMode]
  );

  // Handle loading
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
      setShowOverlay(true);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Control overlay messages
  useEffect(() => {
    if (showOverlay && step < introMessages.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    }
    if (step === introMessages.length) {
      setTimeout(() => setShowOverlay(false), 1500);
    }
  }, [step, showOverlay]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box
          sx={{
            background: darkMode
              ? "linear-gradient(135deg, #000000, #0A1F44)"
              : "linear-gradient(135deg, #cbe4f0, #ffffff)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            transition: "background 0.5s ease-in-out",
            minHeight: "100vh",
            color: theme.palette.text.primary,
          }}
        >
          {/* Overlay intro */}
          {showOverlay && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.8)", // أسود شفاف
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 22,
                fontFamily: "monospace",
                zIndex: 9999,
              }}
            >
              {introMessages.slice(0, step).map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    m: 1,
                    opacity: 0,
                    animation: "fadeIn 1s forwards",
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {msg}
                </Box>
              ))}
              <style jsx global>{`
                @keyframes fadeIn {
                  to {
                    opacity: 1;
                  }
                }
              `}</style>
            </Box>
          )}

          {/* Main content */}
          {!showOverlay && (
            <>
              <Suspense fallback={<LoadingScreen />}>
                <Homepage toggleTheme={toggleTheme} darkMode={darkMode} />
              </Suspense>

              {/* Floating chat button */}
              <Fab
                color="primary"
                aria-label="chat"
                onClick={() => setOpenChat(true)}
                sx={{
                  position: "fixed",
                  bottom: 20,
                  right: 30,
                  backgroundColor: "#b8962f",
                  color: "#000",
                  "&:hover": { backgroundColor: "#b8962f" },
                }}
              >
                <ChatIcon />
              </Fab>

              {/* Chat modal */}
              <Modal
                open={openChat}
                onClose={() => setOpenChat(false)}
                aria-labelledby="chat-modal"
                aria-describedby="chat-with-ai"
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 80,
                    right: 30,
                    width: 350,
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 2,
                  }}
                >
                  <ChatWidget />
                </Box>
              </Modal>
            </>
          )}
        </Box>
      )}
    </ThemeProvider>
  );
}