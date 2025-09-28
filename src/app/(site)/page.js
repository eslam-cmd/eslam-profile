"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

import Homepage from "./(pages)/home/page.js";
import LoadingScreen from "../../components/Ultimits/loading.jsx";
import ChatWidget from "../../components/chatWidget/ChatWidget.jsx";

function TypingMessage({ text, delay = 40 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <Box
      sx={{
        m: 1,
        fontSize: 22,
        fontFamily: "monospace",
        textAlign: "center",
        maxWidth: "90%",
      }}
    >
      {displayed}
    </Box>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [step, setStep] = useState(0);

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
            default: darkMode ? "#000" : "#cbe4f0",
            paper: darkMode ? "#030d1d" : "#186e96",
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

  const buttonBg = darkMode ? "#947824" : "#186e96";
  const buttonHover = darkMode ? "#967103" : "#12465e";

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("seenIntro");
    if (hasSeenIntro) {
      setLoading(false);
      setShowOverlay(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowOverlay(true);
        localStorage.setItem("seenIntro", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showOverlay && step < introMessages.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    }
    if (step === introMessages.length) {
      setTimeout(() => setShowOverlay(false), 2000);
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
          {showOverlay && (
            <Box
              sx={{
                position: "fixed",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(10,31,68,0.85))",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                padding: 2,
              }}
            >
              {introMessages.slice(0, step).map((msg, i) => (
                <TypingMessage key={i} text={msg} delay={40} />
              ))}
            </Box>
          )}

          {!showOverlay && (
            <>
              <Homepage toggleTheme={toggleTheme} darkMode={darkMode} />

              <Fab
                onClick={() => setOpenChat(true)}
                sx={{
                  position: "fixed",
                  bottom: 20,
                  right: 20,
                  backgroundColor: buttonBg,
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: buttonHover,
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ChatIcon />
              </Fab>

              {openChat && (
                <Box
                  sx={{
                    position: "fixed",
                    bottom: isMobile ? "10%" : 80,
                    right: isMobile ? "5%" : 30,
                    width: isMobile ? "90vw" : 350,
                    height: isMobile ? "80vh" : "auto",
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 2,
                    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                    p: 2,
                    overflowY: "auto",
                    zIndex: 1300,
                  }}
                >
                  <ChatWidget />
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </ThemeProvider>
  );
}
