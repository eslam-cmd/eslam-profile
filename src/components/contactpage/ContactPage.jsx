"use client";

import {
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Close as CloseIcon,
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
} from "@mui/material";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";

export default function ContactPage({ open, onClose }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const formRef = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [sending, setSending] = useState(false);

  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
    cardBg: isDark
      ? "linear-gradient(135deg, rgba(10, 31, 68, 0.97), rgba(26, 26, 46, 0.97))"
      : "linear-gradient(135deg, #ffffff, #eef4f8)",
    text: isDark ? "#F5F5F5" : "#1A1A2E",
    textMuted: isDark ? alpha("#F5F5F5", 0.75) : alpha("#1A1A2E", 0.65),
    border: alpha(isDark ? "#D4AF37" : "#186e96", 0.3),
    fieldText: isDark ? "#F5F5F5" : "#1A1A2E",
  };

  const iconColors = {
    email: colors.primary,
    linkedin: "#0A66C2",
    github: isDark ? "#EAEAEA" : "#333333",
  };

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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
        setSnackbarMessage("Message sent successfully ✅");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setSending(false);
        formRef.current?.reset();
        setTimeout(() => onClose?.(), 1500);
      },
      (error) => {
        setSnackbarMessage(
          "Failed to send. Please try again or use social links.",
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setSending(false);
      },
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        slotProps={{
          backdrop: {
            sx: { backgroundColor: alpha("#000000", 0.6) },
          },
        }}
        PaperProps={{
          sx: {
            background: colors.cardBg,
            borderRadius: 3,
            border: `1px solid ${colors.border}`,
            backdropFilter: "blur(6px)",
            boxShadow: 8,
          },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: colors.textMuted,
          }}
          aria-label="Close contact dialog"
        >
          <CloseIcon />
        </IconButton>

        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h4"
            sx={{
              color: colors.primary,
              fontWeight: 700,
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.6rem", sm: "2rem" },
            }}
          >
            Let&apos;s Work Together
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, color: colors.textMuted, textAlign: "center" }}
          >
            Send your inquiry and I will respond as soon as possible.
          </Typography>

          <form ref={formRef} onSubmit={sendEmail}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                required
                disabled={sending}
                InputLabelProps={{ style: { color: colors.primary } }}
                InputProps={{ style: { color: colors.fieldText } }}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                required
                disabled={sending}
                InputLabelProps={{ style: { color: colors.primary } }}
                InputProps={{ style: { color: colors.fieldText } }}
              />
              <TextField
                name="message"
                label="Your message..."
                variant="outlined"
                required
                multiline
                rows={4}
                disabled={sending}
                InputLabelProps={{ style: { color: colors.primary } }}
                InputProps={{ style: { color: colors.fieldText } }}
              />
            </Box>

            <CardActions sx={{ justifyContent: "flex-end", mt: 3, px: 0 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={sending}
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                  fontWeight: 600,
                  borderRadius: "25px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: colors.primary,
                    opacity: 0.85,
                  },
                }}
              >
                {sending ? "Sending..." : "Submit"}
              </Button>
            </CardActions>
          </form>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 2,
              pt: 2,
              justifyContent: "center",
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <Link
              href="mailto:hdayaaslam34@gmail.com"
              target="_blank"
              aria-label="Send email"
            >
              <EmailIcon sx={{ color: iconColors.email }} />
            </Link>
            <Link
              href="https://github.com/eslam-cmd"
              target="_blank"
              aria-label="GitHub profile"
            >
              <GitHubIcon sx={{ color: iconColors.github }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eslam-hd-60a056357"
              target="_blank"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon sx={{ color: iconColors.linkedin }} />
            </Link>
          </Box>
        </CardContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
