"use client";
import * as React from "react";
import { Card, Grid, Typography, Box, Divider, useTheme } from "@mui/material";

// ✅ استيراد الأيقونات
import { MdOutlineSettings } from "react-icons/md";
import { MdLightbulbOutline } from "react-icons/md";
import { MdOutlineAnalytics } from "react-icons/md";

export default function ExpandSdservices({ toggleTheme, darkMode }) {
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
      ref={sectionRef}
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
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "2.7rem" },
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
          fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem", lg: "1.5rem" },
          px: 2,
        }}
      >
        Unlock a world of specialized services that distinguish my work and
        elevate your projects to new heights.
      </Typography>

      <Grid
        mt={{ xs: 6, sm: 8, md: 10 }}
        container
        spacing={{ xs: 3, sm: 4 }}
        justifyContent="center"
      >
        {services.map((service, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={service.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: {
                  xs: "100%",
                  sm: "90%",
                  md: "380px",
                  lg: "400px",
                  xl: "420px",
                },
                height: {
                  xs: 320,
                  sm: 360,
                  md: 380,
                  lg: 400,
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: {
                  xs: "20px",
                  sm: "30px",
                  md: "40px",
                },
                background: "rgba(10, 31, 68, 0.7)",
                borderRadius: "24px",
                boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.2)",
                border: "1px solid",
                borderColor: colors.buttonBg,
                textAlign: "center",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.6s ease",
                transitionDelay: `${index * 0.15}s`,
                "&:hover": {
                  transform: {
                    xs: "none",
                    sm: "translateY(-8px)",
                  },
                  boxShadow: darkMode
                    ? "0px 6px 15px rgba(212, 175, 55, 0.35)"
                    : "0px 6px 28px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: {
                    xs: "3.5rem",
                    sm: "4rem",
                    md: "4.5rem",
                    lg: "5rem",
                  },
                  color: colors.buttonText,
                  mb: { xs: 1, sm: 2 },
                }}
              >
                {service.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: "800",
                  color: colors.buttonText,
                  mb: 1,
                  fontFamily: "Arial",
                  letterSpacing: { xs: "1px", sm: "2px" },
                  fontSize: {
                    xs: "1.1rem",
                    sm: "1.2rem",
                    md: "1.3rem",
                    lg: "1.4rem",
                  },
                  lineHeight: 1.2,
                }}
              >
                {service.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Arial",
                  fontSize: {
                    xs: "0.85rem",
                    sm: "0.95rem",
                    md: "1rem",
                    lg: "1.1rem",
                  },
                  lineHeight: { xs: 1.4, sm: 1.6 },
                  maxWidth: { xs: "100%", sm: "270px" },
                  color: "#ccc",
                  letterSpacing: { xs: "0.5px", sm: "1px" },
                  fontWeight: "600",
                }}
              >
                {service.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider
        sx={{
          backgroundColor: colors.buttonBg,
          marginTop: { xs: "60px", sm: "80px", md: "100px" },
        }}
      />
    </section>
  );
}
