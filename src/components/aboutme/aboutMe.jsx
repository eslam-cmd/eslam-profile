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

import { School, Person, EmojiEmotions } from "@mui/icons-material";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactPage from "../contactpage/ContactPage";
import { keyframes } from "@mui/system";

// ============================================================
// Animations
// ============================================================

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-6px);
  }
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ============================================================
// Page
// ============================================================

export default function AboutPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [contactOpen, setContactOpen] = React.useState(false);

  const [visibleSections, setVisibleSections] = React.useState({
    about: false,
    education: false,
    contact: false,
  });

  const sectionRefs = {
    about: React.useRef(null),
    education: React.useRef(null),
    contact: React.useRef(null),
  };

  // ==========================================================
  // Theme colors
  // ==========================================================

  const colors = {
    primary: isDark ? "#D4AF37" : "#186E96",

    text: isDark ? "#F5F5F5" : "#1A1A2E",

    textMuted: isDark ? alpha("#F5F5F5", 0.7) : alpha("#1A1A2E", 0.7),

    cardBg: isDark
      ? "linear-gradient(145deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))"
      : "linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(230, 240, 246, 0.85))",

    sectionBg: isDark
      ? "linear-gradient(145deg, rgba(10, 31, 68, 0.7), rgba(26, 26, 46, 0.7))"
      : "linear-gradient(145deg, rgba(240, 246, 250, 0.8), rgba(220, 235, 245, 0.8))",

    border: isDark ? alpha("#D4AF37", 0.2) : alpha("#186E96", 0.2),
  };

  // ==========================================================
  // Education
  // ==========================================================

  const education = [
    {
      degree: "Vocational High School Diploma in Computer Studies",

      institution:
        "Directorate of Education — Vocational & Technical Education",

      period: "2023 – 2026",

      description:
        "Studied core computer science concepts and practical computing, with a focus on programming fundamentals, databases, networking, and software development.",

      icon: <School />,
    },
  ];

  // ==========================================================
  // Intersection Observer
  // ==========================================================

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
          rootMargin: "0px 0px -50px 0px",
        },
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

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <Box
      id="about"
      sx={{
        minHeight: "100vh",
        pt: { xs: 8, md: 12 },
        pb: 8,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* ==================================================
            ABOUT
        ================================================== */}

        <Box ref={sectionRefs.about}>
          <Fade
            in={visibleSections.about}
            timeout={800}
            style={{
              transitionDelay: "0ms",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 3,
                  sm: 4,
                  md: 6,
                },

                mb: {
                  xs: 6,
                  md: 10,
                },

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
              {/* Decorative element */}

              <Box
                sx={{
                  position: "absolute",

                  top: -60,
                  right: -60,

                  width: 120,
                  height: 120,

                  borderRadius: "50%",

                  background: `radial-gradient(
                    circle,
                    ${alpha(colors.primary, 0.1)} 0%,
                    transparent 70%
                  )`,

                  zIndex: 0,

                  animation: `${float} 8s ease-in-out infinite`,
                }}
              />

              <Box position="relative" zIndex={1}>
                {/* Heading */}

                <Box
                  sx={{
                    textAlign: "center",
                    mb: {
                      xs: 3,
                      md: 4,
                    },
                  }}
                >
                  <Chip
                    icon={
                      <Person
                        sx={{
                          fontSize: 16,
                          color: colors.primary,
                        }}
                      />
                    }
                    label="ABOUT ME"
                    sx={{
                      bgcolor: alpha(colors.primary, 0.08),

                      color: colors.primary,

                      border: `1px solid ${alpha(colors.primary, 0.15)}`,

                      fontWeight: 600,

                      letterSpacing: "2px",

                      fontSize: "10px",

                      mb: {
                        xs: 1.5,
                        md: 2,
                      },
                    }}
                  />

                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,

                      color: colors.primary,

                      fontSize: {
                        xs: "1.8rem",
                        sm: "2.2rem",
                        md: "2.8rem",
                      },

                      fontFamily: "'Inter', sans-serif",

                      letterSpacing: "-0.02em",
                    }}
                  >
                    About Me
                  </Typography>
                </Box>

                {/* Content */}

                <Grid container justifyContent="center">
                  <Grid item xs={12} md={10} lg={9}>
                    <Box
                      sx={{
                        maxWidth: "900px",
                        mx: "auto",
                      }}
                    >
                      {/* Main professional introduction */}

                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: {
                            xs: "0.95rem",
                            sm: "1rem",
                            md: "1.05rem",
                          },

                          lineHeight: {
                            xs: 1.8,
                            md: 1.9,
                          },

                          color: colors.text,

                          textAlign: "left",

                          fontFamily: "'Inter', sans-serif",

                          mb: 2,

                          px: {
                            xs: 0,
                            sm: 2,
                          },
                        }}
                      >
                        I’m a Full-Stack Developer focused on building modern
                        web applications with a strong interest in backend
                        engineering, application security, and reliable system
                        architecture.
                      </Typography>

                      {/* Technical profile */}

                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: {
                            xs: "0.95rem",
                            sm: "1rem",
                            md: "1.05rem",
                          },

                          lineHeight: {
                            xs: 1.8,
                            md: 1.9,
                          },

                          color: colors.textMuted,

                          textAlign: "left",

                          fontFamily: "'Inter', sans-serif",

                          mb: 2,

                          px: {
                            xs: 0,
                            sm: 2,
                          },
                        }}
                      >
                        My work spans the full development lifecycle, from
                        designing responsive interfaces with React, Next.js, and
                        TypeScript to developing structured backend systems with
                        Node.js, Express, NestJS, PostgreSQL, and Prisma.
                      </Typography>

                      {/* Security / engineering approach */}

                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: {
                            xs: "0.95rem",
                            sm: "1rem",
                            md: "1.05rem",
                          },

                          lineHeight: {
                            xs: 1.8,
                            md: 1.9,
                          },

                          color: colors.textMuted,

                          textAlign: "left",

                          fontFamily: "'Inter', sans-serif",

                          px: {
                            xs: 0,
                            sm: 2,
                          },
                        }}
                      >
                        I pay particular attention to authentication,
                        authorization, database design, session security, rate
                        limiting, OTP/MFA flows, and defensive application
                        design. My goal is to build software that is not only
                        functional, but also maintainable, secure, and
                        dependable in real-world use.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Fade>
        </Box>

        {/* ==================================================
            DIVIDER
        ================================================== */}

        <Divider
          sx={{
            borderColor: colors.border,

            my: {
              xs: 4,
              md: 5,
            },
          }}
        />

        {/* ==================================================
            EDUCATION
        ================================================== */}

        <Grid
          container
          spacing={6}
          sx={{
            mb: {
              xs: 6,
              md: 10,
            },
          }}
        >
          <Grid item xs={12} lg={6}>
            <Box ref={sectionRefs.education}>
              <Fade
                in={visibleSections.education}
                timeout={800}
                style={{
                  transitionDelay: "200ms",
                }}
              >
                <Box>
                  {/* Section heading */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 4,
                    }}
                  >
                    <School
                      sx={{
                        color: colors.primary,
                        fontSize: 32,
                      }}
                    />

                    <Typography
                      variant="h3"
                      sx={{
                        color: colors.primary,

                        fontWeight: 700,

                        fontSize: {
                          xs: "1.6rem",
                          sm: "1.8rem",
                          md: "2.2rem",
                        },

                        fontFamily: "'Inter', sans-serif",

                        letterSpacing: "-0.02em",
                      }}
                    >
                      Education
                    </Typography>
                  </Box>

                  {/* Timeline */}

                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",

                        left: 20,

                        top: 0,
                        bottom: 0,

                        width: 2,

                        background: `linear-gradient(
                          to bottom,
                          ${colors.primary}44,
                          transparent
                        )`,

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
                            ? `${fadeInUp} 0.8s ease ${
                                index * 0.15 + 0.15
                              }s both`
                            : "none",
                        }}
                      >
                        {/* Timeline icon */}

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

                        {/* Education card */}

                        <Paper
                          elevation={0}
                          sx={{
                            p: {
                              xs: 2.5,
                              sm: 3,
                            },

                            borderRadius: 3,

                            background: colors.cardBg,

                            backdropFilter: "blur(10px)",

                            border: `1px solid ${colors.border}`,

                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

                            "&:hover": {
                              transform: "translateX(4px)",

                              borderColor: alpha(colors.primary, 0.4),

                              boxShadow: `0 8px 30px ${alpha(
                                colors.primary,
                                0.05,
                              )}`,
                            },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: colors.primary,

                              fontWeight: 700,

                              mb: 0.5,

                              fontSize: {
                                xs: "1rem",
                                sm: "1.1rem",
                              },
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

        {/* ==================================================
            DIVIDER
        ================================================== */}

        <Divider
          sx={{
            borderColor: colors.border,

            my: {
              xs: 4,
              md: 5,
            },
          }}
        />

        {/* ==================================================
            CONTACT
        ================================================== */}

        <Box ref={sectionRefs.contact}>
          <Fade
            in={visibleSections.contact}
            timeout={800}
            style={{
              transitionDelay: "300ms",
            }}
          >
            <Box id="contact-section">
              {/* Heading */}

              <Box
                sx={{
                  textAlign: "center",

                  mb: {
                    xs: 3,
                    md: 4,
                  },
                }}
              >
                <Chip
                  icon={
                    <EmojiEmotions
                      sx={{
                        fontSize: 16,
                        color: colors.primary,
                      }}
                    />
                  }
                  label="GET IN TOUCH"
                  sx={{
                    bgcolor: alpha(colors.primary, 0.08),

                    color: colors.primary,

                    border: `1px solid ${alpha(colors.primary, 0.15)}`,

                    fontWeight: 600,

                    letterSpacing: "2px",

                    fontSize: "10px",

                    mb: {
                      xs: 1.5,
                      md: 2,
                    },
                  }}
                />

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,

                    color: colors.primary,

                    fontSize: {
                      xs: "1.8rem",
                      sm: "2.2rem",
                      md: "2.8rem",
                    },

                    fontFamily: "'Inter', sans-serif",

                    letterSpacing: "-0.02em",
                  }}
                >
                  Let's Work Together{" "}
                  <LocalPhoneIcon
                    sx={{
                      fontSize: {
                        xs: 26,
                        md: 36,
                      },
                    }}
                  />
                </Typography>
              </Box>

              {/* Contact card */}

              <Paper
                elevation={0}
                sx={{
                  p: {
                    xs: 3,
                    sm: 4,
                    md: 7,
                  },

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

                    fontSize: {
                      xs: "1.2rem",
                      sm: "1.4rem",
                      md: "1.6rem",
                    },
                  }}
                >
                  Have a project in mind?
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,

                    color: colors.text,

                    fontSize: {
                      xs: "0.95rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },

                    maxWidth: "650px",

                    mx: "auto",

                    lineHeight: 1.8,

                    px: {
                      xs: 1,
                      sm: 2,
                    },
                  }}
                >
                  I’m open to discussing software projects, development
                  opportunities, and ideas that can be turned into practical
                  digital products.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => setContactOpen(true)}
                  sx={{
                    px: {
                      xs: 5,
                      sm: 6,
                      md: 7,
                    },

                    py: {
                      xs: 1.6,
                      sm: 1.8,
                      md: 2.2,
                    },

                    minHeight: {
                      xs: 52,
                      sm: 56,
                      md: 62,
                    },

                    minWidth: {
                      xs: 220,
                      sm: 240,
                      md: 260,
                    },

                    borderRadius: "30px",

                    background: colors.primary,

                    color: isDark ? "#0A1F44" : "#ffffff",

                    fontSize: {
                      xs: "1rem",
                      sm: "1.05rem",
                      md: "1.15rem",
                    },

                    fontWeight: 700,

                    textTransform: "none",

                    letterSpacing: "-0.01em",

                    boxShadow: `0 4px 20px ${alpha(colors.primary, 0.25)}`,

                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

                    "&:hover": {
                      background: colors.primary,

                      transform: "translateY(-3px) scale(1.02)",

                      boxShadow: `0 8px 35px ${alpha(colors.primary, 0.35)}`,
                    },

                    "@media (max-width: 390px)": {
                      minWidth: 200,

                      width: "100%",

                      maxWidth: 260,
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

      {/* ====================================================
          Contact Modal
      ==================================================== */}

      <ContactPage open={contactOpen} onClose={() => setContactOpen(false)} />
    </Box>
  );
}
