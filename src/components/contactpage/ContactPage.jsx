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
  Dialog,
  IconButton,
  Link,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  alpha,
  Fade,
  Grow,
  Stack,
} from "@mui/material";
import emailjs from "emailjs-com";
import { useRef, useState, useEffect } from "react";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

export default function ContactPage({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const formRef = useRef();
  const contentRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [sending, setSending] = useState(false);

  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
    paperBg: isDark
      ? "linear-gradient(160deg, #0d2552 0%, #0A1F44 60%, #081a3a 100%)"
      : "linear-gradient(160deg, #ffffff 0%, #eef5fa 100%)",
    dots: isDark ? "rgba(212,175,55,0.08)" : "rgba(24,110,150,0.10)",
    text: isDark ? "#F5F5F5" : "#0A1F44",
    textMuted: isDark ? alpha("#F5F5F5", 0.72) : alpha("#0A1F44", 0.68),
    border: alpha(isDark ? "#D4AF37" : "#186e96", 0.28),
    borderSoft: alpha(isDark ? "#D4AF37" : "#186e96", 0.16),
    fieldBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(10,31,68,0.03)",
  };

  const iconColors = {
    email: colors.primary,
    linkedin: "#0A66C2",
    github: isDark ? "#EAEAEA" : "#333333",
  };

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        document.querySelector('input[name="name"]')?.focus();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  const scrollToBottom = () => {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
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
        setSnackbarMessage("Message sent successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setSending(false);
        formRef.current?.reset();
        setTimeout(() => onClose?.(), 1500);
      },
      () => {
        setSnackbarMessage(
          "Failed to send. Please try again or use the social links.",
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setSending(false);
      },
    );
  };

  // أسماء الحقول (name) يجب أن تبقى كما هي لأن قالب EmailJS يعتمد عليها
  const fields = [
    { name: "name", label: "Name", Icon: PersonIcon },
    { name: "email", label: "Email", Icon: AlternateEmailIcon, type: "email" },
    {
      name: "message",
      label: "Your message",
      Icon: MessageIcon,
      multiline: true,
    },
  ];

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: colors.fieldBg,
      color: colors.text,
      fontSize: "0.92rem",
      transition: "all 0.2s ease",
      "& fieldset": { borderColor: colors.border },
      "&:hover fieldset": { borderColor: colors.primary },
      "&.Mui-focused fieldset": { borderColor: colors.primary, borderWidth: 1.5 },
    },
    "& .MuiInputLabel-root": { color: colors.textMuted, fontSize: "0.9rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: colors.primary },
  };

  const socials = [
    {
      label: "Email",
      href: "mailto:hdayaaslam34@gmail.com",
      Icon: EmailIcon,
      color: iconColors.email,
    },
    {
      label: "GitHub",
      href: "https://github.com/eslam-cmd",
      Icon: GitHubIcon,
      color: iconColors.github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/eslam-hd-60a056357",
      Icon: LinkedInIcon,
      color: iconColors.linkedin,
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={300}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: alpha("#020a1a", 0.65),
              backdropFilter: "blur(8px)",
            },
          },
        }}
        PaperProps={{
          sx: {
            fontFamily: FONT,
            "& .MuiTypography-root, & .MuiInputBase-root, & .MuiButton-root, & .MuiInputLabel-root":
              { fontFamily: FONT },
            backgroundImage: `radial-gradient(circle, ${colors.dots} 1px, transparent 1.6px), ${colors.paperBg}`,
            backgroundSize: "26px 26px, auto",
            borderRadius: "28px",
            border: `1px solid ${colors.border}`,
            boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
            position: "relative",
            overflow: "hidden",
            maxHeight: "90vh",
            m: { xs: 1.5, sm: 3 },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              opacity: 0.8,
            },
          },
        }}
      >
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 10,
            color: colors.textMuted,
            bgcolor: alpha(colors.primary, 0.06),
            border: `1px solid ${colors.borderSoft}`,
            p: "7px",
            transition: "all 0.25s ease",
            "&:hover": {
              bgcolor: alpha(colors.primary, 0.14),
              color: colors.primary,
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Box
          ref={contentRef}
          sx={{
            maxHeight: "86vh",
            overflowY: "auto",
            px: { xs: 2.5, sm: 4 },
            pt: { xs: 4, sm: 4.5 },
            pb: { xs: 3, sm: 3.5 },
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: colors.border,
              borderRadius: "2px",
            },
          }}
        >
          {/* العنوان */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              component="h2"
              sx={{
                color: colors.primary,
                fontWeight: 600,
                fontSize: { xs: "1.5rem", sm: "1.75rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Let's work together
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color: colors.textMuted,
                fontSize: "0.95rem",
                lineHeight: 1.6,
                maxWidth: 380,
                mx: "auto",
              }}
            >
              Send your inquiry and I'll respond as soon as possible.
            </Typography>
          </Box>

          {/* العمل الحر */}
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: "18px",
              background: alpha(colors.primary, 0.06),
              border: `1px solid ${colors.borderSoft}`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: "12px",
                  background: alpha(colors.primary, 0.12),
                }}
              >
                <BusinessCenterIcon sx={{ color: colors.primary, fontSize: 22 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    color: colors.text,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  Open for freelance work
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.6,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#22c55e",
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        bgcolor: "#22c55e",
                      }}
                    />
                    Available
                  </Box>
                </Typography>
                <Link
                  href="https://binaa-chi.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: colors.primary,
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Visit my portfolio
                </Link>
              </Box>
            </Stack>
          </Box>

          {/* النموذج */}
          <form ref={formRef} onSubmit={sendEmail}>
            <Box display="flex" flexDirection="column" gap={2}>
              {fields.map(({ name, label, Icon, type, multiline }) => (
                <TextField
                  key={name}
                  name={name}
                  label={label}
                  type={type}
                  variant="outlined"
                  required
                  size="small"
                  multiline={multiline}
                  rows={multiline ? 4 : undefined}
                  disabled={sending}
                  InputProps={{
                    startAdornment: (
                      <Box
                        sx={{
                          mr: 1,
                          display: "flex",
                          alignItems: "center",
                          alignSelf: multiline ? "flex-start" : "center",
                          mt: multiline ? 0.4 : 0,
                        }}
                      >
                        <Icon sx={{ fontSize: 18, color: colors.primary }} />
                      </Box>
                    ),
                  }}
                  sx={fieldSx}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2.5 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={sending}
                endIcon={<SendIcon sx={{ fontSize: 17 }} />}
                sx={{
                  px: 3.5,
                  py: 1.1,
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                  fontWeight: 600,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  minWidth: 140,
                  boxShadow: "none",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: colors.primary,
                    opacity: 0.9,
                    boxShadow: `0 6px 22px ${alpha(colors.primary, 0.3)}`,
                  },
                  "&.Mui-disabled": {
                    backgroundColor: colors.primary,
                    color: colors.onPrimary,
                    opacity: 0.6,
                  },
                }}
              >
                {sending ? "Sending..." : "Send message"}
              </Button>
            </Box>
          </form>

          {/* الروابط */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 3,
              pt: 3,
              justifyContent: "center",
              borderTop: `1px solid ${colors.borderSoft}`,
            }}
          >
            {socials.map(({ label, href, Icon, color }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 42,
                  height: 42,
                  borderRadius: "14px",
                  bgcolor: alpha(color, 0.07),
                  border: `1px solid ${alpha(color, 0.18)}`,
                  transition: "all 0.25s ease",
                  "&:hover": {
                    bgcolor: alpha(color, 0.14),
                    borderColor: alpha(color, 0.4),
                  },
                }}
              >
                <Icon sx={{ color, fontSize: 20 }} />
              </Link>
            ))}
          </Box>
        </Box>

        {/* سهم التمرير للأسفل */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            py: 0.8,
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <IconButton
            onClick={scrollToBottom}
            aria-label="Scroll down"
            sx={{
              pointerEvents: "auto",
              color: colors.primary,
              bgcolor: alpha(colors.primary, 0.1),
              border: `1px solid ${colors.borderSoft}`,
              width: 32,
              height: 32,
              transition: "all 0.25s ease",
              "&:hover": { bgcolor: alpha(colors.primary, 0.2) },
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
            borderRadius: "14px",
            fontFamily: FONT,
            fontSize: "0.9rem",
            boxShadow: `0 8px 30px ${alpha(colors.primary, 0.18)}`,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}