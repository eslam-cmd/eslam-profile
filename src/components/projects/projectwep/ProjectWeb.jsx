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
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// استيراد ملف الـ JSON
import projectsData from "../../../data/projectWebData.json";

export default function ProjectWeb({ onOpenModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});

  // التحقق من البيانات
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

  // عدد البطاقات المعروضة
  const getVisibleCardsCount = React.useCallback(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  }, [isMobile, isTablet]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= projectsData.length ? 0 : nextIndex;
    });
  }, [projectsData.length]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      return prevIndexValue < 0 ? projectsData.length - 1 : prevIndexValue;
    });
  }, [projectsData.length]);

  // الحصول على المشاريع المرئية - تعرض كل مشروع مرة واحدة
  const getVisibleProjects = React.useCallback(() => {
    const visibleCount = getVisibleCardsCount();

    if (projectsData.length === 0) return [];

    const endIndex = Math.min(currentIndex + visibleCount, projectsData.length);
    return projectsData.slice(currentIndex, endIndex);
  }, [currentIndex, projectsData, getVisibleCardsCount]);

  // إدارة حالة تحميل الصور
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

  // تحميل الصور مسبقاً
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
  }, [
    getVisibleProjects,
    handleImageLoad,
    handleImageError,
    handleImageStartLoad,
    imageLoadingStates,
  ]);

  // مكون نقاط التنقل
  const NavigationDots = ({ count, activeIndex, onDotClick }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onDotClick(index)}
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor:
              activeIndex === index ? "#D4AF37" : "rgba(255,255,255,0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
              backgroundColor:
                activeIndex === index ? "#D4AF37" : "rgba(255,255,255,0.5)",
            },
          }}
        />
      ))}
    </Box>
  );

  // مكون أزرار التنقل
  const EnhancedNavigationButtons = ({
    onPrev,
    onNext,
    disabledPrev,
    disabledNext,
  }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 1, sm: 2 },
        mt: 2,
      }}
    >
      <IconButton
        onClick={onPrev}
        disabled={disabledPrev}
        sx={{
          backgroundColor: "#0A1F44",
          color: "#D4AF37",
          border: "2px solid #D4AF37",
          padding: { xs: "8px", sm: "12px" },
          "&:hover": {
            backgroundColor: "#D4AF37",
            color: "#000",
            transform: "scale(1.1)",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
          transition: "all 0.3s ease",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: { xs: "16px", sm: "20px" } }} />
      </IconButton>

      <Typography
        variant="body2"
        sx={{
          color: "#D4AF37",
          minWidth: { xs: "60px", sm: "80px" },
          textAlign: "center",
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
        }}
      >
        {currentIndex + 1} / {projectsData.length}
      </Typography>

      <IconButton
        onClick={onNext}
        disabled={disabledNext}
        sx={{
          backgroundColor: "#0A1F44",
          color: "#D4AF37",
          border: "2px solid #D4AF37",
          padding: { xs: "8px", sm: "12px" },
          "&:hover": {
            backgroundColor: "#D4AF37",
            color: "#000",
            transform: "scale(1.1)",
          },
          "&:disabled": {
            opacity: 0.5,
            cursor: "not-allowed",
          },
          transition: "all 0.3s ease",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: "16px", sm: "20px" } }} />
      </IconButton>
    </Box>
  );

  return (
    <Box
      component="section"
      id="project"
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
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#D4AF37",
            fontWeight: "700",
            letterSpacing: "1px",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
            textTransform: "uppercase",
            mb: { xs: 2, sm: 3 },
            textShadow: "0 0 30px rgba(212, 175, 55, 0.2)",
          }}
        >
          Projects Website
        </Typography>

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
            {/* عرض بطاقات المشاريع */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                position: "relative",
                minHeight: "420px",
              }}
            >
              {/* زر السهم السابق */}
              {!isMobile && projectsData.length > getVisibleCardsCount() && (
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: { sm: -10, md: -20, lg: -30 },
                    zIndex: 10,
                    backgroundColor: "rgba(10, 31, 68, 0.9)",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    padding: { sm: "12px", md: "16px" },
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: "0px 4px 15px rgba(212, 175, 55, 0.3)",
                  }}
                >
                  <ArrowBackIosIcon
                    sx={{ fontSize: { sm: "20px", md: "24px" } }}
                  />
                </IconButton>
              )}

              {/* حاوية الكروت */}
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
                {getVisibleProjects().map((project) => {
                  if (!project) return null;
                  const imageState = imageLoadingStates[project.id] || {
                    loading: false,
                    error: false,
                    loaded: false,
                  };

                  return (
                    <Box
                      key={project.id}
                      sx={{
                        flex: {
                          xs: "0 0 100%",
                          sm: "0 0 calc(50% - 16px)",
                          md: "0 0 calc(33.333% - 24px)",
                        },
                        display: "flex",
                        justifyContent: "center",
                        transition: "all 0.5s ease",
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
                  );
                })}
              </Box>

              {/* زر السهم التالي */}
              {!isMobile && projectsData.length > getVisibleCardsCount() && (
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: { sm: -10, md: -20, lg: -30 },
                    zIndex: 10,
                    backgroundColor: "rgba(10, 31, 68, 0.9)",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    padding: { sm: "12px", md: "16px" },
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.3s ease",
                    boxShadow: "0px 4px 15px rgba(212, 175, 55, 0.3)",
                  }}
                >
                  <ArrowForwardIosIcon
                    sx={{ fontSize: { sm: "20px", md: "24px" } }}
                  />
                </IconButton>
              )}
            </Box>

            {/* أشرطة التنقل السفلية */}
            {isMobile ? (
              <>
                <EnhancedNavigationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
                  disabledPrev={projectsData.length <= 1}
                  disabledNext={projectsData.length <= 1}
                />
                <NavigationDots
                  count={projectsData.length}
                  activeIndex={currentIndex}
                  onDotClick={(index) => setCurrentIndex(index)}
                />
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#D4AF37",
                    fontWeight: "600",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  {currentIndex + 1} of {projectsData.length}
                </Typography>
                <NavigationDots
                  count={projectsData.length}
                  activeIndex={currentIndex}
                  onDotClick={(index) => setCurrentIndex(index)}
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

// ===== مكون بطاقة المشروع =====
const ProjectCard = React.memo(
  ({ project, onOpenModal, imageState, onImageLoad, onImageError }) => {
    const { loading, error, loaded } = imageState;

    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: 320, sm: 340, md: 360 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: { xs: "10px", sm: "14px" },
          background: "rgba(10, 31, 68, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: { xs: "16px", sm: "20px" },
          boxShadow: "0px 4px 20px rgba(212, 175, 55, 0.15)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          "&:hover": {
            transform: "translateY(-8px) scale(1.01)",
            boxShadow: "0px 12px 40px rgba(212, 175, 55, 0.25)",
            borderColor: "#D4AF37",
          },
        }}
      >
        <CardActionArea
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              position: "relative",
              height: { xs: 160, sm: 180, md: 200 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: { xs: "12px", sm: "16px" },
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* مؤشر تحميل الصور */}
            {(loading || !loaded) && !error && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
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
                    width: "40px !important",
                    height: "40px !important",
                  }}
                />
              </Box>
            )}

            {/* رسالة الخطأ */}
            {error && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
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

            {/* عرض الصورة */}
            {!error && (
              <CardMedia
                component="img"
                height={200}
                image={project.photo}
                alt={project.title}
                sx={{
                  objectFit: "cover",
                  borderRadius: { xs: "12px", sm: "16px" },
                  width: "100%",
                  height: "100%",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: loaded ? 1 : 0,
                  position: "relative",
                  zIndex: 1,
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                onLoad={onImageLoad}
                onError={onImageError}
              />
            )}
          </Box>

          <Divider
            sx={{
              backgroundColor: "rgba(212, 175, 55, 0.3)",
              my: { xs: 1, sm: 1.5 },
              width: "100%",
            }}
          />

          <CardContent
            sx={{
              flexGrow: 1,
              p: { xs: 1, sm: 2 },
              pb: { xs: 1, sm: 2 },
              width: "100%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                color: "#D4AF37",
                fontWeight: "600",
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
                mb: { xs: 0.5, sm: 1 },
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#FFD700",
                },
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                color: "#ccc",
                lineHeight: 1.5,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {project.subtitle}
            </Typography>
            {project.more && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#ff6b6b",
                  mt: { xs: 0.5, sm: 1 },
                  fontWeight: "500",
                }}
              >
                {project.more}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{
            justifyContent: "center",
            p: { xs: "4px 8px", sm: "8px 16px" },
            gap: { xs: 1, sm: 2 },
            borderTop: "1px solid rgba(212, 175, 55, 0.1)",
            pt: { xs: 1, sm: 1.5 },
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
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(212, 175, 55, 0.15)",
                  transform: "scale(1.1)",
                },
              }}
            >
              <VisibilityIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: { xs: "20px", sm: "24px" },
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#FFD700",
                  },
                }}
              />
            </IconButton>
          </Link>

          <IconButton
            size="small"
            onClick={() => onOpenModal(project)}
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                transform: "scale(1.1)",
              },
            }}
          >
            <MoreHorizIcon
              sx={{
                color: "#D4AF37",
                fontSize: { xs: "20px", sm: "24px" },
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#FFD700",
                },
              }}
            />
          </IconButton>
        </CardActions>
      </Card>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
