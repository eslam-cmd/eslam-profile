"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import { keyframes } from "@mui/system";

import cards from "../../data/skillsData.json";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";

// تأثيرات حركية احترافية
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

const DynamicIcon = ({ iconName, library, color, size = 40, darkMode }) => {
  let IconComponent;

  if (library === "fa") {
    IconComponent = FaIcons[iconName];
  } else if (library === "si") {
    IconComponent = SiIcons[iconName];
  } else if (library === "md") {
    IconComponent = MdIcons[iconName];
  }

  if (!IconComponent) {
    return <Box sx={{ width: size, height: size }} />;
  }

  let resolvedColor = color;
  if (
    !darkMode &&
    (color.toLowerCase() === "#ffffff" || color.toLowerCase() === "#cccccc")
  ) {
    resolvedColor = "#1a202c";
  }

  return <IconComponent size={size} color={resolvedColor} />;
};

const CATEGORIES = [
  {
    key: "frontend",
    label: "Frontend Engineering",
    color: "#4A90D9",
    glowColor: "rgba(74, 144, 217, 0.3)",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Tailwind",
      "MUI",
      "shadcn/ui",
      "Zustand",
    ],
  },
  {
    key: "backend",
    label: "Backend Architecture",
    color: "#2ECC71",
    glowColor: "rgba(46, 204, 113, 0.3)",
    items: ["Node.js", "Express", "Nest.js"],
  },
  {
    key: "database",
    label: "Database Management",
    color: "#E67E22",
    glowColor: "rgba(230, 126, 34, 0.3)",
    items: ["PostgreSQL", "Supabase", "Prisma", "TypeORM"],
  },
  {
    key: "devops",
    label: "DevOps & Quality",
    color: "#F1C40F",
    glowColor: "rgba(241, 196, 15, 0.3)",
    items: ["Git", "GitHub", "Docker", "Postman", ],
  },
];

// أيقونات الشريط الأفقي
const MARQUEE_ICONS = [
  { icon: "FaReact", library: "fa", color: "#61DAFB" },
  { icon: "SiNextdotjs", library: "si", color: "#ffffff" },
  { icon: "FaNodeJs", library: "fa", color: "#339933" },
  { icon: "SiTypescript", library: "si", color: "#3178C6" },
  { icon: "SiTailwindcss", library: "si", color: "#06B6D4" },
  { icon: "SiMui", library: "si", color: "#007FFF" },
  { icon: "SiPostgresql", library: "si", color: "#4169E1" },
  { icon: "SiDocker", library: "si", color: "#2496ED" },
  { icon: "SiAmazonaws", library: "si", color: "#FF9900" },
  { icon: "SiGit", library: "si", color: "#F05032" },
  { icon: "FaReact", library: "fa", color: "#61DAFB" },
  { icon: "SiNextdotjs", library: "si", color: "#ffffff" },
  { icon: "FaNodeJs", library: "fa", color: "#339933" },
  { icon: "SiTypescript", library: "si", color: "#3178C6" },
  { icon: "SiTailwindcss", library: "si", color: "#06B6D4" },
  { icon: "SiMui", library: "si", color: "#007FFF" },
  { icon: "SiPostgresql", library: "si", color: "#4169E1" },
  { icon: "SiDocker", library: "si", color: "#2496ED" },
  { icon: "SiAmazonaws", library: "si", color: "#FF9900" },
  { icon: "SiGit", library: "si", color: "#F05032" },
];

