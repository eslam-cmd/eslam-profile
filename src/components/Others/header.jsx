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
import Brightness4Icon from "@mui/icons-material/Brightness4"; // أيقونة الوضع الداكن (🌙)
import Brightness7Icon from "@mui/icons-material/Brightness7"; // أيقونة الوضع الفاتح (☀️)
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"; // أيقونة وضع النظام الحيادية (⚙️)
import { usePathname, useRouter } from "next/navigation";

export default function Header({ toggleTheme, darkMode }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const pages = [
    { name: "SKILS & TOOLS", link: "#skills" },
    { name: "PORTFOLIO", link: "/project" },
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

  // الأوضاع الثلاثة:
  // 1. "system": يتبع وضع نظام التشغيل تلقائياً (الخيار الافتراضي)
  // 2. "light": فاتح دائماً
  // 3. "dark": داكن دائماً
  const [themeMode, setThemeMode] = React.useState("system");
  const [systemIsDark, setSystemIsDark] = React.useState(false);

  // الكشف التلقائي عند التحميل الأول
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

  // تتابع الضغطات: System -> Light -> Dark -> System
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

  // الاستماع لتغيرات ثيم النظام في الخلفية
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

  // تحديد موضع الدائرة المنزلقة للزر التفاعلي
  const getTogglePosition = () => {
    if (themeMode === "light") return 2; // أقصى اليسار
    if (themeMode === "system") return 15; // في المنتصف تماماً (الوضع الحيادي الافتراضي للنظام)
    return 28; // أقصى اليمين
  };

  // تحديد الأيقونة التي ستظهر بداخل الدائرة المنزلقة:
  const renderThemeIcon = () => {
    if (themeMode === "light") {
      return <Brightness7Icon sx={{ fontSize: 16, color: "#f5a623" }} />;
    }
    if (themeMode === "system") {
      // أيقونة النظام المخصصة والحيادية تماماً (ليست ليلية ولا نهارية) بلون رمادي/ذهبي متناسق
      return (
        <SettingsBrightnessIcon
          sx={{ fontSize: 16, color: darkMode ? "#D4AF37" : "#186e96" }}
        />
      );
    }
    return <Brightness4Icon sx={{ fontSize: 16, color: "#0a1929" }} />;
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: darkMode ? "#030d1dff" : "#186e96ff",
        translateX: "auto",
        marginX: "auto",
        marginY: 2,
        maxWidth: "95%",
        borderRadius: 2,
        boxShadow: 3,
        border: ".7px #aaa solid",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Lobster', cursive",
            fontSize: "32px",
            color: "#D4AF37",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          Islam Hadaya
        </Typography>
        <IconButton
          onClick={handleOpenNavMenu}
          color="inherit"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem key={page.name} onClick={() => handleNavigate(page.link)}>
              <Typography
                sx={{
                  color: "inherit",
                  fontWeight: "600",
                  fontFamily: "Arail",
                }}
              >
                {page.name}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
        <Toolbar sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Typography
              key={page.name}
              onClick={() => handleNavigate(page.link)}
              sx={{
                cursor: "pointer",
                color: "#ddd",
                marginX: 2,
                transition: ".5s",
                textDecoration: "none",
                fontFamily: "Arail",
                fontWeight: "600",
                "&:hover": {
                  color: "#D4AF37",
                },
              }}
            >
              {page.name}
            </Typography>
          ))}
        </Toolbar>

        {/* الحاوية التي تعرض حالة النظام الحالية كأيقونة مساعدة بجانب الزر في حال تفعيل وضع النظام */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {themeMode === "system" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                opacity: 0.85,
                animation: "fadeIn 0.3s ease",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                px: 1,
                py: 0.3,
                borderRadius: "12px",
                border: "1px dashed rgba(255, 255, 255, 0.2)",
              }}
            >
              {systemIsDark ? (
                <Brightness4Icon sx={{ fontSize: 14, color: "#D4AF37" }} />
              ) : (
                <Brightness7Icon sx={{ fontSize: 14, color: "#f5a623" }} />
              )}
              <Typography
                sx={{ fontSize: "10px", fontWeight: "bold", color: "#ddd" }}
              >
                SYSTEM
              </Typography>
            </Box>
          )}

          {/* زر تبديل الثيم المطور ذو الثلاث حالات (System -> Light -> Dark) */}
          <Box
            onClick={handleThemeToggleClick}
            role="button"
            aria-label="toggle theme"
            sx={{
              position: "relative",
              width: 56,
              height: 30,
              borderRadius: 999,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              px: "4px",
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.15)"
                : "rgba(255, 255, 255, 0.25)",
              border: darkMode
                ? "1.5px solid rgba(212, 175, 55, 0.5)"
                : "1.5px solid rgba(255, 255, 255, 0.5)",
              transition: "background-color .4s ease, border-color .4s ease",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 1.8,
                left: getTogglePosition(),
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: darkMode ? "#D4AF37" : "#ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition:
                  "left .35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color .35s ease",
              }}
            >
              {renderThemeIcon()}
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
