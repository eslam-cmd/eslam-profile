"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Divider,
  Link,
  Container,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ProjectWeb({
  toggleTheme,
  darkMode,
  projects,
  onOpenModal,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selectedTech, setSelectedTech] = React.useState("all");

  if (!projects || !Array.isArray(projects)) {
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

  const filteredProjects = projects.filter(
    (project) => selectedTech === "all" || project.tech === selectedTech
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= filteredProjects.length ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = prevIndex - 1;
      return prevIndexValue < 0 ? filteredProjects.length - 1 : prevIndexValue;
    });
  };

  // عدد البطاقات المعروضة في الشاشات الكبيرة
  const getVisibleCardsCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // شاشات كبيرة
  };

  // الحصول على البطاقات المرئية الحالية
  const getVisibleProjects = () => {
    const visibleCount = getVisibleCardsCount();
    const visibleProjects = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % filteredProjects.length;
      visibleProjects.push(filteredProjects[index]);
    }

    return visibleProjects;
  };

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
        {currentIndex + 1} / {filteredProjects.length}
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
    <section
      id="project"
      style={{
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
          Projects Website
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: { xs: 1, sm: 1.5 },
            mb: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 0 },
          }}
        >
          {["all", "htmlcss", "react", "htmlcssjs", "next"].map((category) => (
            <Button
              key={category}
              variant={selectedTech === category ? "contained" : "outlined"}
              onClick={() => {
                setSelectedTech(category);
                setCurrentIndex(0);
              }}
              sx={{
                textTransform: "none",
                padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" },
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                borderRadius: "6px",
                backgroundColor:
                  selectedTech === category ? "#D4AF37" : "#0A1F44",
                color: selectedTech === category ? "#000" : "#fff",
                border:
                  selectedTech === category ? "none" : "1px solid #D4AF37",
                whiteSpace: "nowrap",
                minWidth: "max-content",
                "&:hover": { backgroundColor: "#D4AF37", color: "#000" },
              }}
            >
              {category === "all"
                ? "All"
                : category === "htmlcss"
                ? "HTML/CSS"
                : category === "react"
                ? "React"
                : category === "next"
                ? "Next"
                : "JS"}
            </Button>
          ))}
        </Box>

        {filteredProjects.length === 0 ? (
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
            {/* عرض البطاقات مع التقليب الأفقي */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 2, sm: 3, md: 4 },
                width: "100%",
                position: "relative",
                minHeight: "400px",
              }}
            >
              {/* زر السابق - يظهر في الشاشات المتوسطة والكبيرة */}
              {!isMobile && (
                <IconButton
                  onClick={handlePrev}
                  disabled={filteredProjects.length <= 1}
                  sx={{
                    position: "absolute",
                    left: { sm: 10, md: 20, lg: 40 },
                    zIndex: 10,
                    backgroundColor: "#0A1F44",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    padding: { sm: "12px", md: "16px" },
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                      transform: "scale(1.1)",
                    },
                    "&:disabled": {
                      opacity: 0.3,
                      cursor: "not-allowed",
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

              {/* عرض البطاقات */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 0, sm: 3, md: 0 },
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "900px", md: "1050px" },
                  overflow: "hidden",
                }}
              >
                {getVisibleProjects().map((project, index) => (
                  <Box
                    key={project.id}
                    sx={{
                      flex: isMobile
                        ? "1 1 100%"
                        : `1 1 ${100 / getVisibleCardsCount()}%`,
                      maxWidth: isMobile ? "100%" : "none",
                      minWidth: isMobile ? "100%" : undefined,
                      transition: "all 0.5s ease",
                      transform: isMobile
                        ? "scale(1)"
                        : `scale(${index === 0 ? 1 : 0.95})`,
                      opacity: isMobile ? 1 : index === 0 ? 1 : 0.8,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ProjectCard project={project} onOpenModal={onOpenModal} />
                  </Box>
                ))}
              </Box>

              {/* زر التالي - يظهر في الشاشات المتوسطة والكبيرة */}
              {!isMobile && (
                <IconButton
                  onClick={handleNext}
                  disabled={filteredProjects.length <= 1}
                  sx={{
                    position: "absolute",
                    right: { sm: 10, md: 20, lg: 40 },
                    zIndex: 10,
                    backgroundColor: "#0A1F44",
                    color: "#D4AF37",
                    border: "2px solid #D4AF37",
                    padding: { sm: "12px", md: "16px" },
                    "&:hover": {
                      backgroundColor: "#D4AF37",
                      color: "#000",
                      transform: "scale(1.1)",
                    },
                    "&:disabled": {
                      opacity: 0.3,
                      cursor: "not-allowed",
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

            {/* أزرار التنقل للنقال والأرقام */}
            {isMobile ? (
              <>
                <EnhancedNavigationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
                  disabledPrev={filteredProjects.length <= 1}
                  disabledNext={filteredProjects.length <= 1}
                />
                <NavigationDots
                  count={filteredProjects.length}
                  activeIndex={currentIndex}
                  onDotClick={(index) => setCurrentIndex(index)}
                />
              </>
            ) : (
              // مؤشر التقدم للشاشات الكبيرة
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                  gap: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#D4AF37",
                    fontWeight: "600",
                  }}
                >
                  {currentIndex + 1} of {filteredProjects.length}
                </Typography>
                <NavigationDots
                  count={filteredProjects.length}
                  activeIndex={currentIndex}
                  onDotClick={(index) => setCurrentIndex(index)}
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </section>
  );
}

function ProjectCard({ project, onOpenModal }) {
  return (
    <Card
      sx={{
        maxWidth: { xs: 280, sm: 300, md: 320 },
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        padding: { xs: "8px", sm: "12px" },
        background: "rgba(10, 31, 68, 0.7)",
        borderRadius: { xs: "16px", sm: "20px" },
        boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
        border: "1px solid #D4AF37",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 20px rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={180}
          image={project.photo}
          alt={project.title}
          sx={{ objectFit: "cover", borderRadius: { xs: "12px", sm: "16px" } }}
        />
        <Divider sx={{ backgroundColor: "#D4AF37", my: { xs: 1, sm: 1.5 } }} />
        <CardContent
          sx={{ flexGrow: 1, p: { xs: 1, sm: 2 }, pb: { xs: 1, sm: 2 } }}
        >
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              color: "#D4AF37",
              fontWeight: "600",
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              mb: { xs: 0.5, sm: 1 },
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
        }}
      >
        <Link href={project.linkview} target="_blank" rel="noopener">
          <IconButton size="small">
            <VisibilityIcon
              sx={{ color: "#D4AF37", fontSize: { xs: "20px", sm: "24px" } }}
            />
          </IconButton>
        </Link>
        <IconButton size="small" onClick={() => onOpenModal(project)}>
          <MoreHorizIcon
            sx={{ color: "#D4AF37", fontSize: { xs: "20px", sm: "24px" } }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
