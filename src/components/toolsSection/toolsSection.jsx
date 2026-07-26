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

import cards from "../../data/skillsData.json";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";

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
          }}
        >
          TOOLS & SKILLS
        </Typography>
        <Typography
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.5rem" },
            color: darkMode ? "#ccc" : "#333",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          React · Next.js · Node.js · PostgreSQL — with Docker, AWS & Testing
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            mb: 2,
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: "6px" },
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
                      }}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {cat.label}
                    </Typography>
                  </Box>
                }
                sx={{
                  color:
                    activeTab === index ? colors.tabActive : colors.tabInactive,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  minHeight: "48px",
                  px: 2,
                }}
              />
            ))}
          </Tabs>
        </Box>

        <Grid
          container
          spacing={1.5}
          justifyContent="center"
          sx={{ marginTop: "20px", px: 2 }}
        >
          {activeSkills.map((card, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={card.id || index}>
              <Card
                sx={{
                  backgroundColor: darkMode ? "#0A1F44" : "#00547aff",
                  boxShadow: darkMode
                    ? "0px 4px 9px rgba(212, 175, 55, 0.2)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  textAlign: "center",
                  width: "150px",
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "12px",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(40px)",
                  transition: "all 0.6s ease",
                  transitionDelay: `${index * 0.08}s`,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: darkMode
                      ? `0px 8px 15px rgba(212, 175, 55, 0.3)`
                      : `0px 8px 15px rgba(0, 84, 122, 0.3)`,
                    border: `1px solid ${activeCategory.color}`,
                  },
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    py: 2,
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
                      width: "60px",
                      height: "60px",
                      borderRadius: "10px",
                      backgroundColor: darkMode ? "#1a365d" : "#0a3d62",
                      mb: 1,
                    }}
                  >
                    <DynamicIcon
                      iconName={card.icon}
                      library={card.library}
                      color={card.color}
                      size={40}
                      darkMode={darkMode}
                    />
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#ddd",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      lineHeight: 1.2,
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
