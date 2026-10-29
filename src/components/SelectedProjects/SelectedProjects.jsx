"use client";
import * as React from "react";
import { Box, Container, Typography, Button, Chip, alpha, Stack } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import featuredProjects from "../../data/featuredProjects.json";
import { useRouter } from "next/navigation";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

export default function SelectedProjects({ darkMode = false }) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = React.useState(null);

  const colors = {
    accent: darkMode ? "#D4AF37" : "#186e96",
    accentHover: darkMode ? "#FFD700" : "#0f4d68",
    textPrimary: darkMode ? "#F5F5F5" : "#0A1F44",
    textMuted: darkMode ? alpha("#F5F5F5", 0.68) : alpha("#0A1F44", 0.66),
    chipBg: alpha(darkMode ? "#D4AF37" : "#186e96", 0.08),
    border: alpha(darkMode ? "#D4AF37" : "#186e96", 0.22),
  };

  // ✅ عرض مشروعين فقط
  const topProjects = React.useMemo(() => {
    const list = Array.isArray(featuredProjects) ? featuredProjects : [];
    return list.filter((p) => p && p.id != null).slice(0, 2);
  }, []);

  return (
    <Box
      component="section"
      id="Portfolio"
      sx={{
        fontFamily: FONT,
        "& .MuiTypography-root, & .MuiButton-root, & .MuiChip-root":
          { fontFamily: FONT },
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* ═══ الرأس ═══ */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, sm: 5, md: 6 } }}>
          <Chip
            icon={
              <AutoAwesomeIcon sx={{ fontSize: 15, color: colors.accent }} />
            }
            label="SELECTED WORK"
            sx={{
              bgcolor: colors.chipBg,
              color: colors.accent,
              border: `1px solid ${colors.border}`,
              borderRadius: "999px",
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: "11px",
              height: 30,
              px: 0.5,
              mb: 2,
              "& .MuiChip-icon": { color: colors.accent },
            }}
          />

          <Typography
            variant="h2"
            sx={{
              color: colors.accent,
              fontWeight: 700,
              fontSize: { xs: "1.75rem", sm: "2.2rem", md: "2.7rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              mb: 1.5,
            }}
          >
            Featured Projects
          </Typography>

          <Typography
            sx={{
              color: colors.textMuted,
              fontSize: { xs: "0.88rem", sm: "0.95rem", md: "1rem" },
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

        {/* ═══ حالة عدم وجود مشاريع ═══ */}
        {topProjects.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 3,
              borderRadius: "18px",
              bgcolor: colors.chipBg,
              border: `1px dashed ${colors.border}`,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <Typography sx={{ color: colors.textMuted, fontSize: "0.95rem" }}>
              No featured projects to display yet.
            </Typography>
          </Box>
        )}

        {/* ═══ الشبكة ═══ */}
        {topProjects.length > 0 && (
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
        )}

   
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