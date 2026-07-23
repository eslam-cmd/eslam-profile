"use client";
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme,
  Fade,
  Button,
  Divider,
  alpha,
} from "@mui/material";
import { Code, School } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactPage from "../contactpage/ContactPage";

export default function AboutPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [contactOpen, setContactOpen] = React.useState(false);

  // ===== Unified color system — everything derives from isDark =====
  const colors = {
    // Brand accent: gold in dark mode, blue in light mode
    primary: isDark ? "#D4AF37" : "#186e96",
    // Main body text
    text: isDark ? "#F5F5F5" : "#1A1A2E",
    // Secondary/muted text
    textMuted: isDark ? alpha("#F5F5F5", 0.7) : alpha("#1A1A2E", 0.7),
    // Card / paper backgrounds
    cardBg: isDark
      ? "linear-gradient(135deg, rgba(26, 43, 77, 0.85), rgba(10, 31, 68, 0.85))"
      : "linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(230, 240, 246, 0.85))",
    // Section/hero background — matches overall page background per mode
    sectionBg: isDark
      ? "linear-gradient(135deg, rgba(10, 31, 68, 0.85), rgba(26, 26, 46, 0.85))"
      : "linear-gradient(135deg, rgba(240, 246, 250, 0.9), rgba(220, 235, 245, 0.9))",
    border: isDark ? alpha("#D4AF37", 0.25) : alpha("#186e96", 0.25),
  };

  const experience = [
    {
      title: "Frontend Developer (Internship)",
      company: "Local Tech Projects",
      period: "2024",
      description:
        "Built responsive interfaces for local clients and integrated APIs for real-time data.",
      icon: <Code />,
    },
  ];

  const education = [
    {
      degree: "Diploma in Computer Science",
      institution: "The Higher Institute of Computer Science",
      period: "2025 - Present",
      description:
        "Studying software engineering fundamentals, web and mobile development, and database systems.",
      icon: <School />,
    },
  ];

  return (
    <Box id="contect" sx={{ minHeight: "100vh", pt: { xs: 8, md: 12 }, pb: 8 }}>
    
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* About Section */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              mb: { xs: 6, md: 10 },
              borderRadius: 4,
              background: colors.sectionBg,
              backdropFilter: "blur(10px)",
              border: `1px solid ${colors.border}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(
                  colors.primary,
                  0.15,
                )} 0%, transparent 70%)`,
                zIndex: 0,
              }}
            />

            <Box position="relative" zIndex={1}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: colors.primary,
                  mb: 4,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  textAlign: "center",
                }}
              >
                About Me
              </Typography>

              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      color: colors.text,
                      mb: 3,
                    }}
                  >
                    Self-taught Full-Stack Developer with a passion for building
                    practical, high-performance web applications. Over the past
                    3 year's, I've built and deployed 10+ projects using React,
                    Next.js, and Node.js — from weather apps to full e-commerce
                    platforms. Currently expanding into cloud infrastructure
                    (Docker, AWS) and seeking opportunities to contribute to
                    real-world products. Open to remote roles.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      color: colors.text,
                    }}
                  >
                    My approach combines technical expertise with creative
                    problem-solving to deliver exceptional user experiences that
                    drive business growth.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>

        <Divider sx={{ borderColor: colors.border, my: { xs: 4, md: 5 } }} />

        {/* Experience & Education */}
        <Fade in timeout={1400}>
          <Grid container spacing={6} sx={{ mb: { xs: 6, md: 10 } }}>
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                }}
              >
                💼 Experience
              </Typography>

              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 20,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
                    zIndex: 0,
                  }}
                />

                {experience.map((exp, index) => (
                  <Box
                    key={index}
                    sx={{ position: "relative", pl: 6, mb: 4, zIndex: 1 }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: alpha(colors.primary, 0.1),
                        border: `2px solid ${colors.primary}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.primary,
                      }}
                    >
                      {exp.icon}
                    </Box>

                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: colors.cardBg,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: colors.primary,
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        {exp.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: colors.textMuted, mb: 2, fontWeight: 600 }}
                      >
                        {exp.company} • {exp.period}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.textMuted, lineHeight: 1.6 }}
                      >
                        {exp.description}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                }}
              >
                🎓 Education
              </Typography>

              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    left: 20,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(to bottom, ${colors.primary}, transparent)`,
                    zIndex: 0,
                  }}
                />

                {education.map((edu, index) => (
                  <Box
                    key={index}
                    sx={{ position: "relative", pl: 6, mb: 4, zIndex: 1 }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: alpha(colors.primary, 0.1),
                        border: `2px solid ${colors.primary}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.primary,
                      }}
                    >
                      {edu.icon}
                    </Box>

                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: colors.cardBg,
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: colors.primary,
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        {edu.degree}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: colors.textMuted, mb: 2, fontWeight: 600 }}
                      >
                        {edu.institution} • {edu.period}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colors.textMuted, lineHeight: 1.6 }}
                      >
                        {edu.description}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Fade>

        <Divider sx={{ borderColor: colors.border, my: { xs: 4, md: 5 } }} />

        {/* Contact Section */}
        <Fade in timeout={1800}>
          <Box id="contact">
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: colors.primary,
                mb: 4,
                fontSize: { xs: "2rem", md: "2.5rem" },
                textAlign: "center",
              }}
            >
              Let's Connect <LocalPhoneIcon fontSize="medium" />
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 7 },
                borderRadius: 4,
                background: colors.sectionBg,
                backdropFilter: "blur(10px)",
                border: `1px solid ${colors.border}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, color: colors.primary, fontWeight: "bold" }}
              >
                Ready to start your next project?
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 4, color: colors.text, fontSize: "1.1rem" }}
              >
                I'm always interested in new opportunities and challenging
                projects. Let's discuss how we can work together to bring your
                ideas to life.
              </Typography>

              <Button
                variant="contained"
                onClick={() => setContactOpen(true)}
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: "25px",
                  background: colors.primary,
                  color: isDark ? "#0A1F44" : "#ffffff",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  boxShadow: `0 4px 14px ${alpha(colors.primary, 0.35)}`,
                  "&:hover": {
                    background: colors.primary,
                    transform: "translateY(-1px)",
                    boxShadow: `0 6px 15px ${alpha(colors.primary, 0.5)}`,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Get In Touch
              </Button>
            </Paper>
          </Box>
        </Fade>
      </Container>

      <ContactPage open={contactOpen} onClose={() => setContactOpen(false)} />
    </Box>
  );
}
