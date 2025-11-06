"use client";
import * as React from "react";
import { Tabs, Tab, Box, useTheme, useMediaQuery } from "@mui/material";
import ProjectWeb from "./projectwep/ProjectWeb";
import ProjectApp from "./projectapp/projectApp";
import ProjectModal from "./projectModal"; // ✅ استدعاء المودال
import PublicIcon from "@mui/icons-material/Public";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import HomeIcon from "@mui/icons-material/Home";

export default function ProjectSection({ projects, projectAppData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);

  // ✅ حالة المودال
  const [selectedProject, setSelectedProject] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ✅ فتح المودال
  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  // ✅ إغلاق المودال
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #000000, #0A1F44)",
        minHeight: "100vh",
        pt: 8, // مساحة للتبويبات الثابتة
      }}
    >
      {/* التبويبات الثابتة في الأعلى */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderBottom: 1,
          borderColor: "rgba(212, 175, 55, 0.3)",
          background: "rgba(10, 31, 68, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            px: { xs: 1, sm: 2, md: 3 },
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
              "& .MuiTabs-indicator": {
                backgroundColor: "#D4AF37",
                height: 3,
                borderRadius: "2px",
              },
              "& .MuiTab-root": {
                color: "#ccc",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                fontWeight: 500,
                py: { xs: 1.5, sm: 2 },
                px: { xs: 0.5, sm: 2, md: 3 },
                minWidth: { xs: "auto", sm: "120px", md: "160px" },
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#D4AF37",
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                },
              },
              "& .Mui-selected": {
                color: "#D4AF37 !important",
                fontWeight: 700,
              },
            }}
          >
            <Tab
              icon={
                <PublicIcon sx={{ fontSize: { xs: "18px", sm: "20px" } }} />
              }
              iconPosition="start"
              label={
                <Box sx={{ ml: 0.5, display: { xs: "none", sm: "block" } }}>
                  Projects Web
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
                <SmartphoneIcon sx={{ fontSize: { xs: "18px", sm: "20px" } }} />
              }
              iconPosition="start"
              label={
                <Box sx={{ ml: 0.5, display: { xs: "none", sm: "block" } }}>
                  App Mobile
                </Box>
              }
              sx={{
                "&.MuiTab-root": {
                  minHeight: { xs: "48px", sm: "64px" },
                },
              }}
            />
            <Tab
              icon={<HomeIcon sx={{ fontSize: { xs: "18px", sm: "20px" } }} />}
              iconPosition="start"
              label={
                <Box sx={{ ml: 0.5, display: { xs: "none", sm: "block" } }}>
                  Back to Home
                </Box>
              }
              component="a"
              href="/"
              sx={{
                "&.MuiTab-root": {
                  minHeight: { xs: "48px", sm: "64px" },
                  textDecoration: "none",
                },
              }}
            />
          </Tabs>
        </Box>
      </Box>

      {/* المحتوى */}
      <Box
        sx={{
          pt: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {value === 0 && (
          <ProjectWeb projects={projects} onOpenModal={handleOpenModal} />
        )}
        {value === 1 && (
          <ProjectApp
            projectAppData={projectAppData}
            onOpenModal={handleOpenModal}
          />
        )}
      </Box>

      {/* ✅ المودال */}
      <ProjectModal
        open={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </Box>
  );
}
