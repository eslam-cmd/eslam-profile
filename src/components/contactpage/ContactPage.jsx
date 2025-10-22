"use client";

import {
  Email as EmailIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  Home as HomeIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import emailjs from "emailjs-com";
import { useRef, useState } from "react";

export default function ContactPage() {
  const formRef = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sending, setSending] = useState(false);

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
        },
        () => {
          setSending(false);
        }
      );
  };

  return (
    <Box
      id="contactpage"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #0A1F44)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Grid container justifyContent="center">
        <Card
          sx={{
            boxShadow: 4,
            width: "100%",
            maxWidth: 600,
            background: "linear-gradient(135deg, #000000, #0A1F44)",
            borderRadius: 3,
            backdropFilter: "blur(6px)",
            padding: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                color: "#D4AF37",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              Let's Work Together
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 3, color: "#ccc", textAlign: "center" }}
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
                  InputLabelProps={{ style: { color: "#D4AF37" } }}
                  InputProps={{
                    style: {
                      color: "#fff",
                      borderColor: "#fff",
                    },
                  }}
                />
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: "#D4AF37" } }}
                  InputProps={{
                    style: {
                      color: "#fff",
                      borderColor: "#fff",
                    },
                  }}
                />
                <TextField
                  name="message"
                  label="Your message ..."
                  variant="outlined"
                  required
                  multiline
                  rows={4}
                  InputLabelProps={{ style: { color: "#D4AF37" } }}
                  InputProps={{
                    style: {
                      color: "#fff",
                      borderColor: "#fff",
                    },
                  }}
                />
              </Box>

              <CardActions sx={{ justifyContent: "space-between", mt: 3 }}>
                <Button
                  startIcon={<HomeIcon />}
                  href="/"
                  variant="outlined"
                  sx={{
                    color: "#D4AF37",
                    borderColor: "#D4AF37",
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                    },
                  }}
                >
                  Home
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={sending}
                  sx={{
                    px: 4,
                    py: 1.5,
                    backgroundColor: "#D4AF37",
                    color: "#000",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#c9a32f",
                    },
                  }}
                >
                  {sending ? "Sending..." : "Submit"}
                </Button>
              </CardActions>
            </form>
          </CardContent>

          <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
            <Link href="mailto:hdayaaslam34@gmail.com" target="_blank">
              <EmailIcon sx={{ color: "#D4AF37" }} />
            </Link>
            <Link
              href="https://www.facebook.com/islam.hadaya.2025?mibextid=ZbWKwL"
              target="_blank"
            >
              <FacebookIcon sx={{ color: "#1877F2" }} />
            </Link>
            <Link href="https://github.com/eslam-cmd" target="_blank">
              <GitHubIcon sx={{ color: "#EAEAEA" }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eslam-hd-60a056357"
              target="_blank"
            >
              <LinkedInIcon sx={{ color: "#0A66C2" }} />
            </Link>
          </Box>
        </Card>
      </Grid>

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
    </Box>
  );
}
