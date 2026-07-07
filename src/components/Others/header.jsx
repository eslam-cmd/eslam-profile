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
import { usePathname, useRouter } from "next/navigation";
<link
  href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
  rel="stylesheet"
></link>;
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

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: darkMode ? "#030d1dff" : "#186e96ff",
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

        {/* زر تبديل الوضع الليلي/النهاري - تصميم أنعم وأجمل */}
        <Box
          onClick={toggleTheme}
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
            ml: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 2,
              left: darkMode ? 28 : 2,
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
            {darkMode ? (
              <Brightness4Icon sx={{ fontSize: 16, color: "#0a1929" }} />
            ) : (
              <Brightness7Icon sx={{ fontSize: 16, color: "#f5a623" }} />
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
