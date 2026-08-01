// src/components/LoadingScreen.jsx
"use client";

import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TypeAnimation } from "react-type-animation";
import TerminalIcon from "@mui/icons-material/Terminal";
import { keyframes } from "@mui/system";

// تأثيرات حركية
const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function LoadingScreen() {
  const [open, setOpen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // محاكاة تقدم التحميل
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setFadeOut(true);
      setTimeout(() => setOpen(false), 800);
    };

    if (document.readyState === "complete") {
      setTimeout(handleLoad, 500);
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
        background: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        visibility: fadeOut ? "hidden" : "visible",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* الكرت الرئيسي - تصميم زجاجي أنيق */}
      <Box
        sx={{
          position: "relative",
          textAlign: "left",
          padding: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: "rgba(18, 18, 18, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(212, 175, 55, 0.15)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212, 175, 55, 0.05)",
          maxWidth: 520,
          width: "90%",
          overflow: "hidden",
          animation: `${float} 3s ease-in-out infinite`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "conic-gradient(from 0deg, transparent, rgba(212, 175, 55, 0.03), transparent, rgba(212, 175, 55, 0.03), transparent)",
            animation: `${rotate} 10s linear infinite`,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* الهيدر */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Fira Code', monospace",
                display: "flex",
                alignItems: "center",
                color: "#D4AF37",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              <TerminalIcon sx={{ mr: 1, fontSize: 20 }} />
              ~/project
            </Typography>

            {/* النقاط المتحركة */}
            <Box sx={{ display: "flex", gap: 0.8 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: i === 0 ? "#ff5f57" : i === 1 ? "#ffbd2e" : "#28c840",
                    opacity: 0.7,
                    animation: `${pulse} 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* النص المتحرك */}
          <Box sx={{ mb: 3 }}>
            <TypeAnimation
              sequence={[
                "> Initializing system...",
                300,
                "> Loading components...",
                300,
                "> Fetching data...",
                300,
                "> Almost ready...",
                300,
                "> ✨ Ready to go!",
              ]}
              speed={60}
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: { xs: "14px", sm: "16px" },
                color: "#D4AF37",
                lineHeight: 1.8,
              }}
              repeat={0}
              cursor={true}
              cursorStyle="█"
            />
          </Box>

          {/* شريط التقدم */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "11px",
                  color: "rgba(212, 175, 55, 0.6)",
                  letterSpacing: "0.5px",
                }}
              >
                Loading
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "11px",
                  color: "#D4AF37",
                  fontWeight: 600,
                }}
              >
                {Math.min(Math.round(progress), 100)}%
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: 3,
                bgcolor: "rgba(212, 175, 55, 0.1)",
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: `${Math.min(progress, 100)}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #D4AF37, #f5d76e, #D4AF37)",
                  backgroundSize: "200% 100%",
                  borderRadius: 2,
                  transition: "width 0.3s ease",
                  animation: `${shimmer} 2s linear infinite`,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* نص سفلي أنيق */}
      <Typography
        sx={{
          fontFamily: "'Fira Code', monospace",
          fontSize: "11px",
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "2px",
          textTransform: "uppercase",
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        ✦ Building the future ✦
      </Typography>
    </Backdrop>
  );
}