"use client";

import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";

const Homepage = lazy(() => import("./(pages)/home/page.js"));

import LoadingScreen from "../../components/Ultimits/loading.jsx";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

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
          <Suspense fallback={<LoadingScreen />}>
            <Homepage toggleTheme={toggleTheme} darkMode={darkMode} />
          </Suspense>
        </Box>
      )}
    </ThemeProvider>
  );
}