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

// تأثيرات حركية
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const slide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
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
    label: "Frontend",
    color: "#3182ce",
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
    label: "Backend",
    color: "#38a169",
    items: ["Node.js", "Express", "Nest.js"],
  },
  {
    key: "database",
    label: "Database",
    color: "#dd6b20",
    items: ["PostgreSQL", "Supabase", "Prisma", "TypeORM"],
  },
  {
    key: "devops",
    label: "DevOps & Testing",
    color: "#d69e2e",
    items: ["Git", "GitHub", "Docker", "Postman", "AWS", "Jest", "Vitest"],
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
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    tabActive: darkMode ? "#D4AF37" : "#186e96",
    tabInactive: darkMode ? "#4a5568" : "#a0aec0",
    border: darkMode ? "rgba(212,175,55,0.3)" : "rgba(24,110,150,0.3)",
    cardBg: darkMode ? "#0A1F44" : "#00547aff",
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
          height: "2px",
        }}
      />

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography
          gutterBottom
          sx={{
            color: colors.nameColor,
            marginTop: "50px",
            fontWeight: "bold",
            fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.7rem" },
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          TOOLS & SKILLS
        </Typography>

        <Chip
          label="⚡ Tech Stack"
          sx={{
            bgcolor: "rgba(212, 175, 55, 0.1)",
            color: colors.nameColor,
            border: `1px solid ${colors.border}`,
            fontWeight: 600,
            letterSpacing: "2px",
            fontSize: "10px",
            mb: 2,
            "&:hover": {
              bgcolor: "rgba(212, 175, 55, 0.2)",
            },
          }}
        />

        <Typography
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
            color: darkMode ? "#ccc" : "#333",
            maxWidth: 600,
            mx: "auto",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.5px",
          }}
        >
          React · Next.js · Node.js · PostgreSQL — with Docker, AWS & Testing
        </Typography>

        {/* ===== شريط الأيقونات الأفقي ===== */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            py: 3,
            my: 3,
            bgcolor: darkMode ? "rgba(10, 31, 68, 0.3)" : "rgba(0, 84, 122, 0.05)",
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              animation: `${slide} 20s linear infinite`,
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
                    opacity: 0.7,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      transform: "scale(1.2)",
                    },
                  }}
                >
                  <IconComponent size={32} color={item.color} />
                  <Typography
                    sx={{
                      fontSize: "8px",
                      color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                      mt: 0.5,
                      fontWeight: 500,
                      letterSpacing: "0.5px",
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
            mt: 2,
            mb: 2,
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: "4px" },
            "&::-webkit-scrollbar-track": {
              background: darkMode ? "#1a202c" : "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: colors.tabActive,
              borderRadius: "3px",
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
                height: 3,
                borderRadius: "3px",
              },
              minWidth: { xs: "100%", sm: "auto" },
            }}
          >
            {CATEGORIES.map((cat, index) => (
              <Tab
                key={cat.key}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: cat.color,
                        transition: "all 0.3s ease",
                        animation: activeTab === index ? `${float} 2s ease-in-out infinite` : "none",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {cat.label}
                    </Typography>
                    <Chip
                      label={cat.items.length}
                      size="small"
                      sx={{
                        bgcolor: activeTab === index ? colors.tabActive : "rgba(255,255,255,0.05)",
                        color: activeTab === index ? "#000" : colors.tabInactive,
                        fontSize: "9px",
                        height: "18px",
                        minWidth: "18px",
                        "& .MuiChip-label": {
                          px: 0.8,
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                }
                sx={{
                  color: activeTab === index ? colors.tabActive : colors.tabInactive,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  minHeight: "48px",
                  px: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: colors.tabActive,
                    bgcolor: darkMode ? "rgba(212, 175, 55, 0.05)" : "rgba(24, 110, 150, 0.05)",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* الكروت */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: "20px", px: 2 }}
        >
          {activeSkills.map((card, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={card.id || index}>
              <Card
                sx={{
                  backgroundColor: colors.cardBg,
                  boxShadow: darkMode
                    ? "0px 4px 20px rgba(212, 175, 55, 0.1)"
                    : "0px 4px 20px rgba(0, 0, 0, 0.08)",
                  textAlign: "center",
                  width: "150px",
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "16px",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDelay: `${index * 0.06}s`,
                  border: `1px solid ${colors.border}`,
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: darkMode
                      ? `0px 12px 40px rgba(212, 175, 55, 0.2)`
                      : `0px 12px 40px rgba(0, 84, 122, 0.2)`,
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
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    py: 2.5,
                    px: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "64px",
                      height: "64px",
                      borderRadius: "12px",
                      backgroundColor: darkMode ? "rgba(26, 54, 93, 0.6)" : "rgba(10, 61, 66, 0.6)",
                      mb: 1,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "rotate(-5deg) scale(1.05)",
                      },
                    }}
                  >
                    <DynamicIcon
                      iconName={card.icon}
                      library={card.library}
                      color={card.color}
                      size={36}
                      darkMode={darkMode}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#ddd",
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      lineHeight: 1.2,
                      fontFamily: "'Inter', sans-serif",
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