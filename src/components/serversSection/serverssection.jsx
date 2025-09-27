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

  const colors = {
    cardBg: darkMode ? "rgba(10, 31, 68, 0.7)" : "#f5f5f5",
    textColor: darkMode ? "#D4AF37" : "#186e96",
    borderColor: darkMode ? "#D4AF37" : "#186e96",
    barColor: darkMode ? "#D4AF37" : "#186e96",
  };

  const skills = [
    { id: 1, name: "React.js", icon: <FaReact />, level: 95 },
    { id: 2, name: "Next.js", icon: <SiNextdotjs />, level: 95 },
    { id: 2, name: "React-Native", icon: <SiReact />, level: 95 },
    { id: 3, name: "JavaScript", icon: <FaJsSquare />, level: 85 },
    { id: 4, name: "TypeScript", icon: <SiTypescript />, level: 80 },
    { id: 5, name: "Express.js", icon: <SiExpress />, level: 90 },
    { id: 6, name: "PostgreSQL", icon: <SiPostgresql />, level: 87 },
  ];

  return (
    <section id="skills" style={{ padding: "80px 20px" }}>
      <Grid container spacing={4} justifyContent="center">
        {skills.map((skill) => (
          <Grid item xs={12}>
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
                transition: ".5s",
                mx: "auto",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: darkMode
                    ? "0px 6px 15px rgba(212, 175, 55, 0.35)"
                    : "0px 6px 20px rgba(0, 0, 0, 0.25)",
                },
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
                  value={skill.level}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: darkMode ? "#333" : "#ccc",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: colors.barColor,
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
