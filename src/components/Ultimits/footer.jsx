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
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const iconColors = {
    facebook: isDark ? "#90CAF9" : "#1877F2",
    twitter: isDark ? "#64B5F6" : "#1DA1F2",
    linkedin: isDark ? "#64B5F6" : "#0A66C2",
    github: isDark ? "#EAEAEA" : "#000",
    email: isDark ? "#FFD700" : "#D4AF37",
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
            software engineer specialized in building secure and scalable web
            and mobile systems, with a passion for creating innovative software
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
              Let's work together
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
          {/* حقوق النشر */}
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              marginBottom: "7px",
              color: "text.secondary",
            }}
          >
            Designed by Islam <span style={{ fontWeight: "bold" }}>© 2025</span>
          </Typography>

          {/* أزرار التحميل */}
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            {/* زر Android */}
            <Button
              variant="contained"
              startIcon={<AndroidIcon />}
              onClick={() => handleDownloadClick("android")}
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                "&:hover": {
                  bgcolor: "#b8962e",
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

            {/* زر iOS */}
            <Button
              variant="contained"
              startIcon={<AppleIcon />}
              onClick={() => handleDownloadClick("ios")}
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                "&:hover": {
                  bgcolor: "#b8962e",
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
          </Box>
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
            backgroundColor: "#186e96",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
