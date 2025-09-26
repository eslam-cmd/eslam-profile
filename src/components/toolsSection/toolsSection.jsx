"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import { cards } from "../../data/skillsData";
import { useTheme } from "@emotion/react";

export default function ToolsSection({ toggleTheme, darkMode }) {
  const theme = useTheme();
  const colors = {
    buttonBg: darkMode ? "#0A1F44" : "#186e96",
    buttonText: darkMode ? "#D4AF37" : "#ffff",
    avatarBorder: "#D4AF37",
    avatarShadow: "rgba(212, 175, 55, 0.3)",
    nameColor: darkMode ? "#D4AF37" : "#186e96",
    glowColor: "#3f51b5",
  };
  return (
    <>
      <section id="skills">
        <Divider
          sx={{ backgroundColor: colors.buttonBg, marginTop: "230px" }}
        />

        <Typography
          className="tools-skils"
          gutterBottom
          sx={{
            textAlign: "center",
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
          }}
        >
          I Work Hard To Improve My Skills Regularly
        </Typography>

        <Grid
          container
          spacing={1.5}
          justifyContent="center"
          sx={{ marginTop: "50px" }}
        >
          {cards.map((card) => (
            <Grid xs={6} sm={4} lg={2} key={card.id}>
              <Card
                sx={{
                  backgroundColor: darkMode ? "#0A1F44" : "#00547aff",
                  boxShadow: darkMode
                    ? "0px 4px 9px rgba(212, 175, 55, 0.2)"
                    : "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  textAlign: "center",
                  width: "150px",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: darkMode
                      ? "0px 6px 15px rgba(212, 175, 55, 0.35)"
                      : "0px 6px 20px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                <CardActionArea>
                  <CardContent
                    className="card-tools"
                    sx={{ textAlign: "center" }}
                  >
                    {card.icon}
                    <Typography
                      className="title-card"
                      variant="body1"
                      sx={{ color: "#ddd", marginTop: "10px" }}
                    >
                      {card.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
}
