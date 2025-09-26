"use client";
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Button,
  IconButton,
  alpha,
} from "@mui/material";
import {
  Code,
  DesignServices,
  Storage,
  Security,
  RocketLaunch,
  Psychology,
  Groups,
  EmojiEvents,
  School,
  Work,
  LocationOn,
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Twitter,
  Facebook,
  Download,
  ArrowDownward,
} from "@mui/icons-material";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from '@mui/icons-material/Home';
export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const isDark = theme.palette.mode === "dark";

  const primaryColor = isDark ? "#D4AF37" : "#D4AF37";
  const secondaryColor = isDark ? "#0A1F44" : "#0A1F44";
  const textColor = isDark ? "#ffffff" : "#ffffff";

  const skills = [
    {
      icon: <Code />,
      name: "Frontend",
      technologies: [
        "React",
        "Next.js",
        "React Native",
        "TypeScript",
        "Material-UI",
        "Tailwind CSS",
      ],
      color: isDark ? "#FFD93D" : "#F59E0B",
    },
    {
      icon: <Storage />,
      name: "Backend",
      technologies: ["Node.js", "Express", "Supabase", "PostgreSQL", "REST API"],
      color: isDark ? "#6EE7B7" : "#10B981",
    },

    {
      icon: <RocketLaunch />,
      name: "DevOps",
      technologies: ["Git", "Linux", "Vercel", "Docker (Basics)"],
      color: isDark ? "#A78BFA" : "#8B5CF6",
    },
    {
      icon: <Psychology />,
      name: "Soft Skills",
      technologies: [
        "Problem Solving",
        "Time Management",
        "Communication",
        "Self-Learning",
        "Adaptability",
      ],
      color: isDark ? "#FBBF24" : "#F59E0B",
    },
  ];

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

  const handleDownloadCV = () => {
    // Logic for downloading CV
    console.log("Downloading CV...");
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // الحصول على لون التدرج للخلفية
  const getGradientBackground = (color1, color2) => {
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: getGradientBackground(
          isDark ? "#0A1F44" : "#0A1F44",
          isDark ? "#1a1a2e" : "#1a1a2e"
        ),
        pt: { xs: 8, md: 12 },
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Hero Section */}
        <Fade in timeout={800}>
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 6, md: 10 },
              position: "relative",
            }}
          >
            {/* Animated Background Elements */}
            <Box
              sx={{
                position: "absolute",
                top: -100,
                right: -100,
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(
                  primaryColor,
                  0.1
                )} 0%, transparent 70%)`,
                animation: "float 6s ease-in-out infinite",
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <Avatar
                src="/logo/my-photo2.jpg"
                sx={{
                  width: { xs: 120, sm: 150, md: 180 },
                  height: { xs: 120, sm: 150, md: 180 },
                  mx: "auto",
                  mb: 4,
                  border: `4px solid ${primaryColor}`,
                  boxShadow: `0 8px 32px ${alpha(primaryColor, 0.3)}`,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

              <Typography
                variant="h1"
                sx={{
                  fontWeight: "bold",
                  background: getGradientBackground(
                    primaryColor,
                    isDark ? "#FFD700" : "#FFD700"
                  ),
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  lineHeight: 1.2,
                }}
              >
                Islam Hadaya
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: alpha(textColor, 0.8),
                  mb: 4,
                  fontWeight: 300,
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                }}
              >
                <TypeAnimation
                  sequence={[
                    "Software engneer 💻",
                    2000,
                    "Problem Solver 🔧",
                    2000,
                    "Tech Innovator 🚀",
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{ display: "inline-block" }}
                />
              </Typography>

              {/* Stats Grid */}

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={handleDownloadCV}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "25px",
                    background: getGradientBackground(
                      primaryColor,
                      isDark ? "#B8860B" : "#B8860B"
                    ),
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                    boxShadow: `0 4px 15px ${alpha(primaryColor, 0.3)}`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 20px ${alpha(primaryColor, 0.4)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Download CV
                </Button>

                <Button
                  variant="outlined"
                  endIcon={<ArrowDownward />}
                  onClick={scrollToContact}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "25px",
                    borderColor: primaryColor,
                    color: primaryColor,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: primaryColor,
                      backgroundColor: alpha(primaryColor, 0.1),
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Contact Me
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<HomeIcon />}
                  href="/"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "25px",
                    borderColor: primaryColor,
                    color: primaryColor,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: primaryColor,
                      backgroundColor: alpha(primaryColor, 0.1),
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  GO TO HOME page
                </Button>
              </Box>

              {/* Social Links */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  mt: 4,
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    icon: <Email />,
                    href: "mailto:hdayaaslam34@gmail.com",
                    color: "#EA4335",
                  },
                  {
                    icon: <LinkedIn />,
                    href: "https://www.linkedin.com/in/Islam-hadaya",
                    color: "#0A66C2",
                  },
                  {
                    icon: <GitHub />,
                    href: "https://github.com/eslam-cmd",
                    color: isDark ? "#ffffff" : "#000000",
                  },
                  {
                    icon: <Twitter />,
                    href: "https://x.com/eslam_hadaya",
                    color: "#1DA1F2",
                  },
                  {
                    icon: <Facebook />,
                    href: "https://www.facebook.com/islam.hadaya.2025",
                    color: "#1877F2",
                  },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    target="_blank"
                    sx={{
                      color: social.color,
                      backgroundColor: alpha(social.color, 0.1),
                      "&:hover": {
                        backgroundColor: alpha(social.color, 0.2),
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* About Section */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              mb: { xs: 6, md: 10 },
              borderRadius: 4,
              background: isDark
                ? "linear-gradient(135deg, rgba(10, 31, 68, 0.8), rgba(26, 26, 46, 0.8))"
                : "linear-gradient(135deg, rgba(10, 31, 68, 0.8), rgba(26, 26, 46, 0.8))",
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(primaryColor, 0.2)}`,
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
                  primaryColor,
                  0.1
                )} 0%, transparent 70%)`,
                zIndex: 0,
              }}
            />

            <Box position="relative" zIndex={1}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: primaryColor,
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
                      color: textColor,
                      mb: 3,
                    }}
                  >
                    I am Islam Hidaya, and I work on developing websites and
                    mobile applications that combine speed, simplicity, and ease
                    of use. I offer practical digital solutions that suit the
                    needs of individuals and institutions, with a focus on high
                    performance and a comfortable user experience. On my
                    website, you will find samples of the work I have completed,
                    so you can get to know my working style and the quality of
                    execution, and choose what suits you for your next project.
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "1.1rem",
                      lineHeight: 1.8,
                      color: textColor,
                    }}
                  >
                    My approach combines technical expertise with creative
                    problem-solving to deliver exceptional user experiences that
                    drive business growth.
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 2,
                    }}
                  >
                    {[
                      { label: "Frontend", value: "95%", color: "#F59E0B" },
                      { label: "Backend", value: "90%", color: "#10B981" },
                      { label: "DevOps", value: "80%", color: "#8B5CF6" },
                    ].map((skill, index) => (
                      <Box
                        key={index}
                        sx={{
                          textAlign: "center",
                          p: 2,
                          borderRadius: 3,
                          backgroundColor: alpha(skill.color, 0.1),
                          border: `1px solid ${alpha(skill.color, 0.2)}`,
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: "bold",
                            color: skill.color,
                            mb: 1,
                          }}
                        >
                          {skill.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: textColor,
                            fontWeight: 600,
                          }}
                        >
                          {skill.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>

        {/* Skills Section */}
        <Fade in timeout={1200}>
          <Box sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: primaryColor,
                mb: 6,
                fontSize: { xs: "2rem", md: "2.5rem" },
                textAlign: "center",
              }}
            >
              Technical Expertise
            </Typography>

            <Grid container spacing={3}>
              {skills.map((skill, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      background: isDark
                        ? "linear-gradient(135deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))"
                        : "linear-gradient(135deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${alpha(skill.color, 0.3)}`,
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 40px ${alpha(skill.color, 0.2)}`,
                        borderColor: skill.color,
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 4 }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          p: 2,
                          mb: 3,
                          borderRadius: "50%",
                          backgroundColor: alpha(skill.color, 0.1),
                          color: skill.color,
                          fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                      >
                        {skill.icon}
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          mb: 3,
                          color: skill.color,
                          fontWeight: "bold",
                        }}
                      >
                        {skill.name}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "center",
                        }}
                      >
                        {skill.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: alpha(skill.color, 0.1),
                              color: skill.color,
                              border: `1px solid ${alpha(skill.color, 0.3)}`,
                              fontWeight: 600,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Experience & Education */}
        <Fade in timeout={1400}>
          <Grid container spacing={6} sx={{ mb: { xs: 6, md: 10 } }}>
            <Grid item xs={12} lg={6}>
              <Typography
                variant="h3"
                sx={{
                  mb: 4,
                  color: primaryColor,
                  fontWeight: "bold",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                }}
              >
                💼 Experience
              </Typography>

              <Box sx={{ position: "relative" }}>
                {/* Timeline */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 20,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(to bottom, ${primaryColor}, transparent)`,
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
                        backgroundColor: alpha(primaryColor, 0.1),
                        border: `2px solid ${primaryColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      {exp.icon}
                    </Box>

                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: isDark
                          ? "linear-gradient(135deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))"
                          : "linear-gradient(135deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${alpha(primaryColor, 0.2)}`,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: primaryColor,
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        {exp.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: alpha(textColor, 0.7),
                          mb: 2,
                          fontWeight: 600,
                        }}
                      >
                        {exp.company} • {exp.period}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha(textColor, 0.8),
                          lineHeight: 1.6,
                        }}
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
                  color: primaryColor,
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
                    background: `linear-gradient(to bottom, ${primaryColor}, transparent)`,
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
                        backgroundColor: alpha(primaryColor, 0.1),
                        border: `2px solid ${primaryColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: primaryColor,
                      }}
                    >
                      {edu.icon}
                    </Box>

                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: isDark
                          ? "linear-gradient(135deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))"
                          : "linear-gradient(135deg, rgba(26, 43, 77, 0.8), rgba(10, 31, 68, 0.8))",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${alpha(primaryColor, 0.2)}`,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: primaryColor,
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      >
                        {edu.degree}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: alpha(textColor, 0.7),
                          mb: 2,
                          fontWeight: 600,
                        }}
                      >
                        {edu.institution} • {edu.period}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha(textColor, 0.8),
                          lineHeight: 1.6,
                        }}
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

        {/* Contact Section */}
        <Fade in timeout={1800}>
          <Box id="contact">
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: primaryColor,
                mb: 4,
                fontSize: { xs: "2rem", md: "2.5rem" },
                textAlign: "center",
              }}
            >
            
              Let's Connect
                <LocalPhoneIcon  fontSize="10px"/>
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                background: isDark
                  ? "linear-gradient(135deg, rgba(10, 31, 68, 0.8), rgba(26, 26, 46, 0.8))"
                  : "linear-gradient(135deg, rgba(10, 31, 68, 0.8), rgba(26, 26, 46, 0.8))",
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(primaryColor, 0.2)}`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  color: textColor,
                  fontWeight: "bold",
                }}
              >
                Ready to start your next project?
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: alpha(textColor, 0.8),
                  fontSize: "1.1rem",
                }}
              >
                I'm always interested in new opportunities and challenging
                projects. Let's discuss how we can work together to bring your
                ideas to life.
              </Typography>
              <Link href="/contact">
                <Button
                  variant="contained"
                  href="mailto:hdayaaslam34@gmail.com"
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: "25px",
                    background: getGradientBackground(
                      primaryColor,
                      isDark ? "#B8860B" : "#B8860B"
                    ),
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    boxShadow: `0 4px 15px ${alpha(primaryColor, 0.3)}`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 6px 20px ${alpha(primaryColor, 0.4)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get In Touch
                </Button>
              </Link>
            </Paper>
          </Box>
        </Fade>

        {/* Global Styles */}
        <style jsx global>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          @keyframes glow {
            0% {
              box-shadow: 0 0 20px ${alpha(primaryColor, 0.3)};
            }
            50% {
              box-shadow: 0 0 40px ${alpha(primaryColor, 0.5)};
            }
            100% {
              box-shadow: 0 0 20px ${alpha(primaryColor, 0.3)};
            }
          }
        `}</style>
      </Container>
    </Box>
  );
}
