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
        py: 4,
      }}
    >
      {/* التبويبات */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "rgba(212, 175, 55, 0.3)",
          background: "rgba(10, 31, 68, 0.7)",
          mx: { xs: 2, md: 4 },
          borderRadius: "12px 12px 0 0",
          mt: 2,
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
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: 500,
              py: 2,
              px: { xs: 1, sm: 3 },
              minWidth: { xs: "auto", sm: "160px" },
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
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <PublicIcon />
                <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                  Projects Web
                </Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SmartphoneIcon />
                <Box sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                  App Mobile
                </Box>
              </Box>
            }
          />
          <Tab
            href="/"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HomeIcon />
                <Box
                  sx={{
                    ml: 1,
                    display: { xs: "none", sm: "block" },
                    textDecorationLine: "inherit",
                  }}
                >
                  back to home page
                </Box>
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* المحتوى */}
      <Box
        sx={{
          pt: 3,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {value === 0 && (
          <ProjectWeb projects={projects} onOpenModal={handleOpenModal} />
        )}
        {value === 1 && <ProjectApp projectAppData={projectAppData} onOpenModal={handleOpenModal}/>}
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
