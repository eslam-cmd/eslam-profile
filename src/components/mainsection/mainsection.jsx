"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { TypeAnimation } from "react-type-animation";
import AppsIcon from "@mui/icons-material/Apps";
import { useTheme } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";

// 4 أيقونات فقط — أهم التقنيات
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql } from "react-icons/si";

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
  };

  const iconColors = {
    email: darkMode ? "#FFD700" : "#D4AF37",
    github: darkMode ? "#EAEAEA" : "#000",
    linkedin: darkMode ? "#64B5F6" : "#0A66C2",
  };

  // 4 أيقونات فقط — static (بدون animation معقد)
  const techIcons = [
    { icon: FaReact, color: "#61DBFB", top: "10%", right: "8%", size: 60 },
    {
      icon: SiNextdotjs,
      color: darkMode ? "#fff" : "#000",
      bottom: "15%",
      right: "12%",
      size: 55,
    },
    { icon: FaNodeJs, color: "#68a063", bottom: "10%", left: "8%", size: 55 },
    { icon: SiPostgresql, color: "#336791", top: "15%", left: "10%", size: 50 },
  ];

  return (
    <section
      id="home"
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
    >
      {/* خلفية بسيطة: 4 أيقونات static */}
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
        {techIcons.map((item, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: item.top,
              right: item.right,
              left: item.left,
              bottom: item.bottom,
              opacity: 0.08,
              zIndex: 1,
            }}
          >
            <item.icon
              style={{
                fontSize: item.size,
                color: item.color,
              }}
            />
          </Box>
        ))}
      </Box>

      {/* المحتوى الرئيسي — متوسّط */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: { xs: "20px", sm: "30px", md: "40px" },
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Avatar
            alt="Islam Hadaya"
            src="/logo/my-photo-2.jpg"
            sx={{
              width: { xs: 180, sm: 200, md: 230 },
              height: { xs: 180, sm: 200, md: 230 },
              boxShadow: colors.avatarShadow,
              border: "3px solid " + colors.avatarBorder,
            }}
          />
          <VerifiedIcon
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              color: darkMode ? "#D4AF37" : "#186e96",
              fontSize: { xs: "28px", sm: "32px" },
              background: darkMode ? "#0A1F44" : "#fff",
              borderRadius: "50%",
              p: 0.2,
            }}
          />
        </Box>

        {/* الاسم — بدون animation منفصلة لكل حرف */}
        <Typography
          variant="h1"
          sx={{
            fontFamily: "monospace",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: "bold",
            color: colors.nameColor,
            letterSpacing: "0.1em",
            mt: 3,
            textShadow: darkMode
              ? "0 0 20px rgba(212, 175, 55, 0.3)"
              : "0 0 20px rgba(24, 110, 150, 0.3)",
          }}
        >
          Islam Hadaya
        </Typography>

        {/* TypeAnimation — نفس الشيء الممتاز */}
        <Typography
          sx={{
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
            maxWidth: "700px",
            lineHeight: 1.6,
            fontWeight: "bold",
            mt: 2,
            minHeight: "3.5rem", // يمنع القفز
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
              "Open to opportunities in Canada & remote worldwide.",
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: "inline-block" }}
          />
        </Typography>

        {/* الأزرار */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            endIcon={<DownloadIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: "25px",
              fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" },
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Download CV
          </Button>
          <Button
            variant="contained"
            endIcon={<AppsIcon sx={{ color: colors.buttonText }} />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: "25px",
              fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" },
              backgroundColor: colors.buttonBg,
              color: colors.buttonText,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Link
              href="/project"
              style={{
                textDecoration: "none",
                color: colors.buttonText,
                display: "inline-block",
              }}
            >
              View Projects
            </Link>
          </Button>
        </Box>

        {/* الروابط — بدون Facebook */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            mt: 4,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="mailto:hdayaaslam34@gmail.com"
            target="_blank"
            aria-label="Email"
          >
            <EmailIcon
              sx={{
                color: iconColors.email,
                fontSize: 28,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </Link>
          <Link
            href="https://github.com/eslam-cmd"
            target="_blank"
            aria-label="GitHub"
          >
            <GitHubIcon
              sx={{
                color: iconColors.github,
                fontSize: 28,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/Islam-hadaya"
            target="_blank"
            aria-label="LinkedIn"
          >
            <LinkedInIcon
              sx={{
                color: iconColors.linkedin,
                fontSize: 28,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.2)" },
              }}
            />
          </Link>
        </Box>
      </Box>
    </section>
  );
}
