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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CodeIcon from "@mui/icons-material/Code";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
    text: isDark ? "#F5F5F5" : "#0A1F44",
    textMuted: isDark ? alpha("#F5F5F5", 0.6) : alpha("#0A1F44", 0.6),
    border: isDark ? alpha("#ffffff", 0.08) : alpha("#186e96", 0.15),
    tagBg: isDark ? alpha("#ffffff", 0.03) : alpha("#000000", 0.03),
    tagBorder: isDark ? alpha("#ffffff", 0.08) : alpha("#000000", 0.08),
    dotColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(24,110,150,0.06)",
  };

  const socials = [
    {
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      link: "mailto:hdayaaslam34@gmail.com",
      color: isDark ? "#F5F5F5" : "#0A1F44",
      hoverColor: colors.primary,
    },
    { 
      icon: <TwitterIcon sx={{ fontSize: 20 }} />, 
      link: "https://twitter.com/", 
      color: isDark ? "#F5F5F5" : "#0A1F44",
      hoverColor: "#1DA1F2",
    },
    {
      icon: <LinkedInIcon sx={{ fontSize: 20 }} />,
      link: "https://www.linkedin.com/in/Islam-hadaya",
      color: isDark ? "#F5F5F5" : "#0A1F44",
      hoverColor: "#0A66C2",
    },
    {
      icon: <GitHubIcon sx={{ fontSize: 20 }} />,
      link: "https://github.com/eslam-cmd",
      color: isDark ? "#F5F5F5" : "#0A1F44",
      hoverColor: colors.primary,
    },
  ];

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
          fontFamily: FONT,
          "& .MuiTypography-root, & .MuiButton-root, & .MuiChip-root": { fontFamily: FONT },
          background: isDark ? "rgba(5, 10, 20, 0.7)" : "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderTop: `1px solid ${colors.border}`,
          color: colors.text,
          py: { xs: 5, md: 6 },
          px: { xs: 3, sm: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
          // خلفية النقاط التقنية
          backgroundImage: `radial-gradient(circle, ${colors.dotColor} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "2fr 1fr 1fr",
            },
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
                fontSize: { xs: "24px", md: "28px" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                mb: 2,
                color: colors.text,
              }}
            >
              Islam Hadaya<span style={{ color: colors.primary }}>.</span>
            </Typography>
            <Typography
              sx={{
                color: colors.textMuted,
                lineHeight: 1.7,
                fontSize: "0.9rem",
                maxWidth: "320px",
              }}
            >
              Building the future, one line of code at a time.
              <span style={{ display: "block", marginTop: "8px", color: colors.primary, fontWeight: 500 }}>
                Software Engineer
              </span>
            </Typography>
          </Box>

          {/* القسم الثاني */}
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: colors.textMuted,
                mb: 2.5,
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
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "color 0.25s ease",
                    cursor: "pointer",
                    "&:hover": {
                      color: colors.primary,
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
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: colors.textMuted,
                mb: 2.5,
              }}
            >
              Connect
            </Typography>

            <Box sx={{ display: "flex", gap: 1.5 }}>
              {socials.map((social, idx) => (
                <IconButton
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: social.color,
                    padding: "10px",
                    bgcolor: colors.tagBg,
                    border: `1px solid ${colors.tagBorder}`,
                    borderRadius: "8px", // حواف مربعة ناعمة
                    transition: "color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease",
                    "&:hover": {
                      color: social.hoverColor,
                      bgcolor: alpha(social.hoverColor, 0.1),
                      borderColor: alpha(social.hoverColor, 0.3),
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
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
            icon={<CodeIcon sx={{ fontSize: 14, color: colors.primary }} />}
            label={
              <Typography sx={{ fontSize: "11px", color: colors.textMuted, fontWeight: 500 }}>
                Designed & Built by Islam Hadaya © 2026
              </Typography>
            }
            variant="outlined"
            sx={{
              borderColor: colors.border,
              bgcolor: colors.tagBg,
              borderRadius: "6px",
              height: 28,
              "& .MuiChip-label": { px: 1 },
            }}
          />

          <Button
            onClick={scrollToTop}
            endIcon={<KeyboardArrowUpIcon sx={{ fontSize: 16 }} />}
            sx={{
              color: colors.textMuted,
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "none",
              transition: "color 0.25s ease",
              "&:hover": {
                color: colors.primary,
                bgcolor: "transparent",
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
            bgcolor: colors.tagBg,
            color: colors.primary,
            border: `1px solid ${colors.primary}`,
            borderRadius: "8px",
            boxShadow: `0 8px 30px ${alpha(colors.primary, 0.15)}`,
            "& .MuiAlert-icon": {
              color: colors.primary,
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}