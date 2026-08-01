"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ toggleTheme, darkMode }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const pages = [
    { name: "SKILLS", link: "#skills" },
    { name: "WORK", link: "/project" },
    { name: "CONTACT", link: "#contact" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (link) => {
    setAnchorElNav(null);
    if (link.startsWith("#")) {
      const id = link.replace("#", "");
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(link);
    }
  };

  const [themeMode, setThemeMode] = React.useState("system");
  const [systemIsDark, setSystemIsDark] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemIsDark(mediaQuery.matches);

    const savedMode = localStorage.getItem("user-theme-preference");
    if (savedMode) {
      setThemeMode(savedMode);
      applyTheme(savedMode, mediaQuery.matches);
    } else {
      setThemeMode("system");
      applyTheme("system", mediaQuery.matches);
    }
  }, []);

  const applyTheme = (mode, prefersDark) => {
    if (mode === "system") {
      if (prefersDark && !darkMode) {
        toggleTheme();
      } else if (!prefersDark && darkMode) {
        toggleTheme();
      }
    } else if (mode === "dark" && !darkMode) {
      toggleTheme();
    } else if (mode === "light" && darkMode) {
      toggleTheme();
    }
  };

  const handleThemeToggleClick = () => {
    let nextMode = "system";
    if (themeMode === "system") {
      nextMode = "light";
    } else if (themeMode === "light") {
      nextMode = "dark";
    } else if (themeMode === "dark") {
      nextMode = "system";
    }

    setThemeMode(nextMode);
    localStorage.setItem("user-theme-preference", nextMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(nextMode, mediaQuery.matches);
  };

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setSystemIsDark(e.matches);
      if (themeMode === "system") {
        if (e.matches && !darkMode) {
          toggleTheme();
        } else if (!e.matches && darkMode) {
          toggleTheme();
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode, darkMode, toggleTheme]);

  const getTogglePosition = () => {
    if (themeMode === "light") return 2;
    if (themeMode === "system") return 14;
    return 26;
  };

  const renderThemeIcon = () => {
    if (themeMode === "light") {
      return <Brightness7Icon sx={{ fontSize: 14, color: "#f5a623" }} />;
    }
    if (themeMode === "system") {
      return (
        <SettingsBrightnessIcon
          sx={{ fontSize: 14, color: darkMode ? "#D4AF37" : "#186e96" }}
        />
      );
    }
    return <Brightness4Icon sx={{ fontSize: 14, color: "#0a1929" }} />;
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        // خلفية زجاجية شفافة مع نعومة عالية
        background: darkMode
          ? "rgba(3, 13, 29, 0.65)"
          : "rgba(255, 255, 255, 0.55)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: darkMode
          ? "1px solid rgba(212, 175, 55, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "none",
        marginX: "auto",
        marginY: { xs: 1, sm: 2 },
        maxWidth: { xs: "96%", sm: "92%", md: "85%" },
        borderRadius: { xs: "16px", sm: "20px" },
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        top: { xs: 8, sm: 12 },
        left: 0,
        right: 0,
        width: "fit-content",
        minWidth: { xs: "96%", sm: "92%", md: "85%" },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 1.8, sm: 3 },
          py: { xs: 0.5, sm: 0.8 },
          minHeight: { xs: "60px", sm: "68px" },
        }}
      >
        {/* اللوجو - تصميم عصري Minimal */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            fontWeight: 700,
            fontSize: { xs: "20px", sm: "24px", md: "28px" },
            letterSpacing: "-0.02em",
            background: darkMode
              ? "linear-gradient(135deg, #D4AF37 0%, #f5d76e 100%)"
              : "linear-gradient(135deg, #0a1929 0%, #186e96 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            userSelect: "none",
            "&::after": {
              content: '"•"',
              color: darkMode ? "#D4AF37" : "#186e96",
              WebkitTextFillColor: darkMode ? "#D4AF37" : "#186e96",
              marginLeft: "4px",
              fontSize: { xs: "16px", sm: "20px" },
            },
          }}
        >
          Islam Hadaya
        </Typography>

        {/* روابط الشاشات الكبيرة - تصميم أنيق */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {pages.map((page, index) => (
            <Typography
              key={page.name}
              onClick={() => handleNavigate(page.link)}
              sx={{
                cursor: "pointer",
                color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
                padding: "8px 16px",
                borderRadius: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.3px",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: "4px",
                  left: "50%",
                  width: "0%",
                  height: "2px",
                  background: darkMode ? "#D4AF37" : "#186e96",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: "translateX(-50%)",
                },
                "&:hover": {
                  color: darkMode ? "#D4AF37" : "#186e96",
                  backgroundColor: darkMode
                    ? "rgba(212, 175, 55, 0.06)"
                    : "rgba(24, 110, 150, 0.06)",
                  transform: "translateY(-1px)",
                  "&::before": {
                    width: "60%",
                  },
                },
              }}
            >
              {page.name}
            </Typography>
          ))}
        </Box>

        {/* الأزرار الجانبية */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {/* وضع النظام - تصميم أنيق */}
          {themeMode === "system" && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 0.5,
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                border: darkMode
                  ? "1px solid rgba(212, 175, 55, 0.15)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
                backgroundColor: darkMode
                  ? "rgba(212, 175, 55, 0.05)"
                  : "rgba(255, 255, 255, 0.3)",
              }}
            >
              {systemIsDark ? (
                <Brightness4Icon sx={{ fontSize: 13, color: "#D4AF37" }} />
              ) : (
                <Brightness7Icon sx={{ fontSize: 13, color: "#f5a623" }} />
              )}
              <Typography
                sx={{
                  fontSize: "8px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Auto
              </Typography>
            </Box>
          )}

          {/* زر التبديل العصري */}
          <Box
            onClick={handleThemeToggleClick}
            role="button"
            aria-label="toggle theme"
            sx={{
              position: "relative",
              width: 52,
              height: 28,
              borderRadius: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              px: "3px",
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.12)"
                : "rgba(0, 0, 0, 0.06)",
              border: darkMode
                ? "1px solid rgba(212, 175, 55, 0.2)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              flexShrink: 0,
              "&:hover": {
                transform: "scale(1.02)",
                bgcolor: darkMode
                  ? "rgba(212, 175, 55, 0.18)"
                  : "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "3px",
                left: getTogglePosition(),
                width: 20,
                height: 20,
                borderRadius: "50%",
                bgcolor: darkMode ? "#D4AF37" : "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition:
                  "left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {renderThemeIcon()}
            </Box>
          </Box>

          {/* زر القائمة للموبايل */}
          <IconButton
            onClick={handleOpenNavMenu}
            sx={{
              display: { xs: "flex", md: "none" },
              p: 0.5,
              color: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              borderRadius: "10px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: darkMode
                  ? "rgba(212, 175, 55, 0.08)"
                  : "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* قائمة الموبايل - تصميم أنيق */}
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          onClick={handleCloseNavMenu}
          disableScrollLock={true}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: "180px",
              borderRadius: "16px",
              background: darkMode
                ? "rgba(3, 13, 29, 0.92)"
                : "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(20px)",
              border: darkMode
                ? "1px solid rgba(212, 175, 55, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
            },
          }}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => handleNavigate(page.link)}
              sx={{
                py: 1.5,
                px: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: darkMode
                    ? "rgba(212, 175, 55, 0.06)"
                    : "rgba(24, 110, 150, 0.04)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  letterSpacing: "0.3px",
                  color: darkMode
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.7)",
                }}
              >
                {page.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}