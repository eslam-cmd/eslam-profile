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
import { Button, Chip } from "@mui/material";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CodeIcon from "@mui/icons-material/Code";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
    text: isDark ? "#F5F5F5" : "#0a1929",
    textMuted: isDark ? alpha("#F5F5F5", 0.6) : alpha("#0a1929", 0.5),
    border: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
  };

  const socials = [
    { icon: <EmailIcon />, link: "mailto:hdayaaslam34@gmail.com", color: "#D4AF37" },
    { icon: <TwitterIcon />, link: "https://twitter.com/", color: "#1DA1F2" },
    { icon: <LinkedInIcon />, link: "https://www.linkedin.com/in/Islam-hadaya", color: "#0A66C2" },
    { icon: <GitHubIcon />, link: "https://github.com/eslam-cmd", color: isDark ? "#fff" : "#333" },
  ];

  const handleDownloadClick = (platform) => {
    const messages = {
      android: "Android app coming soon! 🚀",
      ios: "iOS app coming soon! 🚀",
    };
    setSnackbarMessage(messages[platform]);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          background: isDark
            ? "rgba(0, 0, 0, 0.6)"
            : "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(30px) saturate(200%)",
          WebkitBackdropFilter: "blur(30px) saturate(200%)",
          borderTop: `1px solid ${colors.border}`,
          color: colors.text,
          py: { xs: 4, md: 6 },
          px: { xs: 3, sm: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          // تأثير خلفية متحركة
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "500px",
            height: "500px",
            background: isDark
              ? "radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(24,110,150,0.03) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 10s ease-in-out infinite",
          },
          "@keyframes float": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "50%": { transform: "translate(-30px, 20px)" },
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2fr 1.5fr 1.5fr" },
            gap: { xs: 4, md: 6 },
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          {/* القسم الأول */}
          <Box>
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: { xs: "26px", md: "32px" },
                fontWeight: 800,
                letterSpacing: "-0.03em",
                mb: 2,
                background: `linear-gradient(135deg, ${colors.primary}, ${isDark ? "#f5d76e" : "#4a9bc7"})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Islam Hadaya
            </Typography>
            <Typography
              sx={{
                color: colors.textMuted,
                lineHeight: 1.8,
                fontSize: "0.95rem",
                maxWidth: "400px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Building the future, one line of code at a time. 
              <span style={{ display: "block", marginTop: "8px" }}>
                ✦ Software Engineer ✦
              </span>
            </Typography>
          </Box>

          {/* القسم الثاني */}
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: colors.textMuted,
                mb: 3,
              }}
            >
              Explore
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {["Portfolio", "Skills", "Contact", "Blog"].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href={`#${item.toLowerCase()}`}
                  sx={{
                    color: colors.textMuted,
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    "&:hover": {
                      color: colors.primary,
                      transform: "translateX(6px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* القسم الثالث */}
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: colors.textMuted,
                mb: 3,
              }}
            >
              Connect
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
              {socials.map((social, idx) => (
                <IconButton
                  key={idx}
                  href={social.link}
                  target="_blank"
                  sx={{
                    color: social.color,
                    padding: "10px",
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.02)",
                    borderRadius: "12px",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-4px) scale(1.05)",
                      bgcolor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.04)",
                      boxShadow: `0 4px 20px ${alpha(social.color, 0.2)}`,
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<AndroidIcon />}
                onClick={() => handleDownloadClick("android")}
                sx={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: alpha(colors.primary, 0.05),
                    transform: "scale(1.02)",
                    borderColor: colors.primary,
                  },
                }}
              >
                Android
              </Button>
              <Button
                variant="outlined"
                startIcon={<AppleIcon />}
                onClick={() => handleDownloadClick("ios")}
                sx={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: alpha(colors.primary, 0.05),
                    transform: "scale(1.02)",
                    borderColor: colors.primary,
                  },
                }}
              >
                iOS
              </Button>
            </Box>
          </Box>
        </Box>

        {/* الفوتر السفلي */}
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${colors.border}`,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            maxWidth: "1200px",
            mx: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Chip
            icon={<CodeIcon sx={{ fontSize: 14 }} />}
            label={
              <Typography sx={{ fontSize: "12px", color: colors.textMuted }}>
                Designed with ❤️ by Islam Hadaya © 2026
              </Typography>
            }
            variant="outlined"
            sx={{
              borderColor: colors.border,
              bgcolor: "transparent",
              "& .MuiChip-label": {
                px: 1,
              },
            }}
          />

          <Button
            onClick={scrollToTop}
            endIcon={<KeyboardArrowUpIcon />}
            sx={{
              color: colors.textMuted,
              fontSize: "12px",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                color: colors.primary,
                transform: "translateY(-2px)",
              },
            }}
          >
            Back to Top
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{
            bgcolor: colors.primary,
            color: colors.onPrimary,
            borderRadius: "12px",
            boxShadow: `0 8px 30px ${alpha(colors.primary, 0.3)}`,
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