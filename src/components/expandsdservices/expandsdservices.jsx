"use client";
import * as React from "react";
import { Card, Grid, Typography, Box, Divider, useTheme } from "@mui/material";

// ✅ استيراد الأيقونات من MUI
import { MdOutlineSettings } from "react-icons/md";
import { MdLightbulbOutline } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";

export default function ExpandSdservices({ toggleTheme, darkMode }) {
  const theme = useTheme();
  const colors = {
    buttonBg: darkMode ? "#0A1F44" : "#186e96",
    buttonText: darkMode ? "#D4AF37" : "#ffff",
    avatarBorder: "#D4AF37",
    avatarShadow: "rgba(212, 175, 55, 0.3)",
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    glowColor: "#3f51b5",
  };
  const services = [
    {
      id: 1,
      title: "Custom Web Development",
      description:
        "Tailoring web solutions to meet unique business needs, leveraging cutting-edge technologies. Your vision, our expertise—let's build something extraordinary.",
      icon: <MdOutlineSettings />,
    },
    {
      id: 2,
      title: "Technical Consultation",
      description:
        "Providing expert guidance on technical strategies and best practices. Navigate complexities and make informed decisions with confidence.",
      icon: <MdLightbulbOutline />,
    },
    {
      id: 3,
      title: "Strategic Project Planning",
      description:
        "Collaborating with clients to define project requirements, milestones, and deliverables. Let's create a roadmap for success and bring your vision to life.",
      icon: <MdOutlineAnalytics />,
    },
  ];

  return (
    <section
      id="Expand Sdservices"
      style={{
        padding: "0px 20px",
      }}
    >
      <Typography
        gutterBottom
        sx={{
          textAlign: "center",
          color: colors.nameColor,
          fontWeight: "700",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.7rem" },
        }}
      >
        Expanded Services
      </Typography>

      <Typography
        gutterBottom
        sx={{
          textAlign: "center",
          maxWidth: "800px",
          margin: "auto",
          marginTop: "12px",
          fontSize: { xs: "1.1rem", sm: "1.4rem", md: "2rem" },
        }}
      >
        Unlock a world of specialized services that distinguish my work and
        elevate your projects to new heights.
      </Typography>

      <Grid mt={10} container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{
                width: { xs: "100%", sm: "80%", md: "400px" },
                height: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: ".5s",
                padding: "40px",
                background: "rgba(10, 31, 68, 0.7)",
                borderRadius: "24px",
                boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.2)",
                border: "1px solid ",
                borderColor: colors.buttonBg,
                textAlign: "center",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: darkMode
                    ? "0px 6px 15px rgba(212, 175, 55, 0.35)"
                    : "0px 6px 28px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Box sx={{ fontSize: "5rem", color: colors.buttonText, mb: 2 }}>
                {service.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: colors.buttonText,
                  mb: 1,
                  fontFamily: "'Parisienne', cursive",
                }}
              >
                {service.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Parisienne', cursive",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  maxWidth: "270px",
                  color: "#ccc",
                }}
              >
                {service.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ backgroundColor: colors.buttonBg, marginTop: "100px" }} />
    </section>
  );
}
