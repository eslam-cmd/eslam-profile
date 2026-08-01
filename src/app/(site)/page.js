"use client";

import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import LoadingScreen from "../../components/Others/loading.jsx";

const Homepage = lazy(() => import("./(pages)/home/page.js"));

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleToggleTheme = React.useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // ✅ ثيم محسّن بدون مشاكل
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
          h1: { fontWeight: 700 },
          h2: { fontWeight: 600 },
          body1: { lineHeight: 1.6 },
        },
        shape: {
          borderRadius: 8,
        },
        // ✅ إصلاح: استخدام الظلال الافتراضية
        // تم إزالة shadows لتجنب المشكلة
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                transition: "all 0.2s ease-in-out",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      }),
    [darkMode],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const backgroundStyle = useMemo(
    () => ({
      background: darkMode
        ? "linear-gradient(135deg, #000000 0%, #0a1929 50%, #001e3c 100%)"
        : "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      transition: "all 0.3s ease-in-out",
      minHeight: "100vh",
      color: theme.palette.text.primary,
    }),
    [darkMode, theme],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ position: "relative", minHeight: "100vh" }}>
          <Box sx={backgroundStyle}>
            <Suspense fallback={<LoadingScreen />}>
              <Homepage toggleTheme={handleToggleTheme} darkMode={darkMode} />
            </Suspense>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
