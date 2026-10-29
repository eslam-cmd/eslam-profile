"use client";
import * as React from "react";
import { Box, Container, Typography, Divider, Stack, alpha, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";

// ✅ استيراد البيانات من ملف الـ JSON الخاص بك
import skillsData from "../../../../data/skillsData.json";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

const getIcon = (library, name) => {
  if (library === "fa") return FaIcons[name];
  if (library === "si") return SiIcons[name];
  if (library === "md") return MdIcons[name];
  return undefined;
};

// ✅ خريطة الأوصاف (لأنها غير موجودة في ملف الـ JSON)
const DESCRIPTIONS = {
  "HTML": "Standard markup language for creating web pages.",
  "CSS": "Style sheet language used for describing the presentation.",
  "JavaScript": "The programming language of the web.",
  "TypeScript": "JavaScript with syntax for types.",
  "React": "A JavaScript library for building user interfaces.",
  "Next.js": "The React Framework for Production.",
  "React Native": "Build native apps with React.",
  "Expo": "Open-source platform for universal native apps.",
  "MUI": "Comprehensive library of UI tools.",
  "Tailwind": "A utility-first CSS framework.",
  "Node.js": "JavaScript runtime built on Chrome's V8.",
  "Express": "Fast, unopinionated, minimalist web framework.",
  "Nest.js": "A progressive Node.js framework.",
  "Git": "Distributed version control system.",
  "TypeORM": "ORM for TypeScript and JavaScript.",
  "Supabase": "The open source Firebase alternative.",
  "PostgreSQL": "The world's most advanced open source database.",
  "GitHub": "Where the world builds software.",
  "Postman": "API platform for building and using APIs.",
  "Zustand": "A small, fast and scalable state-management.",
  "shadcn/ui": "Beautifully designed components.",
  "Prisma": "Next-generation Node.js and TypeScript ORM.",
  "Docker": "Empowering app development for developers.",
  "Python": "High-level programming language.",
  "AWS": "Comprehensive cloud computing platform.",
  "Jest": "Delightful JavaScript Testing.",
  "Testing": "Test utilities for React.",
  "PySide6": "Python bindings for the Qt framework.",
};

// ✅ الأقسام بناءً على المهارات الموجودة في ملفك
const CATEGORIES = [
  { title: "Programming Languages", items: ["TypeScript", "JavaScript", "Python"] },
  { title: "Frontend Development", items: ["React", "Next.js", "React Native", "Expo", "MUI", "Tailwind", "Zustand", "shadcn/ui"] },
  { title: "Backend & Databases", items: ["Node.js", "Express", "Nest.js", "PostgreSQL", "Supabase", "Prisma", "TypeORM"] },
  { title: "Tools & Infrastructure", items: ["Git", "GitHub", "Docker", "AWS", "Postman", "Testing", "Jest"] },
];

export default function UsesPage({ darkMode = true }) {
  const router = useRouter();

  const c = {
    bg: darkMode ? "#050a14" : "#f8fafc",
    textPrimary: darkMode ? "#F5F5F5" : "#0A1F44",
    textMuted: darkMode ? alpha("#F5F5F5", 0.6) : alpha("#0A1F44", 0.6),
    accent: darkMode ? "#D4AF37" : "#186e96",
    accentGlow: darkMode ? "rgba(212, 175, 55, 0.12)" : "rgba(24, 110, 150, 0.08)",
    cardBg: darkMode ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
    cardBorder: darkMode ? "rgba(255,255,255,0.05)" : "rgba(24, 110, 150, 0.1)",
    iconBg: darkMode ? "rgba(255,255,255,0.04)" : "rgba(24, 110, 150, 0.06)",
    iconBorder: darkMode ? "rgba(255,255,255,0.08)" : "rgba(24, 110, 150, 0.15)",
    divider: darkMode ? "rgba(212, 175, 55, 0.15)" : "rgba(24, 110, 150, 0.15)",
    dotColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(24, 110, 150, 0.15)",
  };

  return (
    <Box
      sx={{
        bgcolor: c.bg,
        minHeight: "100vh",
        color: c.textPrimary,
        fontFamily: FONT,
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
        // ✨ خلفية منقطة ناعمة (Dot Grid) مع توهج خفيف في الزوايا
        backgroundImage: `
          radial-gradient(circle at 15% 50%, ${c.accentGlow}, transparent 40%),
          radial-gradient(circle, ${c.dotColor} 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 28px 28px",
        backgroundPosition: "center, center",
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        
        {/* زر الرجوع */}
        <Button
          onClick={() => router.back()}
          startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
          sx={{
            color: c.textMuted,
            fontWeight: 600,
            fontSize: "0.9rem",
            textTransform: "none",
            mb: 5,
            px: 2,
            py: 1,
            borderRadius: "999px",
            border: `1px solid ${c.cardBorder}`,
            bgcolor: c.cardBg,
            backdropFilter: "blur(10px)",
            transition: "background-color 0.25s ease, color 0.25s ease",
            "&:hover": {
              bgcolor: c.accentGlow,
              color: c.accent,
            },
          }}
        >
          Back
        </Button>

        {/* الهيدر الرئيسي */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              mb: 3,
              background: darkMode 
                ? "linear-gradient(90deg, #F5F5F5 0%, #D4AF37 100%)" 
                : "linear-gradient(90deg, #0A1F44 0%, #186e96 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Software I use, apps I love, and other things I recommend.
          </Typography>
          <Typography
            sx={{
              color: c.textMuted,
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.75,
              maxWidth: "680px",
              fontWeight: 400,
            }}
          >
            I get asked a lot about the tools and technologies I use to build products, stay productive, and more. Here's a big list of all of my favorite software.
          </Typography>
        </Box>

        <Divider sx={{ borderColor: c.divider, mb: 8 }} />

        {/* الأقسام */}
        <Stack spacing={10}>
          {CATEGORIES.map((category) => (
            <Box key={category.title}>
              <Typography
                sx={{
                  color: c.accent,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  mb: 4,
                  pb: 1.5,
                  borderBottom: `1px solid ${c.divider}`,
                }}
              >
                {category.title}
              </Typography>

              {/* شبكة العناصر */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: { xs: 2.5, sm: 3 },
                }}
              >
                {category.items.map((itemName) => {
                  // ✅ البحث في بيانات الـ JSON
                  const skill = skillsData.find((s) => s.title === itemName);
                  if (!skill) return null;

                  const Icon = getIcon(skill.library, skill.icon);
                  if (!Icon) return null;

                  return (
                    <Box
                      key={skill.title}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        p: 2.5,
                        borderRadius: "16px",
                        bgcolor: c.cardBg,
                        border: `1px solid ${c.cardBorder}`,
                        backdropFilter: "blur(10px)",
                        transition: "border-color 0.25s ease, background-color 0.25s ease",
                        "&:hover": {
                          borderColor: alpha(c.accent, 0.4),
                          bgcolor: alpha(c.accent, 0.03),
                        },
                      }}
                    >
                      {/* حاوية الأيقونة */}
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: c.iconBg,
                          border: `1px solid ${c.iconBorder}`,
                          borderRadius: "12px",
                        }}
                      >
                        <Icon size={24} color={darkMode ? "#fff" : c.textPrimary} />
                      </Box>

                      {/* النصوص */}
                      <Box sx={{ pt: 0.2 }}>
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: c.textPrimary,
                            mb: 0.5,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {skill.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: c.textMuted,
                            fontSize: "0.85rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {/* ✅ جلب الوصف من الخريطة */}
                          {DESCRIPTIONS[skill.title] || "Technology I use."}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}