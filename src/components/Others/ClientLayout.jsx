"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// كونتكست للسمة الداكنة/الفاتحة حتى تقدر أي صفحة أو كومبوننت بالموقع
// توصل لـ darkMode و toggleTheme
const DarkModeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export default function ClientLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  // تعريف الثيم - هذا كان مفقود وسبب الخطأ
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
      }),
    [darkMode],
  );

  // مراقبة التمرير على مستوى الموقع كله لإظهار/إخفاء زر العودة للأعلى
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollButton(window.scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // تحقق أولي عند التحميل
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
          {children}

          {/* زر العودة للأعلى - يظهر بكل صفحات الموقع عند التمرير لأسفل */}
          <Zoom in={showScrollButton} timeout={400}>
            <Fab
              onClick={scrollToTop}
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
                width: 56,
                height: 56,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                backdropFilter: "blur(10px)",
                border: `2px solid ${theme.palette.primary.main}66`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: darkMode ? "#b8941f" : "#1565c0",
                  transform: "scale(1.15) rotate(-5deg)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                },
                "&:active": {
                  transform: "scale(0.9)",
                },
                zIndex: 1100,
              }}
              aria-label="scroll to top"
            >
              <KeyboardArrowUpIcon sx={{ fontSize: 32 }} />
            </Fab>
          </Zoom>
        </Box>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
