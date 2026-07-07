// src/components/LoadingScreen.jsx
"use client";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TypeAnimation } from "react-type-animation";
import TerminalIcon from "@mui/icons-material/Terminal";

export default function LoadingScreen() {
  return (
    <Backdrop
      open
      sx={{
        color: "#D4AF37",
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 9999,
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
          width: "100%",
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
            "Initializing components...",
            1500,
            "Compiling modules...",
            1500,
            "Optimizing UI...",
            1500,
            "Almost ready ✨",
            1500,
          ]}
          speed={50}
          style={{
            fontFamily: "monospace",
            fontSize: "1rem",
            color: "#D4AF37",
          }}
          repeat={Infinity}
        />
      </Box>
    </Backdrop>
  );
}
