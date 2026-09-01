"use client";
import * as React from "react";
import { Tabs, Tab, Box, useTheme, useMediaQuery, Chip, Fade } from "@mui/material";
import ProjectWeb from "./projectwep/ProjectWeb";
import ProjectApp from "./projectapp/projectApp";
import ProjectModal from "./projectModal";
import PublicIcon from "@mui/icons-material/Public";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";
import { keyframes } from "@mui/system";
import { useRouter } from "next/navigation";

// تأثيرات حركية
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

export default function ProjectSection({ projects, projectAppData, darkMode }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const webCount = projects?.length || 0;
  const appCount = projectAppData?.length || 0;

  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #000000, #0A1F44)",
        minHeight: "100vh",
        pt: { xs: "70px", sm: "80px", md: "90px" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* التبويبات الثابتة */}
      <Box
        sx={{
          position: "fixed",
          top: { xs: 0, sm: 0 },
          left: 0,
          right: 0,
          zIndex: 1000,
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
          background: "rgba(10, 31, 68, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            px: { xs: 1.5, sm: 3, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            centered={!isMobile}
            variant={isMobile ? "fullWidth" : "standard"}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              flex: 1,
              "& .MuiTabs-indicator": {
                backgroundColor: "#D4AF37",
                height: 3,
                borderRadius: "2px",
              },
              "& .MuiTab-root": {
                color: "#ccc",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                fontWeight: 500,
                py: { xs: 1.5, sm: 2 },
                px: { xs: 1, sm: 2.5, md: 3.5 },
                minWidth: { xs: "auto", sm: "140px", md: "180px" },
                minHeight: { xs: "48px", sm: "56px", md: "64px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#D4AF37",
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                },
                "&.Mui-selected": {
                  color: "#D4AF37 !important",
                  fontWeight: 700,
                },
              },
            }}
          >
            <Tab
              icon={
                <PublicIcon
                  sx={{
                    fontSize: { xs: "18px", sm: "20px" },
                    ...(value === 0 && { color: "#D4AF37" }),
                  }}
                />
              }
              iconPosition="start"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    Projects Web
                  </Box>
                  <Chip
                    label={webCount}
                    size="small"
                    sx={{
                      bgcolor: value === 0 ? "#D4AF37" : "rgba(255,255,255,0.1)",
                      color: value === 0 ? "#000" : "#D4AF37",
                      fontWeight: 600,
                      fontSize: "10px",
                      height: "18px",
                      minWidth: "18px",
                      "& .MuiChip-label": {
                        px: 0.8,
                      },
                    }}
                  />
                </Box>
              }
              sx={{
                "&.MuiTab-root": {
                  minHeight: { xs: "48px", sm: "64px" },
                },
              }}
            />
            <Tab
              icon={
                <SmartphoneIcon
                  sx={{
                    fontSize: { xs: "18px", sm: "20px" },
                    ...(value === 1 && { color: "#D4AF37" }),
                  }}
                />
              }
              iconPosition="start"
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    App Mobile
                  </Box>
                  <Chip
                    label={appCount}
                    size="small"
                    sx={{
                      bgcolor: value === 1 ? "#D4AF37" : "rgba(255,255,255,0.1)",
                      color: value === 1 ? "#000" : "#D4AF37",
                      fontWeight: 600,
                      fontSize: "10px",
                      height: "18px",
                      minWidth: "18px",
                      "& .MuiChip-label": {
                        px: 0.8,
                      },
                    }}
                  />
                </Box>
              }
              sx={{
                "&.MuiTab-root": {
                  minHeight: { xs: "48px", sm: "64px" },
                },
              }}
            />
          </Tabs>

          {/* زر Home */}
          <Box
            onClick={handleHomeClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#ccc",
              cursor: "pointer",
              transition: "all 0.3s ease",
              px: 1.5,
              py: 1,
              borderRadius: "10px",
              "&:hover": {
                color: "#D4AF37",
                backgroundColor: "rgba(212, 175, 55, 0.1)",
                transform: "scale(1.05)",
              },
            }}
          >
            <HomeIcon sx={{ fontSize: { xs: "20px", sm: "22px" } }} />
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              Home
            </Box>
          </Box>
        </Box>
      </Box>

      {/* المحتوى */}
      <Box
        sx={{
          pt: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2, md: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Fade in={value === 0} timeout={400} unmountOnExit>
          <Box>
            {value === 0 && (
              <ProjectWeb
                projects={projects}
                darkMode={darkMode}
                onOpenModal={handleOpenModal}
              />
            )}
          </Box>
        </Fade>

        <Fade in={value === 1} timeout={400} unmountOnExit>
          <Box>
            {value === 1 && (
              <ProjectApp
                projectAppData={projectAppData}
                darkMode={darkMode}
                onOpenModal={handleOpenModal}
              />
            )}
          </Box>
        </Fade>
      </Box>

      {/* المودال */}
      <ProjectModal
        open={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </Box>
  );
}