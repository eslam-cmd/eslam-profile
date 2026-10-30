"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Fade,
  Button,
  alpha,
} from "@mui/material";
import { School, Code, Shield } from "@mui/icons-material";
import ContactPage from "../contactpage/Contactpage";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

// ───── مكون الظهور عند التمرير ─────
function Reveal({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref}>
      <Fade in={visible} timeout={700} style={{ transitionDelay: `${delay}ms` }}>
        <Box>{children}</Box>
      </Fade>
    </Box>
  );
}

const education = [
  {
    degree: "Vocational High School Diploma in Computer Studies",
    institution: "Directorate of Education — Vocational & Technical Education",
    period: "2023 – 2026",
    description:
      "Studied core computer science concepts and practical computing, with a focus on programming fundamentals, databases, networking, and software development.",
  },
];

const aboutParagraphs = [
  "I’m a Full-Stack Developer focused on building modern web applications with a strong interest in backend engineering, application security, and reliable system architecture.",
  "My work spans the full development lifecycle, from designing responsive interfaces with React, Next.js, and TypeScript to developing structured backend systems with Node.js, Express, NestJS, PostgreSQL, and Prisma.",
  "I pay particular attention to authentication, authorization, database design, session security, rate limiting, OTP/MFA flows, and defensive application design. My goal is to build software that is not only functional, but also maintainable, secure, and dependable in real-world use.",
];

export default function AboutPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [contactOpen, setContactOpen] = React.useState(false);

  // ───── الألوان الخاصة بالعناصر فقط (بدون لون خلفية) ─────
  const colors = {
    primary: isDark ? "#D4AF37" : "#186E96",
    text: isDark ? "#F5F5F5" : "#0A1F44",
    textMuted: isDark ? alpha("#F5F5F5", 0.6) : alpha("#0A1F44", 0.6),
    cardBg: isDark ? alpha("#ffffff", 0.02) : alpha("#ffffff", 0.7),
    cardBorder: isDark ? alpha("#ffffff", 0.08) : alpha("#186e96", 0.15),
    tagBg: isDark ? alpha("#ffffff", 0.03) : alpha("#000000", 0.03),
    tagBorder: isDark ? alpha("#ffffff", 0.08) : alpha("#000000", 0.08),
    onPrimary: isDark ? "#0A1F44" : "#ffffff",
  };

  const cardStyle = {
    borderRadius: "20px",
    background: colors.cardBg,
    backdropFilter: "blur(10px)",
    border: `1px solid ${colors.cardBorder}`,
    boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.2)" : "0 8px 32px rgba(24,110,150,0.05)",
    transition: "border-color 0.3s ease",
    "&:hover": { borderColor: alpha(colors.primary, 0.3) },
    position: "relative",
    overflow: "hidden",
  };

  const heading = {
    fontFamily: FONT,
    color: colors.text,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  };

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 10 },
        fontFamily: FONT,
        // ✅ تم إزالة bgcolor و backgroundImage تماماً ليأخذ خلفية الموقع
        "& .MuiTypography-root, & .MuiButton-root": { fontFamily: FONT },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, position: "relative", zIndex: 1 }}>

        {/* ───── 1. About Me (Bento Style) ───── */}
        <Reveal>
          <Box sx={{ ...cardStyle, p: { xs: 3, sm: 4, md: 5 }, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Code sx={{ color: colors.primary, fontSize: 20 }} />
              <Typography sx={{ color: colors.primary, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                About Me
              </Typography>
            </Box>

            <Box sx={{ maxWidth: 800 }}>
              {aboutParagraphs.map((text, i) => (
                <Typography
                  key={i}
                  sx={{
                    color: i === 0 ? colors.text : colors.textMuted,
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    lineHeight: 1.8,
                    mb: i === aboutParagraphs.length - 1 ? 0 : 2,
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>
          </Box>
        </Reveal>

        {/* ───── 2. Education (Terminal/Timeline Style) ───── */}
        <Reveal delay={100}>
          <Box sx={{ ...cardStyle, p: { xs: 3, sm: 4, md: 5 }, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
              <School sx={{ color: colors.primary, fontSize: 20 }} />
              <Typography sx={{ color: colors.primary, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Education
              </Typography>
            </Box>

            <Box sx={{ position: "relative", pl: { xs: 3, sm: 4 } }}>
              {/* الخط الجانبي */}
              <Box
                sx={{
                  position: "absolute",
                  left: 6,
                  top: 10,
                  bottom: 0,
                  width: 2,
                  background: `linear-gradient(to bottom, ${alpha(colors.primary, 0.5)}, transparent)`,
                }}
              />

              {education.map((edu) => (
                <Box key={edu.degree} sx={{ position: "relative", mb: 2 }}>
                  {/* النقطة على الخط */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: -32,
                      top: 4,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      // نستخدم لون البطاقة أو الشفافية ليعطي تأثير الثقب
                      bgcolor: isDark ? "#0A1F44" : "#ffffff",
                      border: `3px solid ${colors.primary}`,
                      zIndex: 1,
                    }}
                  />

                  <Box
                    sx={{
                      p: { xs: 2.5, sm: 3 },
                      borderRadius: "12px",
                      bgcolor: colors.tagBg,
                      border: `1px solid ${colors.tagBorder}`,
                    }}
                  >
                    <Typography
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        mb: 0.5,
                      }}
                    >
                      {edu.degree}
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.primary,
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        mb: 1.5,
                      }}
                    >
                      {edu.institution} <span style={{ color: colors.textMuted }}>• {edu.period}</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: colors.textMuted,
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {edu.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>

        {/* ───── 3. Contact ───── */}
        <Reveal delay={150}>
          <Box
            id="contact-section"
            sx={{
              ...cardStyle,
              p: { xs: 4, sm: 5, md: 6 },
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* أيقونة خلفية خفيفة */}
            <Box sx={{ position: "absolute", top: -20, right: -20, opacity: 0.05 }}>
              <Shield sx={{ fontSize: 150, color: colors.primary }} />
            </Box>

            <Typography
              component="h2"
              sx={{
                ...heading,
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" },
                mb: 2,
                position: "relative",
              }}
            >
              Let's work together
            </Typography>

            <Typography
              sx={{
                color: colors.textMuted,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
                mb: 4,
                position: "relative",
              }}
            >
              I’m open to discussing software projects, development opportunities, and ideas that can be turned into practical digital products.
            </Typography>

            <Button
              variant="contained"
              onClick={() => setContactOpen(true)}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: "8px",
                bgcolor: colors.primary,
                color: colors.onPrimary,
                fontSize: "0.95rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                transition: "background-color 0.25s ease, box-shadow 0.25s ease",
                position: "relative",
                "&:hover": {
                  bgcolor: colors.primary,
                  opacity: 0.9,
                  boxShadow: `0 6px 20px ${alpha(colors.primary, 0.2)}`,
                },
              }}
            >
              Get in touch
            </Button>
          </Box>
        </Reveal>

      </Container>

      <ContactPage open={contactOpen} onClose={() => setContactOpen(false)} />
    </Box>
  );
}
