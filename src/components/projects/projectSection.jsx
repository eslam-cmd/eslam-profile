"use client";
import * as React from "react";
import {
  Tabs,
  Tab,
  Box,
  useTheme,
  useMediaQuery,
  Chip,
  Fade,
} from "@mui/material";
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

// ✅ تأثير تقليب الصفحات (Page Flip)
const pageFlip = keyframes`
  0% {
    transform: perspective(1000px) rotateY(-90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(1000px) rotateY(0deg);
    opacity: 1;
  }
`;

const pageFlipOut = keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: perspective(1000px) rotateY(90deg);
    opacity: 0;
  }
`;

// ✅ تأثير تقليب الكتب (Book Flip)
const bookFlip = keyframes`
  0% {
    transform: perspective(1200px) rotateY(-180deg) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: perspective(1200px) rotateY(0deg) scale(1);
    opacity: 1;
  }
`;

const bookFlipOut = keyframes`
  0% {
    transform: perspective(1200px) rotateY(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: perspective(1200px) rotateY(180deg) scale(0.8);
    opacity: 0;
  }
`;

export default function ProjectSection({ projects, projectAppData, darkMode }) {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [isFlipping, setIsFlipping] = React.useState(false);

  const handleChange = (event, newValue) => {
    if (newValue !== value) {
      setIsFlipping(true);
      setTimeout(() => {
        setValue(newValue);
        setTimeout(() => {
          setIsFlipping(false);
        }, 100);
      }, 300);
    }
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
      {/* التبويبات الثابتة - بدون ترقيم */}
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
              label="Projects Web"
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
              label="App Mobile"
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

      {/* المحتوى مع تأثير تقليب الكتب */}
      <Box
        sx={{
          pt: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2, md: 3 },
          position: "relative",
          zIndex: 1,
          perspective: "1200px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* مشاريع الويب */}
          <Box
            sx={{
              position: "relative",
              animation:
                isFlipping && value === 0
                  ? `${bookFlip} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                  : isFlipping && value !== 0
                    ? `${bookFlipOut} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                    : value === 0
                      ? `${bookFlip} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                      : "none",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {value === 0 && (
              <Box
                sx={{
                  animation: `${pageFlip} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                  transformOrigin: "left center",
                }}
              >
                <ProjectWeb
                  projects={projects}
                  darkMode={darkMode}
                  onOpenModal={handleOpenModal}
                />
              </Box>
            )}
          </Box>

          {/* مشاريع التطبيقات */}
          <Box
            sx={{
              position: "relative",
              animation:
                isFlipping && value === 1
                  ? `${bookFlip} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                  : isFlipping && value !== 1
                    ? `${bookFlipOut} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                    : value === 1
                      ? `${bookFlip} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
                      : "none",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {value === 1 && (
              <Box
                sx={{
                  animation: `${pageFlip} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                  transformOrigin: "left center",
                }}
              >
                <ProjectApp
                  projectAppData={projectAppData}
                  darkMode={darkMode}
                  onOpenModal={handleOpenModal}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* المودال */}
      <ProjectModal
        open={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      {/* CSS للتأثيرات */}
      <style jsx global>{`
        /* تأثير تقليب الصفحات */
        .page-flip-enter {
          animation: ${pageFlip} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: left center;
        }

        .page-flip-exit {
          animation: ${pageFlipOut} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: left center;
        }

        /* تأثير تقليب الكتب */
        .book-flip-enter {
          animation: ${bookFlip} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        .book-flip-exit {
          animation: ${bookFlipOut} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        /* تحسين العرض على الشاشات الصغيرة */
        @media (max-width: 600px) {
          .book-flip-enter {
            animation-duration: 0.5s;
          }
          .book-flip-exit {
            animation-duration: 0.5s;
          }
          .page-flip-enter {
            animation-duration: 0.5s;
          }
          .page-flip-exit {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </Box>
  );
}
