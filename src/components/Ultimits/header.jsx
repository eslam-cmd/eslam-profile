"use client";

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
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

  const pages =
    pathname === "/contact"
      ? [{ name: "Home", link: "/" }]
      : [
          { name: "SKILS & TOOLS", link: "#skills" },
          { name: "PORTFOLIO", link: "/project" },
          { name: "CONTACT", link: "/contact" },
          { name: "How is Islam", link: "/about" },
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
          sx={{ display: { xs: "block", md: "none" } } }
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

        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
