"use client";

import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import LoadingScreen from "../../components/Others/loading.jsx";

// ✅ تحسين: تعريف Homepage مع fallback
const Homepage = lazy(() =>
  import("./(pages)/home/page.js").catch((error) => {
    console.error("Failed to load homepage:", error);
    // ✅ إرجاع مكون بديل عند فشل التحميل
    return {
      default: () => (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography variant="h5" color="error">
            Failed to load page. Please refresh.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Refresh
          </Button>
        </Box>
      ),
    };
  }),
);

// ✅ مكون تحميل بديل
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: 3,
    }}
  >
    <CircularProgress
      size={60}
      sx={{
        color: "#D4AF37",
        animationDuration: "550ms",
      }}
    />
    <Typography
      sx={{
        color: "rgba(255,255,255,0.6)",
        fontSize: "14px",
        letterSpacing: "1px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      Loading your experience...
    </Typography>
    <Typography
      sx={{
        color: "rgba(255,255,255,0.2)",
        fontSize: "11px",
        letterSpacing: "2px",
        fontFamily: "monospace",
      }}
    >
      ✦ Please wait ✦
    </Typography>
  </Box>
);

// ✅ مكون خطأ عند فشل التحميل
const ErrorFallback = ({ onRetry }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      gap: 2,
      p: 3,
      textAlign: "center",
    }}
  >
    <Typography variant="h6" color="error" sx={{ fontWeight: 600 }}>
      ⚠️ Connection Issue
    </Typography>
    <Typography sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 400 }}>
      We're having trouble loading the page. This might be due to a slow
      internet connection.
    </Typography>
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      <Button
        variant="contained"
        onClick={onRetry}
        sx={{
          bgcolor: "#D4AF37",
          color: "#000",
          fontWeight: 600,
          "&:hover": { bgcolor: "#b8941f" },
        }}
      >
        Try Again
      </Button>
      <Button
        variant="outlined"
        onClick={() => window.location.reload()}
        sx={{
          borderColor: "rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        Refresh Page
      </Button>
    </Stack>
  </Box>
);

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleToggleTheme = React.useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // ✅ تحسين: ثيم محسّن
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

  // ✅ تحسين: محاولة إعادة التحميل عند الفشل
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // ✅ تحسين: إعادة المحاولة
  const handleRetry = React.useCallback(() => {
    setHasError(false);
    setRetryCount((prev) => prev + 1);
    // إعادة تحميل المكون
    window.location.reload();
  }, []);

  // ✅ تحسين: التحقق من حالة الشبكة
  useEffect(() => {
    if (retryCount > 3) {
      setHasError(true);
    }
  }, [retryCount]);

  // ✅ تحسين: مراقبة حالة الاتصال
  useEffect(() => {
    const handleOnline = () => {
      if (loading) {
        setLoading(false);
      }
    };

    const handleOffline = () => {
      setHasError(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [loading]);

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

  // ✅ عرض شاشة الخطأ إذا فشل التحميل
  if (hasError) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={backgroundStyle}>
          <ErrorFallback onRetry={handleRetry} />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ position: "relative", minHeight: "100vh" }}>
          <Box sx={backgroundStyle}>
            <Suspense fallback={<LoadingFallback />}>
              <Homepage toggleTheme={handleToggleTheme} darkMode={darkMode} />
            </Suspense>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
