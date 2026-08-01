"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography, Paper } from "@mui/material";
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
import CodeIcon from "@mui/icons-material/Code";
import { keyframes } from "@mui/system";


import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql } from "react-icons/si";

// تأثيرات حركية
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const typeCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export default function MainSection({ toggleTheme, darkMode }) {
  const theme = useTheme();
  const [displayText, setDisplayText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(true);
  const [textIndex, setTextIndex] = React.useState(0);

  const colors = {
    buttonBg: darkMode ? "#0A1F44" : "#186e96",
    buttonText: darkMode ? "#D4AF37" : "#ffff",
    avatarBorder: darkMode ? "#D4AF37" : "#186e96",
    avatarShadow: darkMode
      ? "0 6px 58px rgba(212, 175, 55, 0.3)"
      : "rgba(14, 124, 175, 1)",
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    codeBg: darkMode ? "rgba(10, 31, 68, 0.9)" : "rgba(255, 255, 255, 0.85)",
    codeBorder: darkMode
      ? "rgba(212, 175, 55, 0.3)"
      : "rgba(24, 110, 150, 0.3)",
    codeText: darkMode ? "#D4AF37" : "#186e96",
  };

  const iconColors = {
    email: darkMode ? "#FFD700" : "#D4AF37",
    github: darkMode ? "#EAEAEA" : "#000",
    linkedin: darkMode ? "#64B5F6" : "#0A66C2",
  };


  const codeLines = [
    "const developer = {",
    '  name: "Islam Hadaya",',
    '  skills: ["React", "Next.js", "Node.js"],',
    '  passion: "Building integrated systems"',
    "};",
    'console.log("Hello World! 🚀");',
  ];

  // محاكاة الكتابة
  React.useEffect(() => {
    if (textIndex < codeLines.length) {
      const line = codeLines[textIndex];
      let charIndex = 0;
      setIsTyping(true);

      const typeInterval = setInterval(() => {
        if (charIndex <= line.length) {
          setDisplayText((prev) => {
            const lines = prev.split("\n");
            if (lines.length > textIndex) {
              lines[textIndex] = line.substring(0, charIndex);
              return lines.join("\n");
            } else {
              return [...prev.split("\n"), line.substring(0, charIndex)].join(
                "\n",
              );
            }
          });
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setTimeout(() => {
            setTextIndex((prev) => prev + 1);
            if (textIndex < codeLines.length - 1) {
              setDisplayText((prev) => prev + "\n");
            } else {
              // إعادة التشغيل بعد 3 ثواني
              setTimeout(() => {
                setDisplayText("");
                setTextIndex(0);
              }, 3000);
            }
          }, 500);
        }
      }, 40);

      return () => clearInterval(typeInterval);
    }
  }, [textIndex]);

 
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

      {/* المحتوى الرئيسي */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: { xs: "20px", sm: "30px", md: "40px" },
          minHeight: "100vh",
          position: "relative",
          zIndex: 2,
          gap: { xs: 4, md: 6 },
          maxWidth: "1200px",
          mx: "auto",
          marginTop: { xs: "120px", md: "120px" },
        }}
      >
        {/* القسم الأيسر - المعلومات الشخصية */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              alt="Islam Hadaya"
              src="/logo/my-photo-2.jpg"
              sx={{
                width: { xs: 160, sm: 180, md: 200, lg: 220 },
                height: { xs: 160, sm: 180, md: 200, lg: 220 },
                boxShadow: colors.avatarShadow,
                border: "3px solid " + colors.avatarBorder,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
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
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.8rem",
                lg: "3.2rem",
              },
              fontWeight: 700,
              color: colors.nameColor,
              letterSpacing: "-0.02em",
              mt: 3,
              textShadow: darkMode
                ? "0 0 30px rgba(212, 175, 55, 0.15)"
                : "0 0 30px rgba(24, 110, 150, 0.15)",
            }}
          >
            Islam Hadaya
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
              maxWidth: "600px",
              lineHeight: 1.8,
              fontWeight: 400,
              mt: 2,
              minHeight: "3.5rem",
              color: darkMode ? "#ccc" : "#333",
            }}
          >
            <TypeAnimation
              sequence={[
                "Full-stack developer turning ideas into impact.",
                2000,
                "Building scalable, secure, and beautiful applications.",
                2000,
                "React • Next.js • Node.js — clean code, clear vision.",
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
              gap: 2,
              mt: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              endIcon={<DownloadIcon />}
              sx={{
                px: { xs: 2.5, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                borderRadius: "25px",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 8px 30px ${darkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(24, 110, 150, 0.3)"}`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Download CV
            </Button>
            <Button
              variant="contained"
              endIcon={<AppsIcon sx={{ color: colors.buttonText }} />}
              sx={{
                px: { xs: 2.5, sm: 3 },
                py: { xs: 1, sm: 1.2 },
                borderRadius: "25px",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                backgroundColor: colors.buttonBg,
                color: colors.buttonText,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 8px 30px ${darkMode ? "rgba(212, 175, 55, 0.3)" : "rgba(24, 110, 150, 0.3)"}`,
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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

          {/* الروابط الاجتماعية */}
          <Box
            sx={{
              display: "flex",
              gap: 2.5,
              mt: 4,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              href="mailto:hdayaaslam34@gmail.com"
              target="_blank"
              aria-label="Email"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15) translateY(-3px)" },
              }}
            >
              <EmailIcon
                sx={{
                  color: iconColors.email,
                  fontSize: { xs: 26, sm: 28 },
                }}
              />
            </Link>
            <Link
              href="https://github.com/eslam-cmd"
              target="_blank"
              aria-label="GitHub"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15) translateY(-3px)" },
              }}
            >
              <GitHubIcon
                sx={{
                  color: iconColors.github,
                  fontSize: { xs: 26, sm: 28 },
                }}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/Islam-hadaya"
              target="_blank"
              aria-label="LinkedIn"
              sx={{
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.15) translateY(-3px)" },
              }}
            >
              <LinkedInIcon
                sx={{
                  color: iconColors.linkedin,
                  fontSize: { xs: 26, sm: 28 },
                }}
              />
            </Link>
          </Box>
        </Box>

        {/* ===== القسم الأيمن - المبرمج الكرتوني يكتب ===== */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 45%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: { xs: "100%", md: "500px" },
            width: "100%",
            marginTop:{ xs: "-200px", md: "0" }
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: "480px",
              borderRadius: 4,
              background: colors.codeBg,
              backdropFilter: "blur(12px)",
              border: `1px solid ${colors.codeBorder}`,
              padding: { xs: 2.5, sm: 3, md: 3.5 },
              boxShadow: `0 12px 50px ${darkMode ? "rgba(212, 175, 55, 0.08)" : "rgba(24, 110, 150, 0.08)"}`,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 20px 60px ${darkMode ? "rgba(212, 175, 55, 0.12)" : "rgba(24, 110, 150, 0.12)"}`,
                borderColor: darkMode
                  ? "rgba(212, 175, 55, 0.5)"
                  : "rgba(24, 110, 150, 0.5)",
              },
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* رأس المحرر */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2.5,
                pb: 1.5,
                borderBottom: `1px solid ${colors.codeBorder}`,
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#ff5f57",
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#ffbd2e",
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: "#28c840",
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  ml: 1,
                }}
              >
                terminal:~ /developer
              </Typography>
              <CodeIcon
                sx={{
                  fontSize: 18,
                  color: colors.codeText,
                  ml: "auto",
                  opacity: 0.4,
                }}
              />
            </Box>

            {/* محتوى الكود */}
            <Box
              sx={{
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                lineHeight: 1.9,
                color: colors.codeText,
                minHeight: { xs: "180px", sm: "200px", md: "220px" },
                position: "relative",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: darkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                borderRadius: 2,
                p: 2,
              }}
            >
              {displayText || (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }}>Loading...</Typography>
                </Box>
              )}
              {isTyping && textIndex < codeLines.length && (
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: "2px",
                    height: "16px",
                    bgcolor: colors.codeText,
                    animation: `${typeCursor} 0.8s ease-in-out infinite`,
                    ml: 1,
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </section>
  );
}
