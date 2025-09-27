"use client";

import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab, Modal } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const Homepage = lazy(() => import("./(pages)/home/page.js"));
import LoadingScreen from "../../components/Ultimits/loading.jsx";

// استورد المساعد الذكي
import ChatWidget from "../../components/chatWidget/ChatWidget.jsx";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false);

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

          {/* زر المحادثة العائم */}
          <Fab
            color="primary"
            aria-label="chat"
            onClick={() => setOpenChat(true)}
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              backgroundColor: "#000000ff",
              color: "#000",
              "&:hover": { backgroundColor: "#b8962f" },
            }}
          >
            <ChatIcon />
          </Fab>

          {/* المودال */}
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
                right: 20,
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
        </Box>
      )}
    </ThemeProvider>
  );
}
