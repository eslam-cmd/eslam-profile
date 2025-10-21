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

  return (
    <>
      <section id="home">
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
                border: "2px solid ",
                borderColor: colors.avatarBorder,
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(204, 166, 42, 0.63)",
                },
                position: "relative",
                zIndex: 1,
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
            {"Islam  Hadaya".split("").map((char, index) => (
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
                {char}
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
                "Turning complex problems into elegant code.",
                2000,
                "Crafting secure, scalable, and user-friendly applications.",
                2000,
                "From concept to deployment — I build with precision.",
                2000,
                "Engineering digital solutions that empower businesses.",
                2000,
                "Clean code. Clear logic. Creative solutions.",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </Typography>

          <Box sx={{ display: "flex", gap: 3, marginTop: 4 }}>
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

          <Box sx={{ display: "flex", gap: 2, marginTop: 4 }}>
            <Link href="mailto:hdayaaslam34@gmail.com" target="_blank">
              <EmailIcon sx={{ color: iconColors.email }} />
            </Link>
            <Link
              href="https://www.facebook.com/islam.hadaya.2025?"
              target="_blank"
            >
              <FacebookIcon sx={{ color: iconColors.facebook }} />
            </Link>
            <Link href="https://github.com/eslam-cmd" target="_blank">
              <GitHubIcon sx={{ color: iconColors.github }} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/Islam-hadaya"
              target="_blank"
            >
              <LinkedInIcon sx={{ color: iconColors.linkedin }} />
            </Link>
            <Link href="https://x.com/eslam_hadaya?s=09" target="_blank">
              <TwitterIcon sx={{ color: iconColors.twitter }} />
            </Link>
          </Box>

          <style>
            {`
        @keyframes glow {
          0% { text-shadow: 0 0 0px #3f51b5; opacity: 0.4; }
          50% { text-shadow: 0 0 8px #3f51b5; opacity: 1; }
          100% { text-shadow: 0 0 0px #3f51b5; opacity: 0.4; }
        }
      `}
          </style>
        </Box>
      </section>
    </>
  );
}
