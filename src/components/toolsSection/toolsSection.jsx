"use client";
import * as React from "react";
import { Box, Typography, Divider, alpha } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import GitHubIcon from "@mui/icons-material/GitHub";
import BoltIcon from "@mui/icons-material/Bolt";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { keyframes } from "@mui/system";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

// ─── حركات الصفوف ───
const marqueeLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const marqueeRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const getIcon = (library, name) => {
  if (library === "fa") return FaIcons[name];
  if (library === "si") return SiIcons[name];
  return undefined;
};

// ─── الأيقونات الموزعة على الصفين ───
const ROW_1 = [
  { icon: "SiTypescript", library: "si" },
  { icon: "SiJavascript", library: "si" },
  { icon: "FaReact", library: "fa" },
  { icon: "SiNextdotjs", library: "si" },
  { icon: "SiTailwindcss", library: "si" },
  { icon: "SiMui", library: "si" },
  { icon: "SiPostgresql", library: "si" },
  { icon: "SiDocker", library: "si" },
  { icon: "SiAmazonaws", library: "si" },
  { icon: "SiGit", library: "si" },
];

const ROW_2 = [
  { icon: "FaNodeJs", library: "fa" },
  { icon: "SiPrisma", library: "si" },
  { icon: "SiSupabase", library: "si" },
  { icon: "SiVercel", library: "si" },
  { icon: "SiNestjs", library: "si" },
  { icon: "SiPython", library: "si" },
  { icon: "SiDjango", library: "si" },
  { icon: "SiRedis", library: "si" },
  { icon: "SiGraphql", library: "si" },
  { icon: "SiFirebase", library: "si" },
];

// تكرار المصفوفة 4 مرات لضمان عدم وجود فراغات أثناء الحركة
const MARQUEE_ROW_1 = [...ROW_1, ...ROW_1, ...ROW_1, ...ROW_1];
const MARQUEE_ROW_2 = [...ROW_2, ...ROW_2, ...ROW_2, ...ROW_2];

