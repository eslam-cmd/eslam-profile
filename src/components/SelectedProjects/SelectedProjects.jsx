"use client";
import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import featuredProjects from "@/data/featuredProjects.json";
import { useRouter } from "next/navigation";

export default function SelectedProjects({ darkMode }) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = React.useState(null);

  const colors = {
    accent: darkMode ? "#D4AF37" : "#186e96",
    textPrimary: darkMode ? "#ffffff" : "#0A1F44",
    textSecondary: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
  };

  // ✅ عرض مشروعين فقط في الصفحة الرئيسية
  const topProjects = React.useMemo(
    () => featuredProjects.slice(0, 2),
    []
  );

  return (
    <Box
      component="section"
      id="Portfolio"
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* الرأس */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
          <Chip
            icon={
              <AutoAwesomeIcon sx={{ fontSize: 16, color: colors.accent }} />
            }
            label="SELECTED WORK"
            sx={{
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.1)"
                : "rgba(24, 110, 150, 0.08)",
              color: colors.accent,
              border: `1px solid ${
                darkMode
                  ? "rgba(212, 175, 55, 0.2)"
                  : "rgba(24, 110, 150, 0.2)"
              }`,
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: "11px",
              mb: 2,
              "& .MuiChip-icon": { color: colors.accent },
            }}
          />

          <Typography
            variant="h2"
            sx={{
              color: colors.accent,
              fontWeight: 700,
              fontSize: { xs: "1.7rem", sm: "2.2rem", md: "2.8rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              textShadow: darkMode
                ? "0 0 30px rgba(212, 175, 55, 0.15)"
                : "0 0 30px rgba(24, 110, 150, 0.15)",
              mb: 1.5,
            }}
          >
            Featured Projects
          </Typography>

          <Typography
            sx={{
              color: colors.textSecondary,
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
              maxWidth: "620px",
              mx: "auto",
              lineHeight: 1.7,
              px: { xs: 1, sm: 0 },
            }}
          >
            A curated selection of engineering work — from security tooling
            to academic management platforms.
          </Typography>
        </Box>

        {/* ✅ الشبكة: عمودان على الديسكتوب، عمود واحد على الجوال والتابلت */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            },
            gap: { xs: 3, sm: 3.5, md: 4 },
            alignItems: "stretch",
            maxWidth: "1100px",
            mx: "auto",
          }}
        >
          {topProjects.map((project, index) => (
            <Box
              key={project.id}
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <FeaturedProjectCard
                project={project}
                darkMode={darkMode}
                featured={index === 0}
                onOpenDetails={setSelectedProject}
              />
            </Box>
          ))}
        </Box>

     
      </Container>

      {/* Dialog التفاصيل */}
      <ProjectDetailsDialog
        open={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />
    </Box>
  );
}