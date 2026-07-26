// src/components/LoadingScreen.jsx
"use client";

import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TypeAnimation } from "react-type-animation";
import TerminalIcon from "@mui/icons-material/Terminal";

export default function LoadingScreen() {
  const [open, setOpen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setFadeOut(true); // ابدأ الاختفاء
      setTimeout(() => setOpen(false), 600); // شيلها من DOM بعد الـ fade
    };

    // إذا الموقع محمل أصلاً
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!open) return null;

  return (
    <Backdrop
      open={open}
      sx={{
        color: "#D4AF37",
        backgroundColor: "rgba(0,0,0,0.95)",
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease-out",
        visibility: fadeOut ? "hidden" : "visible",
      }}
    >
      <Box
        sx={{
          textAlign: "left",
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#121212",
          boxShadow: "0 0 10px #D4AF37",
          border: "1px solid #a18529ff",
          maxWidth: 500,
          width: "90%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "monospace",
            display: "flex",
            alignItems: "center",
            color: "#D4AF37",
            marginBottom: 2,
          }}
        >
          <TerminalIcon sx={{ marginRight: 1 }} />
          terminal:~/project/src
        </Typography>

        <TypeAnimation
          sequence={[
            "Initializing...",
            400,
            "Loading modules...",
            400,
            "Ready.",
            200,
          ]}
          speed={70}
          style={{
            fontFamily: "monospace",
            fontSize: "1rem",
            color: "#D4AF37",
          }}
          repeat={0}
          cursor={false}
        />
      </Box>
    </Backdrop>
  );
}
