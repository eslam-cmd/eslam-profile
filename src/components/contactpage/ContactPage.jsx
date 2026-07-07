"use client";

import {
  Email as EmailIcon,
  Facebook as FacebookIcon,
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
  const [sending, setSending] = useState(false);

  // ===== Unified color system — everything derives from isDark =====
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
    facebook: "#1877F2",
    linkedin: "#0A66C2",
    github: isDark ? "#EAEAEA" : "#333333",
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_un3a9dt",
        "template_r6rw1jg",
        formRef.current,
        "TJQrTHj8YbQMKH9xb"
      )
      .then(
        () => {
          setOpenSnackbar(true);
          setSending(false);
          onClose?.();
        },
        () => {
          setSending(false);
        }
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
        >
          <CloseIcon />
        </IconButton>

        <CardContent sx={{ p: { xs: 2, sm: 2 } }}>
          <Typography
            variant="h4"
            sx={{
              color: colors.primary,
              fontWeight: "700",
              textAlign: "center",
              mb: 2,
              fontSize: { xs: "1.6rem", sm: "2rem" },
            }}
          >
            Let's Work Together
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, color: colors.textMuted, textAlign: "center" }}
          >
            You can send your inquiries and we will respond to you as soon as
            possible.
          </Typography>

          <form ref={formRef} onSubmit={sendEmail}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                required
                InputLabelProps={{ style: { color: colors.primary } }}
                InputProps={{ style: { color: colors.fieldText } }}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                required
                InputLabelProps={{ style: { color: colors.primary } }}
                InputProps={{ style: { color: colors.fieldText } }}
              />
              <TextField
                name="message"
                label="Your message ..."
                variant="outlined"
                required
                multiline
                rows={4}
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
                  fontWeight: "600",
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

          <Box sx={{ display: "flex", gap: 2, mt: -2, justifyContent: "center" }}>
            <Link href="mailto:hdayaaslam34@gmail.com" target="_blank">
              <EmailIcon sx={{ color: iconColors.email }} />
            </Link>
            {/* <Link
              href="https://www.facebook.com/islam.hadaya.2025?mibextid=ZbWKwL"
              target="_blank"
            >
              <FacebookIcon sx={{ color: iconColors.facebook }} />
            </Link> */}
            <Link href="https://github.com/eslam-cmd" target="_blank">
              <GitHubIcon sx={{ color: iconColors.github }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eslam-hd-60a056357"
              target="_blank"
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
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          The message was sent successfully ✅
        </Alert>
      </Snackbar>
    </>
  );
}