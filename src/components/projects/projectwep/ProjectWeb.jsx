"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Divider,
  Link,
  Container,
  CircularProgress,
  Chip,
  Grow,
  Fade,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CodeIcon from "@mui/icons-material/Code";
import { keyframes } from "@mui/system";

// تأثيرات حركية
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

import projectsData from "../../../data/projectWebData.json";

export default function ProjectWeb({ darkMode, onOpenModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const [direction, setDirection] = React.useState(0);

  if (!projectsData || !Array.isArray(projectsData)) {
    return (
      <Typography
        sx={{
          color: "red",
          textAlign: "center",
          marginTop: "20px",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        Projects data is missing or invalid.
      </Typography>
    );
  }

  const getVisibleCardsCount = React.useCallback(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  }, [isMobile, isTablet]);

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= projectsData.length ? 0 : nextIndex;
    });
  }, [projectsData.length]);

  const handlePrev = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      return prevIndexValue < 0 ? projectsData.length - 1 : prevIndexValue;
    });
  }, [projectsData.length]);

  const getVisibleProjects = React.useCallback(() => {
    const visibleCount = getVisibleCardsCount();
    if (projectsData.length === 0) return [];

    const endIndex = Math.min(currentIndex + visibleCount, projectsData.length);
    return projectsData.slice(currentIndex, endIndex);
  }, [currentIndex, projectsData, getVisibleCardsCount]);

  const handleImageLoad = React.useCallback((projectId) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [projectId]: { loading: false, error: false, loaded: true },
    }));
  }, []);

  const handleImageError = React.useCallback((projectId) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [projectId]: { loading: false, error: true, loaded: false },
    }));
  }, []);

  const handleImageStartLoad = React.useCallback((projectId) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [projectId]: { loading: true, error: false, loaded: false },
    }));
  }, []);

  React.useEffect(() => {
    const visibleProjects = getVisibleProjects();
    visibleProjects.forEach((project) => {
      if (project && project.photo && !imageLoadingStates[project.id]?.loaded) {
        handleImageStartLoad(project.id);
        const img = new Image();
        img.src = project.photo;
        img.onload = () => handleImageLoad(project.id);
        img.onerror = () => handleImageError(project.id);
      }
    });
  }, [getVisibleProjects, handleImageLoad, handleImageError, handleImageStartLoad, imageLoadingStates]);

  const NavigationDots = ({ count, activeIndex, onDotClick }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1.5,
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onDotClick(index)}
          sx={{
            width: activeIndex === index ? 28 : 10,
            height: 10,
            borderRadius: "5px",
            backgroundColor:
              activeIndex === index ? "#D4AF37" : "rgba(255,255,255,0.15)",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.2)",
              backgroundColor:
                activeIndex === index ? "#D4AF37" : "rgba(255,255,255,0.3)",
            },
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box
      component="section"
      id="project-web"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #0A1F44)",
        padding: { xs: "20px 12px", sm: "30px 16px", md: "40px 20px" },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        {/* عنوان القسم المطور */}
        <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4, md: 5 } }}>
          <Chip
            icon={<CodeIcon sx={{ fontSize: 16, color: "#D4AF37" }} />}
            label="WEB PROJECTS"
            sx={{
              bgcolor: "rgba(212, 175, 55, 0.1)",
              color: "#D4AF37",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              fontWeight: 600,
              letterSpacing: "2px",
              fontSize: "11px",
              mb: 2,
              "& .MuiChip-icon": {
                color: "#D4AF37",
              },
            }}
          />
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: "#D4AF37",
              fontWeight: "700",
              letterSpacing: "1px",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
              textTransform: "uppercase",
              textShadow: "0 0 30px rgba(212, 175, 55, 0.2)",
            }}
          >
            Projects Website
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              mt: 1,
              letterSpacing: "1px",
            }}
          >
            ✦ Crafting digital experiences ✦
          </Typography>
        </Box>

        {projectsData.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              color: "#ff5555",
              textAlign: "center",
              mt: 3,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            There are no projects for this section. Projects will be uploaded
            soon.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "relative",
                minHeight: "450px",
                perspective: "1000px",
              }}
            >
              {!isMobile && projectsData.length > getVisibleCardsCount() && (
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: { sm: -15, md: -25, lg: -35 },
                    zIndex: 10,
                    backgroundColor: "rgba(10, 31, 68, 0.9)",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    padding: { sm: "14px", md: "18px" },
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                      transform: "scale(1.1) translateX(-4px)",
                      boxShadow: "0 8px 30px rgba(212, 175, 55, 0.3)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0px 4px 20px rgba(212, 175, 55, 0.15)",
                  }}
                >
                  <ArrowBackIosIcon
                    sx={{ fontSize: { sm: "20px", md: "24px" } }}
                  />
                </IconButton>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                  gap: { xs: 2, sm: 3, md: 4 },
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "600px", md: "1200px" },
                  flexWrap: "nowrap",
                }}
              >
                {getVisibleProjects().map((project, index) => {
                  if (!project) return null;
                  const imageState = imageLoadingStates[project.id] || {
                    loading: false,
                    error: false,
                    loaded: false,
                  };

                  return (
                    <Grow
                      key={project.id}
                      in={true}
                      timeout={400 + index * 100}
                      style={{ transformOrigin: "center" }}
                    >
                      <Box
                        sx={{
                          flex: {
                            xs: "0 0 100%",
                            sm: "0 0 calc(50% - 16px)",
                            md: "0 0 calc(33.333% - 24px)",
                          },
                          display: "flex",
                          justifyContent: "center",
                          animation: `${float} 6s ease-in-out infinite`,
                          animationDelay: `${index * 0.5}s`,
                        }}
                      >
                        <ProjectCard
                          project={project}
                          onOpenModal={onOpenModal}
                          imageState={imageState}
                          onImageLoad={() => handleImageLoad(project.id)}
                          onImageError={() => handleImageError(project.id)}
                        />
                      </Box>
                    </Grow>
                  );
                })}
              </Box>

              {!isMobile && projectsData.length > getVisibleCardsCount() && (
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: { sm: -15, md: -25, lg: -35 },
                    zIndex: 10,
                    backgroundColor: "rgba(10, 31, 68, 0.9)",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    padding: { sm: "14px", md: "18px" },
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                      transform: "scale(1.1) translateX(4px)",
                      boxShadow: "0 8px 30px rgba(212, 175, 55, 0.3)",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0px 4px 20px rgba(212, 175, 55, 0.15)",
                  }}
                >
                  <ArrowForwardIosIcon
                    sx={{ fontSize: { sm: "20px", md: "24px" } }}
                  />
                </IconButton>
              )}
            </Box>

            {/* التنقل السفلي */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    color: "#D4AF37",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <ArrowBackIosIcon sx={{ fontSize: "18px" }} />
                </IconButton>

                <Typography
                  sx={{
                    color: "#D4AF37",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    minWidth: "80px",
                    textAlign: "center",
                  }}
                >
                  {currentIndex + 1} / {projectsData.length}
                </Typography>

                <IconButton
                  onClick={handleNext}
                  sx={{
                    color: "#D4AF37",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    padding: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
                </IconButton>
              </Box>

              <NavigationDots
                count={projectsData.length}
                activeIndex={currentIndex}
                onDotClick={(index) => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

// ===== مكون بطاقة المشروع المطور =====
const ProjectCard = React.memo(
  ({ project, onOpenModal, imageState, onImageLoad, onImageError }) => {
    const { loading, error, loaded } = imageState;

    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: 320, sm: 340, md: 380 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: { xs: "12px", sm: "16px" },
          background: "rgba(10, 31, 68, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: { xs: "20px", sm: "24px" },
          boxShadow: "0px 4px 20px rgba(212, 175, 55, 0.15)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          "&:hover": {
            transform: "translateY(-12px) scale(1.02)",
            boxShadow: "0px 20px 60px rgba(212, 175, 55, 0.2)",
            borderColor: "#D4AF37",
          },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-50%",
            width: "200%",
            height: "200%",
            background: "radial-gradient(circle at 70% 30%, rgba(212,175,55,0.03) 0%, transparent 60%)",
            pointerEvents: "none",
          },
        }}
      >
        <CardActionArea
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            "&:hover .project-image": {
              transform: "scale(1.08)",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: { xs: 180, sm: 200, md: 220 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: { xs: "14px", sm: "18px" },
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {(loading || !loaded) && !error && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 2,
                }}
              >
                <CircularProgress
                  sx={{
                    color: "#D4AF37",
                    width: "45px !important",
                    height: "45px !important",
                  }}
                />
              </Box>
            )}

            {error && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  zIndex: 2,
                  color: "#ff5555",
                  textAlign: "center",
                  p: 2,
                  fontSize: "0.8rem",
                }}
              >
                Failed to load image
              </Box>
            )}

            {!error && (
              <CardMedia
                component="img"
                image={project.photo}
                alt={project.title}
                className="project-image"
                sx={{
                  objectFit: "cover",
                  borderRadius: { xs: "14px", sm: "18px" },
                  width: "100%",
                  height: "100%",
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: loaded ? 1 : 0,
                  position: "relative",
                  zIndex: 1,
                }}
                onLoad={onImageLoad}
                onError={onImageError}
              />
            )}

            {/* شارة التقنيات */}
            {project.tech && project.tech.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  right: 10,
                  zIndex: 3,
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {project.tech.slice(0, 3).map((tech, idx) => (
                  <Chip
                    key={idx}
                    label={tech}
                    size="small"
                    sx={{
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#D4AF37",
                      fontSize: "8px",
                      height: "20px",
                      backdropFilter: "blur(5px)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                    }}
                  />
                ))}
                {project.tech.length > 3 && (
                  <Chip
                    label={`+${project.tech.length - 3}`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "#D4AF37",
                      fontSize: "8px",
                      height: "20px",
                      backdropFilter: "blur(5px)",
                      border: "1px solid rgba(212, 175, 55, 0.2)",
                    }}
                  />
                )}
              </Box>
            )}
          </Box>

          <Divider
            sx={{
              backgroundColor: "rgba(212, 175, 55, 0.2)",
              my: { xs: 1.5, sm: 2 },
              width: "100%",
            }}
          />

          <CardContent
            sx={{
              flexGrow: 1,
              p: { xs: 1, sm: 2 },
              pb: { xs: 1, sm: 1.5 },
              width: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                color: "#D4AF37",
                fontWeight: 700,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                mb: 0.5,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.85rem" },
                color: "#ccc",
                lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{
            justifyContent: "center",
            p: { xs: "8px 12px", sm: "12px 16px" },
            gap: { xs: 1.5, sm: 2.5 },
            borderTop: "1px solid rgba(212, 175, 55, 0.08)",
          }}
        >
          <Link
            href={project.linkview}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <IconButton
              size="small"
              sx={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                bgcolor: "rgba(212, 175, 55, 0.05)",
                borderRadius: "12px",
                padding: "8px",
                "&:hover": {
                  bgcolor: "rgba(212, 175, 55, 0.15)",
                  transform: "scale(1.1) translateY(-2px)",
                },
              }}
            >
              <VisibilityIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: { xs: "22px", sm: "26px" },
                }}
              />
            </IconButton>
          </Link>

          <IconButton
            size="small"
            onClick={() => onOpenModal(project)}
            sx={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              bgcolor: "rgba(212, 175, 55, 0.05)",
              borderRadius: "12px",
              padding: "8px",
              "&:hover": {
                bgcolor: "rgba(212, 175, 55, 0.15)",
                transform: "scale(1.1) translateY(-2px)",
              },
            }}
          >
            <MoreHorizIcon
              sx={{
                color: "#D4AF37",
                fontSize: { xs: "22px", sm: "26px" },
              }}
            />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";