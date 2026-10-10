"use client";

import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  CircularProgress,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import LoadingScreen from "../../components/Others/loading.jsx";
import { useDarkMode } from "../../components/Others/ClientLayout.jsx";

const Homepage = lazy(() => import("./(pages)/home/page.js"));

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
      sx={{ color: "#D4AF37", animationDuration: "550ms" }}
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
      We&apos;re having trouble loading the page. This might be due to a slow
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

export default function HomeClient({ children }) {
  const { darkMode, toggleTheme: handleToggleTheme } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

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
    [darkMode],
  );

  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const slowConnection =
      connection?.saveData ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType);
    const timer = setTimeout(
      () => setLoading(false),
      slowConnection ? 80 : 200,
    );
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = React.useCallback(() => {
    setHasError(false);
    setRetryCount((prev) => prev + 1);
    window.location.reload();
  }, []);

  useEffect(() => {
    if (retryCount > 3) setHasError(true);
  }, [retryCount]);

  useEffect(() => {
    const handleOnline = () => loading && setLoading(false);
    const handleOffline = () => setHasError(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [loading]);

  const backgroundStyle = useMemo(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return {
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
    };
  }, [darkMode, theme, isMobile]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
      {hasError ? (
        <Box sx={backgroundStyle}>
          <ErrorFallback onRetry={handleRetry} />
        </Box>
      ) : loading ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ position: "relative", minHeight: "100vh" }}>
          <Box sx={backgroundStyle}>
            <Suspense fallback={<LoadingFallback />}>
              <Homepage
                toggleTheme={handleToggleTheme}
                darkMode={darkMode}
                showMainSection={false}
              />
            </Suspense>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
