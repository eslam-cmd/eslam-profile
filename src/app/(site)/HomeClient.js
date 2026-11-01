"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { useDarkMode } from "../../components/Others/ClientLayout.jsx";
import Homepage from "./(pages)/home/page.js";

export default function HomeClient({ children }) {
  const { darkMode, toggleTheme: handleToggleTheme } = useDarkMode();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
    }
  }, []);

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
          primary: { main: darkMode ? "#D4AF37" : "#1976d2" },
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', sans-serif",
          h1: { fontWeight: 700 },
          h2: { fontWeight: 600 },
          body1: { lineHeight: 1.6 },
        },
        shape: { borderRadius: 8 },
        components: {
          MuiPaper: {
            styleOverrides: { root: { transition: "all 0.2s ease-in-out" } },
          },
          MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
        },
      }),
    [darkMode]
  );

  const backgroundStyle = useMemo(
    () => ({
      background: darkMode
        ? "linear-gradient(135deg, #000000 0%, #0a1929 50%, #001e3c 100%)"
        : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
      backgroundSize: "cover",
      backgroundAttachment: isMobile || isIOS ? "scroll" : "fixed",
      transition: "all 0.3s ease-in-out",
      minHeight: "100vh",
      color: theme.palette.text.primary,
      WebkitOverflowScrolling: "touch",
      overflow: "auto",
    }),
    [darkMode, theme, isMobile, isIOS]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 1. القسم الأساسي (MainSection) يظهر هنا فوراً */}
      <Box
        sx={{
          "--hero-name-color": darkMode ? "#D4AF37" : "#186e96",
          "--hero-text-color": darkMode ? "#ccc" : "#333",
          "--hero-border-color": darkMode ? "#D4AF37" : "#186e96",
          "--hero-avatar-shadow": darkMode
            ? "0 6px 58px rgba(212, 175, 55, 0.3)"
            : "0 6px 58px rgba(14, 124, 175, 0.3)",
          "--hero-avatar-bg": darkMode ? "#0A1F44" : "#fff",
          "--hero-code-bg": darkMode
            ? "rgba(10, 31, 68, 0.9)"
            : "rgba(255, 255, 255, 0.85)",
          "--hero-code-border": darkMode
            ? "rgba(212, 175, 55, 0.3)"
            : "rgba(24, 110, 150, 0.3)",
          "--hero-code-text": darkMode ? "#D4AF37" : "#186e96",
          "--hero-code-shadow": darkMode
            ? "0 12px 50px rgba(212, 175, 55, 0.08)"
            : "0 12px 50px rgba(24, 110, 150, 0.08)",
          "--hero-code-surface": darkMode
            ? "rgba(0,0,0,0.2)"
            : "rgba(0,0,0,0.02)",
          "--hero-download-bg": darkMode ? "#0A1F44" : "#186e96",
          "--hero-download-text": darkMode ? "#D4AF37" : "#fff",
          "--hero-email-color": darkMode ? "#FFD700" : "#D4AF37",
          "--hero-github-color": darkMode ? "#EAEAEA" : "#000",
          "--hero-linkedin-color": darkMode ? "#64B5F6" : "#0A66C2",
        }}
      >
        {children}
      </Box>

      {/* 2. باقي أقسام الموقع تظهر مباشرة تحته بدون حجب عن محركات البحث */}
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        <Box sx={backgroundStyle}>
          <Homepage
            toggleTheme={handleToggleTheme}
            darkMode={darkMode}
            showMainSection={false}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}