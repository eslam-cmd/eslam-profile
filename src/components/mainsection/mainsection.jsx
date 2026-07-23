"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TypeAnimation } from "react-type-animation";
import AppsIcon from "@mui/icons-material/Apps";
import { useTheme } from "@mui/material/styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import VerifiedIcon from "@mui/icons-material/Verified";

// استيراد أيقونات التقنيات
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiJavascript,
  SiExpress,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

export default function MainSection({ toggleTheme, darkMode }) {
  const theme = useTheme();
  const colors = {
    buttonBg: darkMode ? "#0A1F44" : "#186e96",
    buttonText: darkMode ? "#D4AF37" : "#ffff",
    avatarBorder: darkMode ? "#D4AF37" : "#186e96",
    avatarShadow: darkMode
      ? "0 6px 58px rgba(212, 175, 55, 0.3)"
      : "rgba(14, 124, 175, 1)",
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    glowColor: "#3f51b5",
  };
  const iconColors = {
    email: darkMode ? "#FFD700" : "#D4AF37",
    facebook: darkMode ? "#90CAF9" : "#1877F2",
    github: darkMode ? "#EAEAEA" : "#000",
    linkedin: darkMode ? "#64B5F6" : "#0A66C2",
    twitter: darkMode ? "#64B5F6" : "#1DA1F2",
  };

  // ألوان قوية واضحة لتظهر المربعات الخلفية بشكل ممتاز ومميز
  const bgElements = {
    color1: darkMode ? "rgba(212, 175, 55, 0.25)" : "rgba(24, 110, 150, 0.2)",
    color2: darkMode ? "rgba(10, 31, 68, 0.5)" : "rgba(144, 202, 249, 0.25)",
  };

  // مصفوفة أيقونات التقنيات مع إعداداتها
  const techIcons = [
    {
      icon: FaReact,
      color: "#61DBFB",
      size: 80,
      top: "8%",
      right: "12%",
      delay: 0,
      label: "React",
    },
    {
      icon: SiTailwindcss,
      color: "#38bdf8",
      size: 70,
      bottom: "12%",
      left: "8%",
      delay: 2,
      label: "Tailwind",
    },
    {
      icon: FaNodeJs,
      color: "#68a063",
      size: 75,
      top: "55%",
      right: "4%",
      delay: 4,
      label: "Node.js",
    },
    {
      icon: SiTypescript,
      color: "#3178c6",
      size: 65,
      top: "18%",
      left: "6%",
      delay: 1,
      label: "TypeScript",
    },
    {
      icon: SiNextdotjs,
      color: darkMode ? "#ffffff" : "#000000",
      size: 85,
      bottom: "35%",
      right: "15%",
      delay: 3,
      label: "Next.js",
    },
    {
      icon: SiJavascript,
      color: "#f7df1e",
      size: 55,
      top: "42%",
      left: "3%",
      delay: 5,
      label: "JavaScript",
    },
    {
      icon: SiExpress,
      color: darkMode ? "#ffffff" : "#000000",
      size: 60,
      bottom: "8%",
      right: "25%",
      delay: 2.5,
      label: "Express",
    },
    {
      icon: SiPostgresql,
      color: "#336791",
      size: 60,
      top: "30%",
      left: "20%",
      delay: 3.5,
      label: "PostgreSQL",
    },
  ];

  return (
    <>
      <section
        id="home"
        style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      >
        {/* المربعات الخلفية المضيئة وأيقونات التقنيات */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          {/* مربع مضيء كبير علوي يسار */}
          <Box
            className="strong-square square-1"
            sx={{
              position: "absolute",
              width: { xs: "180px", md: "300px" },
              height: { xs: "180px", md: "300px" },
              background: `linear-gradient(135deg, ${bgElements.color1} 0%, transparent 100%)`,
              top: "10%",
              left: "8%",
            }}
          />
          {/* مربع مضيء كبير سفلي يمين */}
          <Box
            className="strong-square square-2"
            sx={{
              position: "absolute",
              width: { xs: "220px", md: "380px" },
              height: { xs: "220px", md: "380px" },
              background: `linear-gradient(135deg, ${bgElements.color2} 0%, transparent 100%)`,
              bottom: "10%",
              right: "8%",
            }}
          />
          {/* مربع مضيء متوسط في المنتصف */}
          <Box
            className="strong-square square-3"
            sx={{
              position: "absolute",
              width: { xs: "120px", md: "220px" },
              height: { xs: "120px", md: "220px" },
              background: `linear-gradient(135deg, ${bgElements.color1} 0%, transparent 100%)`,
              bottom: "35%",
              left: "25%",
            }}
          />

          {/* أيقونات التقنيات - تصميم دائري مع توهج */}
          {techIcons.map((item, index) => (
            <Box
              key={index}
              className="tech-icon-wrapper"
              sx={{
                position: "absolute",
                top: item.top,
                right: item.right,
                left: item.left,
                bottom: item.bottom,
                animation: `floatTech ${18 + index * 2}s ease-in-out ${item.delay}s infinite`,
                opacity: 0.12,
                transition: "all 0.5s ease",
                "&:hover": {
                  opacity: 0.35,
                  transform: "scale(1.3) rotate(10deg)",
                  transition: "all 0.5s ease",
                },
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: item.size * 1.8,
                  height: item.size * 1.8,
                  borderRadius: "50%",
                  border: `2px solid ${item.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `radial-gradient(circle, ${item.color}15, transparent 70%)`,
                  boxShadow: `0 0 30px ${item.color}20`,
                  position: "relative",
                }}
              >
                <item.icon
                  style={{
                    fontSize: item.size,
                    color: item.color,
                    filter: "drop-shadow(0 0 10px currentColor)",
                  }}
                />
                {/* توهج إضافي خلف الأيقونة */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${item.color}10, transparent 70%)`,
                    animation: "pulseGlow 3s ease-in-out infinite",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            marginTop: "280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: { xs: "20px", sm: "30px", md: "30px" },
            height: "20vh",
            position: "relative",
            zIndex: 2, // زيادة z-index لضمان ظهور المحتوى فوق الأيقونات
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              alt="Islam Hadaya"
              src="/logo/my-photo-2.jpg"
              sx={{
                width: 230,
                height: 230,
                boxShadow: colors.avatarShadow,
                border: "3px solid " + colors.avatarBorder,
              }}
            />
            <VerifiedIcon
              sx={{
                position: "absolute",
                top: 180,
                right: 11,
                color: darkMode ? "#D4AF37" : "#186e96",
                fontSize: { xs: "32px", sm: "36px", md: "30px" },
                background: darkMode ? "#0A1F44" : "#fff",
                borderRadius: "50%",
                p: 0.2,
                zIndex: 2,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              flexWrap: "wrap",
              justifyContent: "center",
              mt: 2,
            }}
          >
            {"Islam Hadaya".split("").map((char, index) => (
              <Typography
                key={index}
                sx={{
                  fontFamily: "monospace",
                  fontSize: { xs: "1.4rem", sm: "1.6rem", md: "3rem" },
                  fontWeight: "bold",
                  animation: `glow 1.5s ease-in-out ${index * 0.1}s infinite`,
                  display: "inline-block",
                  color: colors.nameColor,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </Typography>
            ))}
          </Box>

          <Typography
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
              maxWidth: "700px",
              lineHeight: "1.6",
              fontWeight: "bold",
              marginTop: 2,
            }}
          >
            <TypeAnimation
              sequence={[
                "Full-stack developer turning ideas into impact.",
                2000,
                "Building scalable, secure, and beautiful applications.",
                2000,
                "React • Node.js • TypeScript — clean code, clear vision.",
                2000,
                "From concept to deployment, I deliver excellence.",
                2000,
                "Let's build something extraordinary together.",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              marginTop: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              endIcon={<DownloadIcon />}
              sx={{
                paddingX: 3,
                paddingY: 1,
                borderRadius: "25px",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
                fontWeight: "600",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
                },
              }}
            >
              Download CV
            </Button>
            <Button
              variant="contained"
              endIcon={<AppsIcon sx={{ color: colors.buttonText }} />}
              sx={{
                paddingX: 3,
                paddingY: 1,
                borderRadius: "25px",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                backgroundColor: colors.buttonBg,
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
                },
              }}
            >
              <Link
                href="/project"
                style={{
                  textDecoration: "none",
                  color: colors.buttonText,
                  display: "inline-block",
                  fontWeight: "600",
                }}
              >
                VIEW PROJECTS
              </Link>
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link href="mailto:hdayaaslam34@gmail.com" target="_blank">
              <EmailIcon
                sx={{
                  color: iconColors.email,
                  fontSize: 30,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            </Link>
            <Link
              href="https://www.facebook.com/islam.hadaya.2025?"
              target="_blank"
            >
              <FacebookIcon
                sx={{
                  color: iconColors.facebook,
                  fontSize: 30,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            </Link>
            <Link href="https://github.com/eslam-cmd" target="_blank">
              <GitHubIcon
                sx={{
                  color: iconColors.github,
                  fontSize: 30,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/Islam-hadaya"
              target="_blank"
            >
              <LinkedInIcon
                sx={{
                  color: iconColors.linkedin,
                  fontSize: 30,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            </Link>
            <Link href="https://x.com/eslam_hadaya?s=09" target="_blank">
              <TwitterIcon
                sx={{
                  color: iconColors.twitter,
                  fontSize: 30,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.2)" },
                }}
              />
            </Link>
          </Box>

          <style>
            {`
              @keyframes glow {
                0% { text-shadow: 0 0 0px #3f51b5; opacity: 0.4; }
                50% { text-shadow: 0 0 8px #3f51b5; opacity: 1; }
                100% { text-shadow: 0 0 0px #3f51b5; opacity: 0.4; }
              }

              /* إعدادات المربعات الخلفية */
              .strong-square {
                will-change: transform;
                filter: blur(15px);
                border-radius: 12px;
                transition: background 0.6s ease;
                border: 1px solid rgba(255, 255, 255, 0.05);
              }

              /* حركات المربعات */
              .square-1 {
                animation: activeSquareMove 12s ease-in-out infinite alternate;
              }

              .square-2 {
                animation: activeSquareMoveReverse 14s ease-in-out infinite alternate;
              }

              .square-3 {
                animation: activeSquareMove 13s ease-in-out infinite alternate 1s;
              }

              @keyframes activeSquareMove {
                0% {
                  transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
                  opacity: 0.6;
                }
                50% {
                  transform: translateY(-40px) translateX(25px) rotate(15deg) scale(1.05);
                  opacity: 1;
                }
                100% {
                  transform: translateY(15px) translateX(-15px) rotate(-10deg) scale(0.95);
                  opacity: 0.6;
                }
              }

              @keyframes activeSquareMoveReverse {
                0% {
                  transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.95);
                  opacity: 0.6;
                }
                50% {
                  transform: translateY(40px) translateX(-25px) rotate(-15deg) scale(1.08);
                  opacity: 1;
                }
                100% {
                  transform: translateY(-15px) translateX(15px) rotate(10deg) scale(1);
                  opacity: 0.6;
                }
              }

              /* حركات أيقونات التقنيات */
              @keyframes floatTech {
                0%, 100% {
                  transform: translate(0, 0) scale(1) rotate(0deg);
                }
                25% {
                  transform: translate(30px, -25px) scale(1.1) rotate(5deg);
                }
                50% {
                  transform: translate(-20px, 30px) scale(0.9) rotate(-5deg);
                }
                75% {
                  transform: translate(15px, -20px) scale(1.05) rotate(3deg);
                }
              }

              @keyframes pulseGlow {
                0%, 100% {
                  opacity: 0.3;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.8;
                  transform: scale(1.1);
                }
              }

              /* تحسين ظهور الأيقونات على الشاشات الصغيرة */
              @media (max-width: 768px) {
                .tech-icon-wrapper {
                  opacity: 0.08 !important;
                }
              }
            `}
          </style>
        </Box>
      </section>
    </>
  );
}