export default function AboutSection({ darkMode = true }) {
  // لوحة الألوان الخاصة بك
  const c = {
    text: darkMode ? "#F5F5F5" : "#0A1F44",
    muted: darkMode ? alpha("#F5F5F5", 0.6) : alpha("#0A1F44", 0.6),
    accent: darkMode ? "#D4AF37" : "#186e96",
    border: darkMode ? "rgba(255,255,255,0.08)" : "rgba(24,110,150,0.15)",
    boxBg: darkMode ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
    iconBg: darkMode ? "rgba(255,255,255,0.03)" : "rgba(24,110,150,0.04)",
    iconBorder: darkMode ? "rgba(255,255,255,0.05)" : "rgba(24,110,150,0.1)",
    dotColor: darkMode ? "rgba(255,255,255,0.05)" : "rgba(24,110,150,0.08)",
  };

  const cardStyle = {
    bgcolor: c.boxBg,
    border: `1px solid ${c.border}`,
    borderRadius: "16px", // حواف أنعم وأصغر
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <>
      {/* خط عزل كامل عن القسم العلوي */}
      <Divider sx={{ borderColor: c.border, mt: 6, mb: 0 }} />

      <Box
        component="section"
        id="about"
        sx={{
          fontFamily: FONT,
          py: { xs: 8, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          overflow: "hidden",
          // خلفية النقاط الناعمة (نفس ستايل باقي الموقع)
          backgroundImage: `radial-gradient(circle, ${c.dotColor} 1px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      >
        <Box
          sx={{ maxWidth: 1000, mx: "auto", position: "relative", zIndex: 1 }}
        >
          {/* ───── عنوان القسم ───── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
            <Typography
              sx={{
                color: c.text,
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              About
            </Typography>
            <Box sx={{ flex: 1, height: "1px", bgcolor: c.border }} />
          </Box>

          {/* ───── 1. صندوق الاقتباس (Quote Box) ───── */}
          <Box
            sx={{
              ...cardStyle,
              p: { xs: 2.5, sm: 3 },
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormatQuoteIcon
                sx={{ color: c.accent, fontSize: 26, opacity: 0.8 }}
              />
              <Typography
                sx={{
                  color: c.text,
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", sm: "1.15rem" },
                  fontWeight: 500,
                  fontFamily: "'Georgia', serif",
                }}
              >
                “The only way to do great work is to love what you do.”
              </Typography>
            </Box>
            <Typography
              sx={{
                color: c.muted,
                fontSize: "0.75rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              — Steve Jobs
            </Typography>
          </Box>

          {/* ───── الشبكة السفلية ───── */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 3,
            }}
          >
            {/* 2. شريط التقنيات (صفين متحركين) */}
            <Box
              sx={{
                ...cardStyle,
                py: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {/* العنوان الصغير */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  bgcolor: c.iconBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.5,
                  ml: 3,
                  mb: 1,
                  width: "fit-content",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <BoltIcon sx={{ fontSize: 14, color: c.accent }} />
                <Typography
                  sx={{
                    color: c.text,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Tech Stack
                </Typography>
              </Box>

              {/* الصف الأول (يتحرك يساراً) */}
              <Box
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    animation: `${marqueeLeft} 35s linear infinite`,
                    "&:hover": { animationPlayState: "paused" },
                  }}
                >
                  {MARQUEE_ROW_1.map((tech, idx) => {
                    const Icon = getIcon(tech.library, tech.icon);
                    if (!Icon) return null;
                    return (
                      <Box
                        key={idx}
                        sx={{
                          flexShrink: 0,
                          mr: 1.5,
                          width: 44,
                          height: 44,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: c.iconBg,
                          border: `1px solid ${c.iconBorder}`,
                          borderRadius: "10px",
                        }}
                      >
                        <Icon
                          size={20}
                          color={
                            darkMode
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(10,31,68,0.8)"
                          }
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* الصف الثاني (يتحرك يميناً) */}
              <Box
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                  maskImage:
                    "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    animation: `${marqueeRight} 35s linear infinite`,
                    "&:hover": { animationPlayState: "paused" },
                  }}
                >
                  {MARQUEE_ROW_2.map((tech, idx) => {
                    const Icon = getIcon(tech.library, tech.icon);
                    if (!Icon) return null;
                    return (
                      <Box
                        key={idx}
                        sx={{
                          flexShrink: 0,
                          mr: 1.5,
                          width: 44,
                          height: 44,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: c.iconBg,
                          border: `1px solid ${c.iconBorder}`,
                          borderRadius: "10px",
                        }}
                      >
                        <Icon
                          size={20}
                          color={
                            darkMode
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(10,31,68,0.8)"
                          }
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* 3. المساهمات (Contributions) */}
            <Box
              sx={{
                ...cardStyle,
                p: 2.5,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  bgcolor: c.iconBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: "8px",
                  px: 1.5,
                  py: 0.5,
                  mb: 3,
                  width: "fit-content",
                }}
              >
                <GitHubIcon sx={{ fontSize: 14, color: c.muted }} />
                <Typography
                  sx={{
                    color: c.text,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Contributions
                </Typography>
              </Box>

              {/* شبكة المساهمات */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 0.8,
                  flex: 1,
                  alignContent: "center",
                }}
              >
                {Array.from({ length: 21 }).map((_, i) => {
                  const isHigh = i % 4 === 0 || i % 7 === 0;
                  const isMed = i % 3 === 0 && !isHigh;
                  return (
                    <Box
                      key={i}
                      sx={{
                        aspectRatio: "1/1",
                        borderRadius: "3px",
                        bgcolor: isHigh
                          ? c.accent
                          : isMed
                            ? alpha(c.accent, 0.5)
                            : alpha(c.muted, 0.15),
                        border: `1px solid ${alpha(c.border, 0.5)}`,
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
