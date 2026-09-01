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
  BusinessCenter as BusinessCenterIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
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
  Stack,
  Paper,
  Slide,
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

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

export default function ContactPage({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const formRef = useRef();
  const contentRef = useRef(null);
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

  // دالة التمرير للأسفل
  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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

  const getFieldIcon = (field) => {
    switch (field) {
      case "name":
        return <PersonIcon sx={{ fontSize: 16, color: colors.primary }} />;
      case "email":
        return <AlternateEmailIcon sx={{ fontSize: 16, color: colors.primary }} />;
      case "message":
        return <MessageIcon sx={{ fontSize: 16, color: colors.primary }} />;
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
            position: "relative",
            overflow: "hidden",
            maxHeight: "90vh",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, #D4AF37, #FFD700, #f5d76e, #D4AF37)",
              backgroundSize: "200% 100%",
              animation: `${shimmer} 2s linear infinite`,
            },
          },
        }}
      >
        {/* زر الإغلاق - أصغر */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            color: colors.textMuted,
            bgcolor: alpha(colors.primary, 0.05),
            border: `1px solid ${alpha(colors.primary, 0.1)}`,
            "&:hover": {
              bgcolor: alpha(colors.primary, 0.15),
              transform: "rotate(90deg) scale(1.05)",
              color: colors.primary,
            },
            transition: "all 0.3s ease",
            padding: "6px",
          }}
        >
          <CloseIcon sx={{ fontSize: "18px" }} />
        </IconButton>

        {/* محتوى قابل للتمرير */}
        <Box
          ref={contentRef}
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            px: { xs: 2, sm: 3 },
            py: { xs: 1, sm: 1.5 },
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: colors.border,
              borderRadius: "2px",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2 }, pt: { xs: 2, sm: 2.5 } }}>
            {/* العنوان - أصغر */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Chip
                label="📬 CONTACT"
                sx={{
                  bgcolor: "rgba(212, 175, 55, 0.08)",
                  color: colors.primary,
                  border: `1px solid ${colors.border}`,
                  fontWeight: 500,
                  letterSpacing: "1.5px",
                  fontSize: "9px",
                  height: 22,
                  mb: 1.5,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: colors.primary,
                  fontWeight: 600,
                  textAlign: "center",
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Let's Work Together
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: colors.textMuted,
                  textAlign: "center",
                  fontSize: "0.8rem",
                  maxWidth: "350px",
                  mx: "auto",
                }}
              >
                Send your inquiry and I'll respond as soon as possible.
              </Typography>
            </Box>

            {/* قسم العمل الحر - أصغر */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 2,
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${alpha(colors.primary, 0.04)}, ${alpha(colors.primary, 0.01)})`,
                border: `1px solid ${alpha(colors.primary, 0.1)}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: `linear-gradient(135deg, ${alpha(colors.primary, 0.12)}, ${alpha(colors.primary, 0.04)})`,
                    border: `1px solid ${alpha(colors.primary, 0.15)}`,
                  }}
                >
                  <BusinessCenterIcon sx={{ color: colors.primary, fontSize: 20 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.primary,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    🚀 Open for Freelance Work
                    <Chip
                      label="Available"
                      size="small"
                      sx={{
                        ml: 0.5,
                        bgcolor: "#22c55e",
                        color: "#fff",
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        height: 18,
                        "& .MuiChip-label": { px: 0.8, py: 0 },
                      }}
                    />
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textMuted,
                      fontSize: "0.75rem",
                      mt: 0.3,
                    }}
                  >
                    👉 <Link
                      href="https://binaa-chi.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: colors.primary,
                        fontWeight: 500,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                          color: "#FFD700",
                        },
                        transition: "color 0.3s ease",
                      }}
                    >
                      Visit my portfolio
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* نموذج التواصل - أصغر */}
            <form ref={formRef} onSubmit={sendEmail}>
              <Box display="flex" flexDirection="column" gap={1.8}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  required
                  size="small"
                  disabled={sending}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 0.5, display: "flex", alignItems: "center" }}>
                        {getFieldIcon("name")}
                      </Box>
                    ),
                    style: { color: colors.fieldText, fontSize: "0.85rem" },
                  }}
                  InputLabelProps={{ 
                    style: { color: colors.primary, fontSize: "0.75rem" } 
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: colors.fieldBg,
                      fontSize: "0.85rem",
                      minHeight: 38,
                      "& fieldset": {
                        borderColor: focusedField === "name" ? colors.primary : colors.border,
                        borderWidth: focusedField === "name" ? 1.5 : 1,
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
                  size="small"
                  disabled={sending}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 0.5, display: "flex", alignItems: "center" }}>
                        {getFieldIcon("email")}
                      </Box>
                    ),
                    style: { color: colors.fieldText, fontSize: "0.85rem" },
                  }}
                  InputLabelProps={{ 
                    style: { color: colors.primary, fontSize: "0.75rem" } 
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: colors.fieldBg,
                      fontSize: "0.85rem",
                      minHeight: 38,
                      "& fieldset": {
                        borderColor: focusedField === "email" ? colors.primary : colors.border,
                        borderWidth: focusedField === "email" ? 1.5 : 1,
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
                  rows={3}
                  size="small"
                  disabled={sending}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 0.5, display: "flex", alignItems: "center", alignSelf: "flex-start", mt: 1 }}>
                        {getFieldIcon("message")}
                      </Box>
                    ),
                    style: { color: colors.fieldText, fontSize: "0.85rem" },
                  }}
                  InputLabelProps={{ 
                    style: { color: colors.primary, fontSize: "0.75rem" } 
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: colors.fieldBg,
                      fontSize: "0.85rem",
                      "& fieldset": {
                        borderColor: focusedField === "message" ? colors.primary : colors.border,
                        borderWidth: focusedField === "message" ? 1.5 : 1,
                      },
                      "&:hover fieldset": {
                        borderColor: colors.primary,
                      },
                    },
                  }}
                />
              </Box>

              <CardActions sx={{ justifyContent: "space-between", mt: 2, px: 0, flexWrap: "wrap", gap: 0.5 }}>
                <Box sx={{ display: "flex", gap: 0.8 }}>
                  <Typography sx={{ color: colors.textMuted, fontSize: "0.6rem", display: "flex", alignItems: "center" }}>
                    🔒 Secure
                  </Typography>
                  <Typography sx={{ color: colors.textMuted, fontSize: "0.6rem", display: "flex", alignItems: "center" }}>
                    ⚡ Fast
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={sending}
                  endIcon={<SendIcon sx={{ fontSize: 16 }} />}
                  size="small"
                  sx={{
                    px: 3,
                    py: 0.8,
                    backgroundColor: colors.primary,
                    color: colors.onPrimary,
                    fontWeight: 600,
                    borderRadius: "30px",
                    textTransform: "none",
                    fontSize: "0.8rem",
                    minWidth: "120px",
                    "&:hover": {
                      backgroundColor: colors.primary,
                      opacity: 0.85,
                      transform: "translateY(-1px) scale(1.02)",
                      boxShadow: `0 4px 20px ${alpha(colors.primary, 0.3)}`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:disabled": {
                      opacity: 0.6,
                    },
                  }}
                >
                  {sending ? "Sending..." : "Send"}
                </Button>
              </CardActions>
            </form>

            {/* الروابط الاجتماعية - أصغر */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                mt: 2,
                pt: 2,
                justifyContent: "center",
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              <Link
                href="mailto:hdayaaslam34@gmail.com"
                target="_blank"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: alpha(iconColors.email, 0.05),
                  border: `1px solid ${alpha(iconColors.email, 0.1)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    bgcolor: alpha(iconColors.email, 0.1),
                    boxShadow: `0 4px 15px ${alpha(iconColors.email, 0.15)}`,
                  },
                }}
              >
                <EmailIcon sx={{ color: iconColors.email, fontSize: 18 }} />
              </Link>
              <Link
                href="https://github.com/eslam-cmd"
                target="_blank"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: alpha(iconColors.github, 0.05),
                  border: `1px solid ${alpha(iconColors.github, 0.1)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    bgcolor: alpha(iconColors.github, 0.1),
                    boxShadow: `0 4px 15px ${alpha(iconColors.github, 0.15)}`,
                  },
                }}
              >
                <GitHubIcon sx={{ color: iconColors.github, fontSize: 18 }} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/eslam-hd-60a056357"
                target="_blank"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor: alpha(iconColors.linkedin, 0.05),
                  border: `1px solid ${alpha(iconColors.linkedin, 0.1)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    bgcolor: alpha(iconColors.linkedin, 0.1),
                    boxShadow: `0 4px 15px ${alpha(iconColors.linkedin, 0.15)}`,
                  },
                }}
              >
                <LinkedInIcon sx={{ color: iconColors.linkedin, fontSize: 18 }} />
              </Link>
            </Box>
          </CardContent>
        </Box>

        {/* ✅ سهم التمرير للأسفل */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            py: 1,
            background: `linear-gradient(to top, ${isDark ? 'rgba(10,31,68,0.95)' : 'rgba(255,255,255,0.95)'}, transparent)`,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <IconButton
            onClick={scrollToBottom}
            sx={{
              pointerEvents: "auto",
              color: colors.primary,
              bgcolor: alpha(colors.primary, 0.1),
              border: `1px solid ${alpha(colors.primary, 0.2)}`,
              width: 32,
              height: 32,
              animation: `${bounce} 2s ease-in-out infinite`,
              "&:hover": {
                bgcolor: alpha(colors.primary, 0.2),
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
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
              fontSize: "18px",
            },
            fontSize: "0.85rem",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}