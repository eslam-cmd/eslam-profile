"use client";

import {
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  AlternateEmail as AlternateEmailIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  Link,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  alpha,
  Chip,
  Fade,
  Grow,
} from "@mui/material";
import emailjs from "emailjs-com";
import { useRef, useState, useEffect } from "react";
import { keyframes } from "@mui/system";

// تأثيرات حركية
const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.05); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

export default function ContactPage({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const formRef = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
    cardBg: isDark
      ? "linear-gradient(145deg, rgba(10, 31, 68, 0.98), rgba(20, 20, 40, 0.98))"
      : "linear-gradient(145deg, #ffffff, #f0f4f8)",
    text: isDark ? "#F5F5F5" : "#1A1A2E",
    textMuted: isDark ? alpha("#F5F5F5", 0.75) : alpha("#1A1A2E", 0.65),
    border: alpha(isDark ? "#D4AF37" : "#186e96", 0.3),
    fieldText: isDark ? "#F5F5F5" : "#1A1A2E",
    fieldBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
  };

  const iconColors = {
    email: colors.primary,
    linkedin: "#0A66C2",
    github: isDark ? "#EAEAEA" : "#333333",
  };

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Auto focus on open
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) nameInput.focus();
      }, 300);
    }
  }, [open]);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setSnackbarMessage(
        "Email service not configured. Please contact via social links.",
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setSending(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setSnackbarMessage("✨ Message sent successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setSending(false);
        formRef.current?.reset();
        setTimeout(() => onClose?.(), 1500);
      },
      (error) => {
        setSnackbarMessage(
          "❌ Failed to send. Please try again or use social links.",
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setSending(false);
      },
    );
  };

  // أيقونة الحقل
  const getFieldIcon = (field) => {
    switch (field) {
      case "name":
        return <PersonIcon sx={{ fontSize: 18, color: colors.primary }} />;
      case "email":
        return <AlternateEmailIcon sx={{ fontSize: 18, color: colors.primary }} />;
      case "message":
        return <MessageIcon sx={{ fontSize: 18, color: colors.primary }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={400}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: alpha("#000000", 0.7),
              backdropFilter: "blur(8px)",
            },
          },
        }}
        PaperProps={{
          sx: {
            background: colors.cardBg,
            borderRadius: 4,
            border: `1px solid ${colors.border}`,
            backdropFilter: "blur(10px)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            animation: `${pulseGlow} 3s ease-in-out infinite`,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #D4AF37, #FFD700, #f5d76e, #D4AF37)",
              backgroundSize: "200% 100%",
              animation: `${shimmer} 2s linear infinite`,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
            },
          },
        }}
      >
        {/* زر الإغلاق المطور */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            color: colors.textMuted,
            bgcolor: alpha(colors.primary, 0.05),
            border: `1px solid ${alpha(colors.primary, 0.1)}`,
            "&:hover": {
              bgcolor: alpha(colors.primary, 0.15),
              transform: "rotate(90deg) scale(1.1)",
              color: colors.primary,
            },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: "10px",
          }}
          aria-label="Close contact dialog"
        >
          <CloseIcon sx={{ fontSize: "20px" }} />
        </IconButton>

        <CardContent sx={{ p: { xs: 3, sm: 4 }, pt: { xs: 4, sm: 5 } }}>
          {/* العنوان */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Chip
              label="📬 CONTACT"
              sx={{
                bgcolor: "rgba(212, 175, 55, 0.1)",
                color: colors.primary,
                border: `1px solid ${colors.border}`,
                fontWeight: 600,
                letterSpacing: "2px",
                fontSize: "10px",
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: colors.primary,
                fontWeight: 700,
                textAlign: "center",
                fontSize: { xs: "1.6rem", sm: "2rem" },
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Let's Work Together
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: colors.textMuted,
                textAlign: "center",
                fontSize: "0.95rem",
                maxWidth: "400px",
                mx: "auto",
              }}
            >
              Send your inquiry and I will respond as soon as possible.
            </Typography>
          </Box>

          <form ref={formRef} onSubmit={sendEmail}>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                required
                disabled={sending}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                      {getFieldIcon("name")}
                    </Box>
                  ),
                  style: { color: colors.fieldText },
                }}
                InputLabelProps={{ style: { color: colors.primary } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: colors.fieldBg,
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: focusedField === "name" ? colors.primary : colors.border,
                      borderWidth: focusedField === "name" ? 2 : 1,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                }}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                required
                disabled={sending}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                      {getFieldIcon("email")}
                    </Box>
                  ),
                  style: { color: colors.fieldText },
                }}
                InputLabelProps={{ style: { color: colors.primary } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: colors.fieldBg,
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: focusedField === "email" ? colors.primary : colors.border,
                      borderWidth: focusedField === "email" ? 2 : 1,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                }}
              />
              <TextField
                name="message"
                label="Your message..."
                variant="outlined"
                required
                multiline
                rows={4}
                disabled={sending}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: "flex", alignItems: "center", alignSelf: "flex-start", mt: 1.5 }}>
                      {getFieldIcon("message")}
                    </Box>
                  ),
                  style: { color: colors.fieldText },
                }}
                InputLabelProps={{ style: { color: colors.primary } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: colors.fieldBg,
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: focusedField === "message" ? colors.primary : colors.border,
                      borderWidth: focusedField === "message" ? 2 : 1,
                    },
                    "&:hover fieldset": {
                      borderColor: colors.primary,
                    },
                  },
                }}
              />
            </Box>

            <CardActions sx={{ justifyContent: "space-between", mt: 3, px: 0, flexWrap: "wrap", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography sx={{ color: colors.textMuted, fontSize: "0.7rem", display: "flex", alignItems: "center" }}>
                  🔒 Secure
                </Typography>
                <Typography sx={{ color: colors.textMuted, fontSize: "0.7rem", display: "flex", alignItems: "center" }}>
                  ⚡ Fast
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                disabled={sending}
                endIcon={<SendIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                  fontWeight: 600,
                  borderRadius: "30px",
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "&:hover": {
                    backgroundColor: colors.primary,
                    opacity: 0.85,
                    transform: "translateY(-2px) scale(1.02)",
                    boxShadow: `0 8px 30px ${alpha(colors.primary, 0.3)}`,
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:disabled": {
                    opacity: 0.6,
                  },
                }}
              >
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </CardActions>
          </form>

          {/* الروابط الاجتماعية */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
              pt: 3,
              justifyContent: "center",
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <Link
              href="mailto:hdayaaslam34@gmail.com"
              target="_blank"
              aria-label="Send email"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: alpha(iconColors.email, 0.05),
                border: `1px solid ${alpha(iconColors.email, 0.1)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.05)",
                  bgcolor: alpha(iconColors.email, 0.1),
                  boxShadow: `0 8px 25px ${alpha(iconColors.email, 0.15)}`,
                },
              }}
            >
              <EmailIcon sx={{ color: iconColors.email, fontSize: 24 }} />
            </Link>
            <Link
              href="https://github.com/eslam-cmd"
              target="_blank"
              aria-label="GitHub profile"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: alpha(iconColors.github, 0.05),
                border: `1px solid ${alpha(iconColors.github, 0.1)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.05)",
                  bgcolor: alpha(iconColors.github, 0.1),
                  boxShadow: `0 8px 25px ${alpha(iconColors.github, 0.15)}`,
                },
              }}
            >
              <GitHubIcon sx={{ color: iconColors.github, fontSize: 24 }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eslam-hd-60a056357"
              target="_blank"
              aria-label="LinkedIn profile"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: alpha(iconColors.linkedin, 0.05),
                border: `1px solid ${alpha(iconColors.linkedin, 0.1)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.05)",
                  bgcolor: alpha(iconColors.linkedin, 0.1),
                  boxShadow: `0 8px 25px ${alpha(iconColors.linkedin, 0.15)}`,
                },
              }}
            >
              <LinkedInIcon sx={{ color: iconColors.linkedin, fontSize: 24 }} />
            </Link>
          </Box>
        </CardContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Grow}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
          sx={{
            borderRadius: "12px",
            boxShadow: `0 8px 30px ${alpha(colors.primary, 0.15)}`,
            "& .MuiAlert-icon": {
              fontSize: "20px",
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}