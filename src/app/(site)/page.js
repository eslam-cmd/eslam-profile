"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab, Fade } from "@mui/material";
// import ChatIcon from "@mui/icons-material/Chat"; // تم تعليق استيراد أيقونة الدردشة
// import CloseIcon from "@mui/icons-material/Close"; // تم تعليق استيراد

import Homepage from "./(pages)/home/page.js";
import LoadingScreen from "../../components/Others/loading.jsx";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

 

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

          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
