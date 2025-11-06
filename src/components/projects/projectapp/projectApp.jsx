"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Divider,
  Link,
  CircularProgress,
  Container,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { projectAppData } from "../../../data/projectAppData";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ProjectApp({ toggleTheme, darkMode, onOpenModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});

  if (!projectAppData || !Array.isArray(projectAppData)) {
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

  // تحميل الصور مسبقاً للبيانات
  React.useEffect(() => {
    projectAppData.forEach((project) => {
      if (project.photo && !imageLoadingStates[project.id]?.loaded) {
        handleImageStartLoad(project.id);

        const img = new Image();
        img.src = project.photo;
        img.onload = () => handleImageLoad(project.id);
        img.onerror = () => handleImageError(project.id);
      }
    });
  }, [
    projectAppData,
    handleImageLoad,
    handleImageError,
    handleImageStartLoad,
    imageLoadingStates,
  ]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= projectAppData.length ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      return prevIndexValue < 0 ? projectAppData.length - 1 : prevIndexValue;
    });
  };

  const NavigationDots = ({ count, activeIndex, onDotClick }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        mt: 3,
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
          padding: { xs: "6px", sm: "8px" },
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
        <ArrowBackIosIcon sx={{ fontSize: { xs: "14px", sm: "16px" } }} />
      </IconButton>

      <Typography
        variant="body2"
        sx={{
          color: "#D4AF37",
          minWidth: { xs: "50px", sm: "60px" },
          textAlign: "center",
          fontSize: { xs: "0.7rem", sm: "0.8rem" },
        }}
      >
        {currentIndex + 1} / {projectAppData.length}
      </Typography>

      <IconButton
        onClick={onNext}
        disabled={disabledNext}
        sx={{
          backgroundColor: "#0A1F44",
          color: "#D4AF37",
          border: "2px solid #D4AF37",
          padding: { xs: "6px", sm: "8px" },
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
        <ArrowForwardIosIcon sx={{ fontSize: { xs: "14px", sm: "16px" } }} />
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
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            textTransform: "uppercase",
            mb: { xs: 2, sm: 3 },
          }}
        >
          Projects Mobile App
        </Typography>

        {projectAppData.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              color: "#ff5555",
              textAlign: "center",
              mt: 3,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            There are no projects available. Projects will be uploaded soon.
          </Typography>
        ) : isMobile ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              minHeight: "50vh",
              textAlign: "center",
            }}
          >
            <ProjectCard
              project={projectAppData[currentIndex]}
              onOpenModal={onOpenModal}
              imageState={
                imageLoadingStates[projectAppData[currentIndex]?.id] || {
                  loading: false,
                  error: false,
                  loaded: false,
                }
              }
              onImageLoad={() =>
                handleImageLoad(projectAppData[currentIndex]?.id)
              }
              onImageError={() =>
                handleImageError(projectAppData[currentIndex]?.id)
              }
            />

            <EnhancedNavigationButtons
              onPrev={handlePrev}
              onNext={handleNext}
              disabledPrev={projectAppData.length <= 1}
              disabledNext={projectAppData.length <= 1}
            />

            <NavigationDots
              count={projectAppData.length}
              activeIndex={currentIndex}
              onDotClick={(index) => setCurrentIndex(index)}
            />
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            sx={{ px: { xs: 1, sm: 0 } }}
          >
            {projectAppData.map((project) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={project.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProjectCard
                  project={project}
                  onOpenModal={onOpenModal}
                  imageState={
                    imageLoadingStates[project.id] || {
                      loading: false,
                      error: false,
                      loaded: false,
                    }
                  }
                  onImageLoad={() => handleImageLoad(project.id)}
                  onImageError={() => handleImageError(project.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

const ProjectCard = React.memo(
  ({ project, onOpenModal, imageState, onImageLoad, onImageError }) => {
    const { loading, error, loaded } = imageState;

    // معالجة تحميل الصورة داخل الكارد
    React.useEffect(() => {
      if (project.photo && !loaded && !loading && !error) {
        const img = new Image();
        img.src = project.photo;
        img.onload = onImageLoad;
        img.onerror = onImageError;
      }
    }, [project.photo, loaded, loading, error, onImageLoad, onImageError]);

    return (
      <Card
        sx={{
          width: { xs: 280, sm: 300, md: 320 },
          maxWidth: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s ease",
          padding: { xs: "8px", sm: "12px" },
          background: "rgba(10, 31, 68, 0.85)",
          borderRadius: { xs: "16px", sm: "20px" },
          boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
          border: "2px solid #D4AF37",
          margin: { xs: "0 auto", sm: 0 },
          "&:hover": {
            transform: { xs: "none", sm: "translateY(-5px) scale(1.02)" },
            boxShadow: {
              xs: "0px 4px 10px rgba(212, 175, 55, 0.3)",
              sm: "0px 8px 20px rgba(212, 175, 55, 0.4)",
            },
          },
        }}
      >
        <CardActionArea>
          <Box
            sx={{
              position: "relative",
              height: { xs: 160, sm: 180 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: { xs: "12px", sm: "12px" },
              overflow: "hidden",
            }}
          >
            {/* مؤشر التحميل */}
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
                    width: { xs: "30px !important", sm: "40px !important" },
                    height: { xs: "30px !important", sm: "40px !important" },
                  }}
                />
              </Box>
            )}

            {/* رسالة خطأ */}
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
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: "#ff5555" }}>
                  Failed to load image
                </Typography>
                <Typography variant="caption" sx={{ color: "#ccc" }}>
                  {project.title}
                </Typography>
              </Box>
            )}

            {/* الصورة */}
            {!error && project.photo && (
              <CardMedia
                component="img"
                image={project.photo}
                alt={project.title}
                sx={{
                  objectFit: "cover",
                  borderRadius: { xs: "12px", sm: "12px" },
                  width: "100%",
                  height: "100%",
                  transition: "opacity 0.3s ease",
                  opacity: loaded ? 1 : 0,
                  position: "relative",
                  zIndex: 1,
                }}
                onLoad={onImageLoad}
                onError={onImageError}
              />
            )}

            {/* حالة عدم وجود صورة */}
            {!error && !project.photo && (
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
                  color: "#D4AF37",
                  textAlign: "center",
                  p: 2,
                  fontSize: "0.8rem",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: "#D4AF37" }}>
                  No Image Available
                </Typography>
                <Typography variant="caption" sx={{ color: "#ccc" }}>
                  {project.title}
                </Typography>
              </Box>
            )}
          </Box>

          <Divider
            sx={{
              backgroundColor: "#D4AF37",
              my: { xs: 1, sm: 1.5 },
            }}
          />

          <CardContent
            sx={{
              flexGrow: 1,
              p: { xs: 1, sm: 2 },
              pb: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                color: "#D4AF37",
                fontWeight: "600",
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                mb: { xs: 0.5, sm: 1 },
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                color: "#ccc",
                lineHeight: 1.4,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                minHeight: { xs: "3.2em", sm: "3.6em" },
              }}
            >
              {project.description}
            </Typography>
            {project.more && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  color: "#db1515ff",
                  mt: { xs: 0.5, sm: 1 },
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
            p: { xs: "4px", sm: "8px" },
            gap: { xs: 1, sm: 2 },
            mt: "auto",
          }}
        >
          <Link
            href={project.linkview}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              size="small"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                },
              }}
            >
              <DownloadIcon
                sx={{
                  color: "#D4AF37",
                  fontSize: { xs: "20px", sm: "24px" },
                }}
              />
            </IconButton>
          </Link>
          <IconButton
            size="small"
            onClick={() => onOpenModal(project)}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(212, 175, 55, 0.1)",
              },
            }}
          >
            <MoreHorizIcon
              sx={{
                color: "#D4AF37",
                fontSize: { xs: "20px", sm: "24px" },
              }}
            />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
