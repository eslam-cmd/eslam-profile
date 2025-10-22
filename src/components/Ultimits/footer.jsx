"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const iconColors = {
    facebook: isDark ? "#90CAF9" : "#1877F2",
    twitter: isDark ? "#64B5F6" : "#1DA1F2",
    linkedin: isDark ? "#64B5F6" : "#0A66C2",
    github: isDark ? "#EAEAEA" : "#000",
    email: isDark ? "#FFD700" : "#D4AF37",
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: isDark ? "#111" : "rgba(0, 0, 0, 0.59)",
        color: "white",
        padding: "30px 20px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "center" },
        gap: 3,
      }}
    >
      <Box sx={{ maxWidth: 400 }}>
        {/* الاسم بخط فرنسي */}
        <Typography
          sx={{
            fontFamily: "Arail",
            fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
            fontWeight: "bold",
            color: "#D4AF37",
            textShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          Islam Hadaya
        </Typography>

        <Typography
          variant="body2"
          sx={{ lineHeight: 1.6, fontFamily: "Arail" }}
        >
          software engineer specialized in building secure and scalable web and
          mobile systems, with a passion for creating innovative software
          solutions and seamless user experiences.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 2,
            mt: 2,
          }}
        >
          {/* زر التواصل */}
          <Button
            variant="contained"
            href="mailto:hdayaaslam34@gmail.com"
            sx={{
              fontFamily: "Arail",
              backgroundColor: "#186e96",
              color: "#fff",
              textTransform: "none",
              borderRadius: "25px",
              px: 3,
              py: 1,
              fontSize: ".8rem",
              "&:hover": {
                backgroundColor: "#0A1F44",
              },
            }}
          >
            Let’s work together
            <EmailIcon />
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          href="mailto:hdayaaslam34@gmail.com"
          target="_blank"
          sx={{ color: iconColors.email }}
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          href="https://www.facebook.com/islam.hadaya.2025?mibextid=ZbWKwL"
          target="_blank"
          sx={{ color: iconColors.facebook }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://twitter.com/"
          target="_blank"
          sx={{ color: iconColors.twitter }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/Islam-hadaya"
          target="_blank"
          sx={{ color: iconColors.linkedin }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          href="https://github.com/eslam-cmd"
          target="_blank"
          sx={{ color: iconColors.github }}
        >
          <GitHubIcon />
        </IconButton>
      </Box>
      <Box sx={{ marginRight: "20px", padding: "20px" }}>
        <Typography variant="body2" sx={{ opacity: 0.8,marginBottom:"7px" }}>
          Designed by Islam{" "}
          <span style={{ fontWeight: "bold" }}>
            © 2025
          </span>
        </Typography>
        <Typography
          variant="contained"
          startIcon={<SmartphoneIcon />}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            bgcolor: "#D4AF37",
            color: "#000",
            "&:hover": { bgcolor: "#b8962e" },
            borderRadius:"15px",
            padding:"3px",
            fontSize:"13px",
            cursor:"pointer"
          }}
        >
          Download App
        </Typography>
      </Box>
    </Box>
  );
}
