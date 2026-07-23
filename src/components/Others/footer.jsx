"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  // ===== Unified color system — everything derives from isDark =====
  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
    footerBg: isDark
      ? "linear-gradient(135deg, rgba(10, 31, 68, 0.95), rgba(26, 26, 46, 0.95))"
      : "linear-gradient(135deg, #0A1F44, #14345c)",
    text: "#F5F5F5",
    textMuted: alpha("#F5F5F5", 0.75),
    border: alpha(isDark ? "#D4AF37" : "#186e96", 0.3),
  };

  // Natural brand colors for social icons — same footer bg (dark) in both
  // modes, so brand colors read well and give real contrast either way
  const iconColors = {
    email: colors.primary,
    facebook: "#1877F2",
    twitter: "#1DA1F2",
    linkedin: "#0A66C2",
    github: isDark ? "#EAEAEA" : "#F5F5F5",
  };

  const handleDownloadClick = (platform) => {
    const messages = {
      android:
        "The Android app is currently under development and will be available soon.",
      ios: "The iOS app is currently under development and will be available soon.",
    };

    setSnackbarMessage(messages[platform]);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          background: colors.footerBg,
          borderTop: `1px solid ${colors.border}`,
          color: colors.text,
          padding: "30px 20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 3,
        }}
      >
        <Box sx={{ maxWidth: 400 }}>
          <Typography
            sx={{
              fontFamily: "Arial",
              fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
              fontWeight: "bold",
              color: colors.primary,
              textShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            Islam Hadaya
          </Typography>

          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, fontFamily: "Arial", color: colors.textMuted }}
          >
            software engineer specialized in building secure and scalable web
            and mobile systems, with a passion for creating innovative
            software solutions and seamless user experiences.
          </Typography>

         
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

        <Box
          sx={{
            marginRight: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              marginBottom: "7px",
              color: colors.textMuted,
            }}
          >
            Designed by Islam <span style={{ fontWeight: "bold" }}>© 2026</span>
          </Typography>

          {/* <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<AndroidIcon />}
              onClick={() => handleDownloadClick("android")}
              sx={{
                bgcolor: colors.primary,
                color: colors.onPrimary,
                "&:hover": {
                  bgcolor: colors.primary,
                  opacity: 0.85,
                  transform: "translateY(-1px)",
                  boxShadow: 2,
                },
                borderRadius: "15px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.2s ease",
                textTransform: "none",
                minWidth: "auto",
              }}
            >
              Download Android App
            </Button>

            <Button
              variant="contained"
              startIcon={<AppleIcon />}
              onClick={() => handleDownloadClick("ios")}
              sx={{
                bgcolor: colors.primary,
                color: colors.onPrimary,
                "&:hover": {
                  bgcolor: colors.primary,
                  opacity: 0.85,
                  transform: "translateY(-1px)",
                  boxShadow: 2,
                },
                borderRadius: "15px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.2s ease",
                textTransform: "none",
                minWidth: "auto",
              }}
            >
              Download iOS App
            </Button>
          </Box> */}
        </Box>
      </Box>

      {/* Snackbar للرسائل */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{
            width: "100%",
            backgroundColor: colors.primary,
            color: colors.onPrimary,
            "& .MuiAlert-icon": {
              color: colors.onPrimary,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}