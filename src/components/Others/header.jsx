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
    { name: "SKILLS & TOOLS", link: "#skills" },
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
    if (themeMode === "system") return 14; // تم تعديلها لتتناسب بدقة مع العرض الجديد 52px
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
      position="static"
      sx={{
        bgcolor: darkMode ? "#030d1dff" : "#186e96ff",
        marginX: "auto",
        // تحسين UX: هوامش متجاوبة لتجنب صغر الحجم جداً على الموبايل
        marginY: { xs: 1, sm: 2 },
        maxWidth: { xs: "98%", sm: "95%" },
        borderRadius: { xs: 1.5, sm: 2 },
        boxShadow: 3,
        border: ".7px #aaa solid",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          px: { xs: 1.5, sm: 2 }, // حواف داخلية أصغر قليلاً على الموبايل للمزيد من المساحة
          minHeight: { xs: "56px", sm: "64px" }, // جعل الارتفاع متناسقاً
        }}
      >
        {/* اللوجو بحجم متجاوب ناعم جداً */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Lobster', cursive",
            fontSize: { xs: "22px", sm: "26px", md: "32px" }, // يتقلص تلقائياً على الموبايل لعدم حدوث تداخل
            color: "#D4AF37",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            userSelect: "none",
          }}
        >
          Islam Hadaya
        </Typography>

        {/* الروابط للشاشات الكبيرة (تختفي في الموبايل) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {pages.map((page) => (
            <Typography
              key={page.name}
              onClick={() => handleNavigate(page.link)}
              sx={{
                cursor: "pointer",
                color: "#ddd",
                marginX: 2,
                transition: "0.3s",
                textDecoration: "none",
                fontFamily: "Arial, sans-serif",
                fontWeight: "600",
                fontSize: "0.95rem",
                "&:hover": {
                  color: "#D4AF37",
                },
              }}
            >
              {page.name}
            </Typography>
          ))}
        </Box>

        {/* الجزء الأيمن (مفتاح الثيم + زر القائمة للموبايل) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {/* حاوية حالة ثيم النظام (تظهر في الشاشات المتوسطة والكبيرة فقط لتوفير مساحة في الموبايل الصغير) */}
          {themeMode === "system" && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 0.5,
                opacity: 0.85,
                bgcolor: "rgba(255, 255, 255, 0.1)",
                px: 1,
                py: 0.3,
                borderRadius: "12px",
                border: "1px dashed rgba(255, 255, 255, 0.2)",
              }}
            >
              {systemIsDark ? (
                <Brightness4Icon sx={{ fontSize: 13, color: "#D4AF37" }} />
              ) : (
                <Brightness7Icon sx={{ fontSize: 13, color: "#f5a623" }} />
              )}
              <Typography
                sx={{ fontSize: "9px", fontWeight: "bold", color: "#ddd" }}
              >
                SYSTEM
              </Typography>
            </Box>
          )}

          {/* زر تبديل الثيم المطور (معدل الحجم ليناسب الموبايل بشكل مثالي) */}
          <Box
            onClick={handleThemeToggleClick}
            role="button"
            aria-label="toggle theme"
            sx={{
              position: "relative",
              width: 52, // تصغير العرض من 56 إلى 52 ليناسب الموبايل
              height: 26, // تصغير الارتفاع من 30 إلى 26 ليكون أكثر رشاقة
              borderRadius: 999,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              px: "3px",
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.15)"
                : "rgba(255, 255, 255, 0.25)",
              border: darkMode
                ? "1.5px solid rgba(212, 175, 55, 0.5)"
                : "1.5px solid rgba(255, 255, 255, 0.5)",
              transition: "all .3s ease",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 1.2,
                left: getTogglePosition(),
                width: 20, // تصغير الدائرة الداخلية لتتناسب مع المقاس الجديد
                height: 20,
                borderRadius: "50%",
                bgcolor: darkMode ? "#D4AF37" : "#ffffff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition:
                  "left .3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color .3s ease",
              }}
            >
              {renderThemeIcon()}
            </Box>
          </Box>

          {/* زر القائمة للشاشات الصغيرة والموبايل فقط */}
          <IconButton
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{
              display: { xs: "flex", md: "none" },
              p: 0.5, // تقليل الـ Padding قليلاً ليتناسق مع زر الثيم
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* القائمة المنبثقة للموبايل (تم تحسين مظهرها لتتناسب مع المظهر الداكن/الفاتح) */}
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          onClick={handleCloseNavMenu}
          disableScrollLock={true} // يمنع اهتزاز الصفحة عند الفتح
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1.5,
              bgcolor: darkMode ? "#0c1a30" : "#ffffff",
              color: darkMode ? "#fff" : "#333",
              border: `1px solid ${darkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
              borderRadius: "10px",
              minWidth: "160px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
            },
          }}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => handleNavigate(page.link)}
              sx={{
                py: 1.2,
                px: 2.5,
                borderBottom: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.05)"
                  : "1px solid rgba(0, 0, 0, 0.05)",
                "&:last-child": { borderBottom: "none" },
                "&:hover": {
                  bgcolor: darkMode
                    ? "rgba(212, 175, 55, 0.1)"
                    : "rgba(24, 110, 150, 0.08)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "0.9rem",
                  color: darkMode ? "#D4AF37" : "#186e96",
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
