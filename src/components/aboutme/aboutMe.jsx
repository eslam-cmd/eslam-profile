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
  Chip,
} from "@mui/material";
import { Code, School, Person, Work, EmojiEmotions } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactPage from "../contactpage/ContactPage";
import { keyframes } from "@mui/system";

// تأثيرات حركية ناعمة
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export default function AboutPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [contactOpen, setContactOpen] = React.useState(false);
  const [visibleSections, setVisibleSections] = React.useState({
    about: false,
    experience: false,
    education: false,
    contact: false,
  });
  const sectionRefs = {
    about: React.useRef(null),
    experience: React.useRef(null),
    education: React.useRef(null),
    contact: React.useRef(null),
  };

  const colors = {
    primary: isDark ? "#D4AF37" : "#186e96",
    text: isDark ? "#F5F5F5" : "#1A1A2E",
    textMuted: isDark ? alpha("#F5F5F5", 0.7) : alpha("#1A1A2E", 0.7),
    cardBg: isDark
      ? "linear-gradient(145deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))"
      : "linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(230, 240, 246, 0.85))",
    sectionBg: isDark
      ? "linear-gradient(145deg, rgba(10, 31, 68, 0.7), rgba(26, 26, 46, 0.7))"
      : "linear-gradient(145deg, rgba(240, 246, 250, 0.8), rgba(220, 235, 245, 0.8))",
    border: isDark ? alpha("#D4AF37", 0.2) : alpha("#186e96", 0.2),
  };

  React.useEffect(() => {
    const observers = Object.entries(sectionRefs).map(([key, ref]) => {
      if (!ref.current) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({
                ...prev,
                [key]: true,
              }));
            }
          });
        },
        { 
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px"
        }
      );
      
      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  const experience = [
    {
      title: "Frontend Developer (Internship)",
      company: "Local Tech Projects",
      period: "2024",
      description:
        "Developed 3 responsive web apps using React & TypeScript, reducing load time by 40% through code splitting and lazy loading. Integrated REST APIs for real-time dashboards serving 200+ daily users.",
      icon: <Code />,
    },
  ];

  const education = [
    {
      degree: "Diploma in Computer Science",
      institution: "The Higher Institute of Computer Science",
      period: "2025 - Expected Graduation: 2026",
      description:
        "Studying software engineering fundamentals, web and mobile development, and database systems.",
      icon: <School />,
    },
  ];

  return (
    <Box id="about" sx={{ minHeight: "100vh", pt: { xs: 8, md: 12 }, pb: 8 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* ===== About Section ===== */}
        <Box ref={sectionRefs.about}>
          <Fade 
            in={visibleSections.about} 
            timeout={800}
            style={{ transitionDelay: "0ms" }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 6 },
                mb: { xs: 6, md: 10 },
                borderRadius: 4,
                background: colors.sectionBg,
                backdropFilter: "blur(12px)",
                border: `1px solid ${colors.border}`,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: alpha(colors.primary, 0.4),
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${alpha(
                    colors.primary,
                    0.1
                  )} 0%, transparent 70%)`,
                  zIndex: 0,
                  animation: `${float} 8s ease-in-out infinite`,
                }}
              />

              <Box position="relative" zIndex={1}>
                <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
                  <Chip
                    icon={<Person sx={{ fontSize: 16, color: colors.primary }} />}
                    label="ABOUT ME"
                    sx={{
                      bgcolor: alpha(colors.primary, 0.08),
                      color: colors.primary,
                      border: `1px solid ${alpha(colors.primary, 0.15)}`,
                      fontWeight: 600,
                      letterSpacing: "2px",
                      fontSize: "10px",
                      mb: { xs: 1.5, md: 2 },
                    }}
                  />
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      color: colors.primary,
                      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    About Me
                  </Typography>
                </Box>

                <Grid container spacing={3} alignItems="center" justifyContent="center">
                  <Grid item xs={12} md={10} lg={9}>
                    <Box sx={{ maxWidth: "900px", mx: "auto" }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                          lineHeight: { xs: 1.8, md: 1.9 },
                          color: colors.text,
                          textAlign: "justify",
                          fontFamily: "'Inter', sans-serif",
                          mb: 2,
                          px: { xs: 0, sm: 2 },
                        }}
                      >
                        Self-taught Full-Stack Developer with a passion for building
                        practical, high-performance web applications. Over the past
                        3 years, I've built and deployed 3 projects using React,
                        Next.js, Node.js, and PostgreSQL — including a secure
                        authentication system (DevEngine Auth) and a student
                        management platform with role-based dashboards.
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                          lineHeight: { xs: 1.8, md: 1.9 },
                          color: colors.textMuted,
                          textAlign: "justify",
                          fontFamily: "'Inter', sans-serif",
                          px: { xs: 0, sm: 2 },
                        }}
                      >
                        Currently expanding into cloud infrastructure (Docker, AWS) and
                        seeking opportunities to contribute to real-world products.
                        Open to remote roles and relocation to Canada. My approach 
                        combines technical expertise with creative problem-solving 
                        to deliver exceptional user experiences that drive business growth.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Fade>
        </Box>

        <Divider sx={{ borderColor: colors.border, my: { xs: 4, md: 5 } }} />

        {/* ===== Experience & Education ===== */}
        <Grid container spacing={6} sx={{ mb: { xs: 6, md: 10 } }}>
          {/* Experience */}
          <Grid item xs={12} lg={6}>
            <Box ref={sectionRefs.experience}>
              <Fade 
                in={visibleSections.experience} 
                timeout={800}
                style={{ transitionDelay: "100ms" }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                    <Work sx={{ color: colors.primary, fontSize: 32 }} />
                    <Typography
                      variant="h3"
                      sx={{
                        color: colors.primary,
                        fontWeight: 700,
                        fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem" },
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Experience
                    </Typography>
                  </Box>

                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        left: 20,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: `linear-gradient(to bottom, ${colors.primary}44, transparent)`,
                        zIndex: 0,
                      }}
                    />

                    {experience.map((exp, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          pl: 6,
                          mb: 4,
                          zIndex: 1,
                          animation: visibleSections.experience 
                            ? `${fadeInUp} 0.8s ease ${index * 0.15}s both`
                            : "none",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 8,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: alpha(colors.primary, 0.08),
                            border: `2px solid ${colors.primary}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: colors.primary,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                              backgroundColor: alpha(colors.primary, 0.15),
                            },
                          }}
                        >
                          {exp.icon}
                        </Box>

                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 2.5, sm: 3 },
                            borderRadius: 3,
                            background: colors.cardBg,
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${colors.border}`,
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              transform: "translateX(4px)",
                              borderColor: alpha(colors.primary, 0.4),
                              boxShadow: `0 8px 30px ${alpha(colors.primary, 0.05)}`,
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: colors.primary,
                              fontWeight: 700,
                              mb: 0.5,
                              fontSize: { xs: "1rem", sm: "1.1rem" },
                            }}
                          >
                            {exp.title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ 
                              color: colors.textMuted, 
                              mb: 1.5, 
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            }}
                          >
                            {exp.company} • {exp.period}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: colors.textMuted, 
                              lineHeight: 1.8,
                              fontSize: "0.9rem",
                            }}
                          >
                            {exp.description}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* Education */}
          <Grid item xs={12} lg={6}>
            <Box ref={sectionRefs.education}>
              <Fade 
                in={visibleSections.education} 
                timeout={800}
                style={{ transitionDelay: "200ms" }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                    <School sx={{ color: colors.primary, fontSize: 32 }} />
                    <Typography
                      variant="h3"
                      sx={{
                        color: colors.primary,
                        fontWeight: 700,
                        fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem" },
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Education
                    </Typography>
                  </Box>

                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        left: 20,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: `linear-gradient(to bottom, ${colors.primary}44, transparent)`,
                        zIndex: 0,
                      }}
                    />

                    {education.map((edu, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          pl: 6,
                          mb: 4,
                          zIndex: 1,
                          animation: visibleSections.education 
                            ? `${fadeInUp} 0.8s ease ${index * 0.15 + 0.15}s both`
                            : "none",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 8,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: alpha(colors.primary, 0.08),
                            border: `2px solid ${colors.primary}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: colors.primary,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                              backgroundColor: alpha(colors.primary, 0.15),
                            },
                          }}
                        >
                          {edu.icon}
                        </Box>

                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 2.5, sm: 3 },
                            borderRadius: 3,
                            background: colors.cardBg,
                            backdropFilter: "blur(10px)",
                            border: `1px solid ${colors.border}`,
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            "&:hover": {
                              transform: "translateX(4px)",
                              borderColor: alpha(colors.primary, 0.4),
                              boxShadow: `0 8px 30px ${alpha(colors.primary, 0.05)}`,
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: colors.primary,
                              fontWeight: 700,
                              mb: 0.5,
                              fontSize: { xs: "1rem", sm: "1.1rem" },
                            }}
                          >
                            {edu.degree}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ 
                              color: colors.textMuted, 
                              mb: 1.5, 
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            }}
                          >
                            {edu.institution} • {edu.period}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: colors.textMuted, 
                              lineHeight: 1.8,
                              fontSize: "0.9rem",
                            }}
                          >
                            {edu.description}
                          </Typography>
                        </Paper>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: colors.border, my: { xs: 4, md: 5 } }} />

        {/* ===== Contact Section ===== */}
        <Box ref={sectionRefs.contact}>
          <Fade 
            in={visibleSections.contact} 
            timeout={800}
            style={{ transitionDelay: "300ms" }}
          >
            <Box id="contact-section">
              <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
                <Chip
                  icon={<EmojiEmotions sx={{ fontSize: 16, color: colors.primary }} />}
                  label="GET IN TOUCH"
                  sx={{
                    bgcolor: alpha(colors.primary, 0.08),
                    color: colors.primary,
                    border: `1px solid ${alpha(colors.primary, 0.15)}`,
                    fontWeight: 600,
                    letterSpacing: "2px",
                    fontSize: "10px",
                    mb: { xs: 1.5, md: 2 },
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: colors.primary,
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Let's Connect <LocalPhoneIcon sx={{ fontSize: { xs: 26, md: 36 } }} />
                </Typography>
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4, md: 7 },
                  borderRadius: 4,
                  background: colors.sectionBg,
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${colors.border}`,
                  textAlign: "center",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: alpha(colors.primary, 0.4),
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ 
                    mb: 2, 
                    color: colors.primary, 
                    fontWeight: 700,
                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                  }}
                >
                  Ready to start your next project?
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ 
                    mb: 4, 
                    color: colors.text, 
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                    maxWidth: "600px",
                    mx: "auto",
                    lineHeight: 1.8,
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  I'm always interested in new opportunities and challenging
                  projects. Let's discuss how we can work together to bring your
                  ideas to life.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => setContactOpen(true)}
                  sx={{
                    px: { xs: 4, sm: 5, md: 6 },
                    py: { xs: 1.5, sm: 1.6, md: 1.8 },
                    borderRadius: "30px",
                    background: colors.primary,
                    color: isDark ? "#0A1F44" : "#ffffff",
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: `0 4px 20px ${alpha(colors.primary, 0.25)}`,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: colors.primary,
                      transform: "translateY(-3px) scale(1.02)",
                      boxShadow: `0 8px 35px ${alpha(colors.primary, 0.35)}`,
                    },
                  }}
                >
                  Get In Touch
                </Button>
              </Paper>
            </Box>
          </Fade>
        </Box>
      </Container>

      <ContactPage open={contactOpen} onClose={() => setContactOpen(false)} />
    </Box>
  );
}