export default function ToolsSection({ darkMode }) {
  const [inView, setInView] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const colors = {
    nameColor: darkMode ? "#D4AF37" : "#1A3A5C",
    tabActive: darkMode ? "#D4AF37" : "#1A3A5C",
    tabInactive: darkMode ? "#4a5568" : "#8899AA",
    border: darkMode ? "rgba(212,175,55,0.2)" : "rgba(26,58,92,0.15)",
    cardBg: darkMode ? "rgba(10, 31, 68, 0.85)" : "#FFFFFF",
    cardBorder: darkMode ? "rgba(212,175,55,0.15)" : "rgba(26,58,92,0.1)",
    textPrimary: darkMode ? "#FFFFFF" : "#1A3A5C",
    textSecondary: darkMode ? "rgba(255,255,255,0.7)" : "rgba(26,58,92,0.7)",
    iconBg: darkMode ? "rgba(26, 54, 93, 0.5)" : "rgba(26, 58, 92, 0.06)",
  };

  const activeCategory = CATEGORIES[activeTab];
  const activeSkills = cards.filter((card) =>
    activeCategory.items.includes(card.title),
  );

  return (
    <section id="skills" ref={sectionRef}>
      <Divider
        sx={{
          backgroundColor: colors.border,
          marginTop: "40px",
          height: "1px",
        }}
      />

      <Box sx={{ textAlign: "center", mt: 4 }}>
        {/* العنوان الرئيسي */}
        <Typography
          gutterBottom
          sx={{
            color: colors.nameColor,
            marginTop: "50px",
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Technical Expertise
        </Typography>

        <Chip
          label="✦ Professional Stack"
          sx={{
            bgcolor: darkMode
              ? "rgba(212, 175, 55, 0.08)"
              : "rgba(26, 58, 92, 0.06)",
            color: colors.nameColor,
            border: `1px solid ${colors.border}`,
            fontWeight: 500,
            letterSpacing: "2.5px",
            fontSize: "9px",
            mb: 2,
            py: 1,
            "&:hover": {
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.15)"
                : "rgba(26, 58, 92, 0.1)",
            },
          }}
        />

        <Typography
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
            color: colors.textSecondary,
            maxWidth: 650,
            mx: "auto",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.3px",
            lineHeight: 1.6,
          }}
        >
          Full-stack development with modern JavaScript ecosystem —
          <span style={{ color: colors.nameColor, fontWeight: 500 }}>
            {" "}
            React, Next.js, Node.js, PostgreSQL
          </span>
          , containerized with Docker and deployed on AWS.
        </Typography>

        {/* شريط الأيقونات الأفقي */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            py: 3,
            my: 3,
            bgcolor: darkMode
              ? "rgba(10, 31, 68, 0.3)"
              : "rgba(26, 58, 92, 0.03)",
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              animation: `${slide} 25s linear infinite`,
              width: "fit-content",
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {MARQUEE_ICONS.map((item, index) => {
              let IconComponent;
              if (item.library === "fa") {
                IconComponent = FaIcons[item.icon];
              } else if (item.library === "si") {
                IconComponent = SiIcons[item.icon];
              }

              if (!IconComponent) return null;

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: 4,
                    minWidth: "60px",
                    opacity: 0.6,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.15) translateY(-4px)",
                    },
                  }}
                >
                  <IconComponent size={30} color={item.color} />
                  <Typography
                    sx={{
                      fontSize: "7px",
                      color: darkMode
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(26,58,92,0.25)",
                      mt: 0.5,
                      fontWeight: 600,
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.icon.replace(/^.{2}/, "")}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* التبويبات */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 2,
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: "3px" },
            "&::-webkit-scrollbar-track": {
              background: darkMode ? "#1a202c" : "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: colors.tabActive,
              borderRadius: "2px",
            },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: colors.tabActive,
                height: 2.5,
                borderRadius: "2px",
              },
              minWidth: { xs: "100%", sm: "auto" },
            }}
          >
            {CATEGORIES.map((cat, index) => (
              <Tab
                key={cat.key}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: cat.color,
                        boxShadow:
                          activeTab === index
                            ? `0 0 20px ${cat.glowColor}`
                            : "none",
                        transition: "all 0.3s ease",
                        animation:
                          activeTab === index
                            ? `${glowPulse} 2s ease-in-out infinite`
                            : "none",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: activeTab === index ? 600 : 400,
                        fontSize: "0.8rem",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.3px",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat.label}
                    </Typography>
                    <Chip
                      label={cat.items.length}
                      size="small"
                      sx={{
                        bgcolor:
                          activeTab === index
                            ? cat.color
                            : darkMode
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(26,58,92,0.05)",
                        color:
                          activeTab === index ? "#fff" : colors.tabInactive,
                        fontSize: "8px",
                        height: "16px",
                        minWidth: "16px",
                        "& .MuiChip-label": {
                          px: 0.6,
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                }
                sx={{
                  color:
                    activeTab === index ? colors.tabActive : colors.tabInactive,
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  minHeight: "44px",
                  px: 2.5,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: colors.tabActive,
                    bgcolor: darkMode
                      ? "rgba(212, 175, 55, 0.04)"
                      : "rgba(26, 58, 92, 0.04)",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* الكروت - بحجم مربع ثابت */}
        <Grid
          container
          spacing={2.5}
          justifyContent="center"
          sx={{ marginTop: "24px", px: 2 }}
        >
          {activeSkills.map((card, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              key={card.id || index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  backgroundColor: colors.cardBg,
                  boxShadow: darkMode
                    ? "0px 2px 20px rgba(0, 0, 0, 0.3)"
                    : "0px 2px 20px rgba(0, 0, 0, 0.06)",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "160px",
                  minWidth: "120px",
                  // ✅ حجم مربع ثابت
                  aspectRatio: "1 / 1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "14px",
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? "translateY(0) scale(1)"
                    : "translateY(40px) scale(0.95)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDelay: `${index * 0.05}s`,
                  border: `1px solid ${colors.cardBorder}`,
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                    boxShadow: darkMode
                      ? `0px 12px 40px ${activeCategory.glowColor}`
                      : `0px 12px 40px rgba(26, 58, 92, 0.12)`,
                    border: `1px solid ${activeCategory.color}`,
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${activeCategory.color}, transparent)`,
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      backgroundColor: colors.iconBg,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      border: `1px solid ${colors.cardBorder}`,
                      flexShrink: 0,
                      "&:hover": {
                        transform: "scale(1.05) rotate(-3deg)",
                        border: `1px solid ${activeCategory.color}`,
                      },
                    }}
                  >
                    <DynamicIcon
                      iconName={card.icon}
                      library={card.library}
                      color={card.color}
                      size={32}
                      darkMode={darkMode}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.textPrimary,
                      fontWeight: 500,
                      fontSize: "0.78rem",
                      lineHeight: 1.2,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.1px",
                      textAlign: "center",
                      wordBreak: "break-word",
                    }}
                  >
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        
      </Box>
    </section>
  );
}
