"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@emotion/react";

// استيراد ملف الـ JSON الجديد
import cards from "../../data/skillsData.json";

// استيراد جميع الأيقونات من المكتبات المستخدمة
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";

// مكون فرعي لعرض الأيقونات ديناميكياً مع دعم التباين بين المظهر الداكن والفاتح
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

  // تحسين UX: معالجة الألوان التي قد تختفي في الثيمات المختلفة (مثل الأيقونات البيضاء بالكامل)
  let resolvedColor = color;
  if (
    !darkMode &&
    (color.toLowerCase() === "#ffffff" || color.toLowerCase() === "#cccccc")
  ) {
    resolvedColor = "#1a202c"; // تحويل الأيقونات البيضاء الفاتحة إلى لون غامق في الـ Light Mode لضمان التباين
  }

  return <IconComponent size={size} color={resolvedColor} />;
};

// تقسيم المهارات إلى فئات واضحة ومنظمة
const categorizedSkills = {
  frontend: cards.filter((card) =>
    [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Native",
      
    ].includes(card.title),
  ),
  backend: cards.filter((card) =>
    ["Node.js", "Express", "Nest.js"].includes(card.title),
  ),
  desktop: cards.filter((card) =>
    ["Python", "Qt6", "PySide6"].includes(card.title),
  ),
  design: cards.filter((card) =>
    ["MUI", "Bootstrap", "Tailwind", "shadcn/ui"].includes(card.title),
  ),
  database: cards.filter((card) =>
    ["PostgreSQL", "Supabase", "Prisma", "TypeORM"].includes(card.title),
  ),
  tools: cards.filter((card) =>
    ["GitHub", "Postman", "Docker", "Git","Zustand","Testing","AWS","Jest", "Vitest","Testing"].includes(card.title),
  ),
};

export default function ToolsSection({ toggleTheme, darkMode }) {
  const theme = useTheme();
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
    buttonBg: darkMode ? "#0A1F44" : "#186e96",
    buttonText: darkMode ? "#D4AF37" : "#ffff",
    avatarBorder: "#D4AF37",
    avatarShadow: "rgba(212, 175, 55, 0.3)",
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    glowColor: "#3f51b5",
    tabActive: darkMode ? "#D4AF37" : "#186e96",
    tabInactive: darkMode ? "#4a5568" : "#a0aec0",
  };

  // ألوان مميزة ومعبرة لكل فئة من فئات التبويبات
  const getCategoryColor = (category) => {
    switch (category) {
      case "frontend":
        return "#3182ce"; // أزرق
      case "backend":
        return "#38a169"; // أخضر غامق
      case "desktop":
        return "#41CD52"; // أخضر Qt زاهي
      case "design":
        return "#9333ea"; // بنفسجي
      case "database":
        return "#dd6b20"; // برتقالي
      case "tools":
        return "#d69e2e"; // ذهبي
      default:
        return colors.nameColor;
    }
  };

  const tabLabels = [
    "Frontend",
    "Backend",
    "Desktop & Python",
    "Design Libraries",
    "Database & ORM",
    "Tools",
  ];

  const categoryKeys = Object.keys(categorizedSkills);

  return (
    <>
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
            className="tools-skils"
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
              fontSize: { xs: "1.1rem", sm: "1.4rem", md: "2rem" },
              color: darkMode ? "#ccc" : "#333",
            }}
          >
            I Work Hard To Improve My Skills Regularly
          </Typography>

          {/* التبويبات الذكية لتصفية لغات البرمجة */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              mb: 2,
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: "6px",
              },
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
              {tabLabels.map((label, index) => (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: getCategoryColor(
                            categoryKeys[index],
                          ),
                        }}
                      />
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "0.9rem" }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    color:
                      activeTab === index
                        ? colors.tabActive
                        : colors.tabInactive,
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    minHeight: "48px",
                    px: 2,
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* شبكة عرض كروت المهارات */}
          <Grid
            container
            spacing={1.5}
            justifyContent="center"
            sx={{ marginTop: "20px", px: 2 }}
          >
            {categorizedSkills[categoryKeys[activeTab]].map((card, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={card.id}>
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
                    transitionDelay: `${index * 0.08}s`, // تسريع طفيف في الأنيميشن لتحسين الاستجابة البصرية
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: darkMode
                        ? `0px 8px 15px rgba(212, 175, 55, 0.3)`
                        : `0px 8px 15px rgba(0, 84, 122, 0.3)`,
                      border: `1px solid ${getCategoryColor(categoryKeys[activeTab])}`,
                    },
                  }}
                >
                  <CardActionArea sx={{ height: "100%", p: 1 }}>
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
                          fontWeight: "500",
                          fontSize: "0.9rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {card.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </section>
    </>
  );
}
