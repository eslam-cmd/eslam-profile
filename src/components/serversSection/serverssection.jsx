"use client";
import * as React from "react";
import {
  Card,
  Grid,
  Typography,
  Box,
  Divider,
  LinearProgress,
  useTheme,
} from "@mui/material";

import { FaReact, FaJsSquare } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiExpress,
  SiPostgresql,
  SiReact,
} from "react-icons/si";

export default function SkillsRatingBars({ toggleTheme, darkMode }) {
  const theme = useTheme();
  const [inView, setInView] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect(); // تشغيل مرة واحدة فقط
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const colors = {
    cardBg: darkMode ? "rgba(10, 31, 68, 0.7)" : "#f5f5f5",
    textColor: darkMode ? "#D4AF37" : "#186e96",
    borderColor: darkMode ? "#D4AF37" : "#186e96",
    barColor: darkMode ? "#D4AF37" : "#186e96",
  };

  const skills = [
    { id: 1, name: "React.js", icon: <FaReact />, level: 95 },
    { id: 2, name: "Next.js", icon: <SiNextdotjs />, level: 95 },
    { id: 3, name: "React-Native", icon: <SiReact />, level: 95 },
    { id: 4, name: "JavaScript", icon: <FaJsSquare />, level: 85 },
    { id: 5, name: "TypeScript", icon: <SiTypescript />, level: 80 },
    { id: 6, name: "Express.js", icon: <SiExpress />, level: 90 },
    { id: 7, name: "PostgreSQL", icon: <SiPostgresql />, level: 87 },
  ];

  return (
    <section id="skills" ref={sectionRef} style={{ padding: "80px 20px" }}>
      <Grid container spacing={4} justifyContent="center">
        {skills.map((skill, index) => (
          <Grid item xs={12} key={skill.id}>
            <Card
              sx={{
                width: { xs: "280px", md: "350px", sm: "450px" },
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "20px",
                background: colors.cardBg,
                borderRadius: "16px",
                border: `1px solid ${colors.borderColor}`,
                mx: "auto",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.6s ease",
                transitionDelay: `${index * 0.1}s`, // تأخير تدريجي
              }}
            >
              <Box sx={{ fontSize: "3rem", color: colors.textColor }}>
                {skill.icon}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: colors.textColor }}
                >
                  {skill.name}
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={inView ? skill.level : 0} // يبدأ من 0 ثم يمتلئ
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: darkMode ? "#333" : "#ccc",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: colors.barColor,
                      transition: "width 1.5s ease", // حركة تعبئة الشريط
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: colors.textColor, fontWeight: "bold" }}
                >
                  {skill.level}%
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider
        sx={{ backgroundColor: colors.borderColor, marginTop: "60px" }}
      />
    </section>
  );
}
