"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fab, Zoom, Tooltip, Badge,Typography  } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { keyframes } from "@mui/system";

// كونتكست للسمة الداكنة/الفاتحة
const DarkModeContext = createContext({
  darkMode: true,
  toggleTheme: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

// تأثيرات حركية للزر
const pulse = keyframes`
  0%, 100% { 
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  }
  50% { 
    box-shadow: 0 8px 40px rgba(212, 175, 55, 0.5);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

export default function ClientLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeout = useRef(null);

  const toggleTheme = useCallback(() => setDarkMode((prev) => !prev), []);

  // تعريف الثيم
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

  // ✅ تحسين 1: استخدام useCallback و throttle للتمرير
  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) return;

    scrollTimeout.current = setTimeout(() => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // نسبة التقدم في الصفحة
      const progress = Math.min(
        (scrollY / (documentHeight - windowHeight)) * 100,
        100,
      );

      setScrollProgress(progress);
      setShowScrollButton(scrollY > 200);

      scrollTimeout.current = null;
    }, 100); // throttle 100ms
  }, []);

  // ✅ تحسين 2: مراقبة التمرير مع cleanup
  useEffect(() => {
    const handleScrollWithRAF = () => {
      requestAnimationFrame(() => {
        handleScroll();
      });
    };

    handleScroll(); // تحقق أولي
    window.addEventListener("scroll", handleScrollWithRAF, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollWithRAF);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }
    };
  }, [handleScroll]);

  // ✅ تحسين 3: smooth scroll مع cancel
  const scrollToTop = useCallback(() => {
    const start = window.scrollY;
    const duration = 600;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  // ✅ تحسين 4: إلغاء التمرير عند مغادرة الصفحة
  useEffect(() => {
    return () => {
      // إلغاء أي تمرير قيد التنفيذ
    };
  }, []);

  // تحديد لون الزر حسب الوضع
  const buttonColor = darkMode ? "#D4AF37" : "#1976d2";
  const buttonHoverColor = darkMode ? "#b8941f" : "#1565c0";

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

          {/* ✅ تحسين 5: زر العودة للأعلى مع تلميحات وتفاعل محسّن */}
          <Zoom in={showScrollButton} timeout={400}>
            <Box
              sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* ✅ تحسين 6: شريط التقدم الدائري */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 68,
                  height: 68,
                }}
              >
                {/* الخلفية الدائرية */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `conic-gradient(
                      ${buttonColor} ${scrollProgress}%, 
                      ${darkMode ? "rgba(212, 175, 55, 0.1)" : "rgba(25, 118, 210, 0.1)"} ${scrollProgress}%
                    )`,
                    transition: "background 0.3s ease",
                  }}
                />

                {/* الزر */}
                <Tooltip
                  title="Back to Top"
                  placement="left"
                  arrow
                  enterDelay={200}
                  leaveDelay={100}
                >
                  <Fab
                    onClick={scrollToTop}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    sx={{
                      width: 56,
                      height: 56,
                      backgroundColor: buttonColor,
                      color: darkMode ? "#0A1F44" : "#ffffff",
                      boxShadow: `0 4px 20px ${darkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(25, 118, 210, 0.3)"}`,
                      border: `2px solid ${darkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(25, 118, 210, 0.3)"}`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      animation:
                        showScrollButton && !isHovered
                          ? `${pulse} 2s ease-in-out infinite`
                          : "none",
                      "&:hover": {
                        backgroundColor: buttonHoverColor,
                        transform: "scale(1.12) rotate(-8deg)",
                        boxShadow: `0 8px 40px ${darkMode ? "rgba(212, 175, 55, 0.5)" : "rgba(25, 118, 210, 0.5)"}`,
                        borderColor: buttonColor,
                      },
                      "&:active": {
                        transform: "scale(0.9)",
                      },
                      position: "relative",
                      zIndex: 2,
                    }}
                    aria-label="scroll to top"
                  >
                    <KeyboardArrowUpIcon
                      sx={{
                        fontSize: 32,
                        transition: "transform 0.3s ease",
                        transform: isHovered ? "translateY(-2px)" : "none",
                      }}
                    />
                  </Fab>
                </Tooltip>
              </Box>

              {/* ✅ تحسين 7: نص النسبة المئوية */}
              {showScrollButton && (
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: darkMode
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.2)",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: darkMode
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  {Math.round(scrollProgress)}%
                </Typography>
              )}
            </Box>
          </Zoom>

          {/* ✅ تحسين 8: اختصار لوحة المفاتيح - زر Home */}
          {showScrollButton && (
            <Typography
              sx={{
                position: "fixed",
                bottom: 100,
                right: 32,
                fontSize: "10px",
                color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                fontFamily: "monospace",
                letterSpacing: "0.5px",
                userSelect: "none",
                transition: "opacity 0.3s ease",
                opacity: isHovered ? 1 : 0.3,
              }}
            >
              ⌘ ↑
            </Typography>
          )}
        </Box>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}
