"use client";

import * as React from "react";
import { Box, Button } from "@mui/material";
import ContactPage from "@/components/contactpage/ContactPage";

export default function AboutPageClient() {
  const [contactOpen, setContactOpen] = React.useState(false);

  return (
    <>
      <Box sx={{ textAlign: "center", mt: -3, mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setContactOpen(true)}
          sx={{
            px: { xs: 5, sm: 6, md: 7 },
            py: { xs: 1.6, sm: 1.8, md: 2.2 },
            borderRadius: "30px",
            background: "#D4AF37",
            color: "#0A1F44",
            fontSize: { xs: "1rem", sm: "1.05rem", md: "1.15rem" },
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 4px 20px rgba(212, 175, 55, 0.25)",
            "&:hover": {
              transform: "translateY(-3px) scale(1.02)",
              boxShadow: "0 8px 35px rgba(212, 175, 55, 0.35)",
            },
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Get In Touch
        </Button>
      </Box>
      <ContactPage open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
