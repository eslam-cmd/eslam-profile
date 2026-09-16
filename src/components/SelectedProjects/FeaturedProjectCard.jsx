"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CodeIcon from "@mui/icons-material/Code";
import FlagIcon from "@mui/icons-material/Flag";
import { keyframes } from "@mui/system";

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

export default function FeaturedProjectCard({
  project,
  darkMode,
  onOpenDetails,
  featured = false,
}) {
  const [imgError, setImgError] = React.useState(false);
  const [currentPhoto, setCurrentPhoto] = React.useState(0);

  const colors = {
    cardBg: darkMode ? "rgba(10, 31, 68, 0.85)" : "rgba(255, 255, 255, 0.98)",
    border: darkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(24, 110, 150, 0.2)",
    accent: darkMode ? "#D4AF37" : "#186e96",
    accentHover: darkMode ? "#FFD700" : "#0f4d68",
    textPrimary: darkMode ? "#ffffff" : "#0A1F44",
    textSecondary: darkMode ? "#b8b8b8" : "#555",
    chipBg: darkMode ? "rgba(212, 175, 55, 0.1)" : "rgba(24, 110, 150, 0.08)",
    chipBorder: darkMode
      ? "rgba(212, 175, 55, 0.25)"
      : "rgba(24, 110, 150, 0.2)",
    imageBg: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)",
  };

  const photos = project.photos?.length > 0 ? project.photos : [null];
  const mainPhoto = photos[currentPhoto];
  const hasMultiple = photos.length > 1;

  // تبديل الصور تلقائياً كل 4 ثواني
  React.useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(() => {
      setCurrentPhoto((p) => (p + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultiple, photos.length]);

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: { xs: 3, sm: 4 },
        overflow: "hidden",
        background: colors.cardBg,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${colors.border}`,
        boxShadow: darkMode
          ? "0 8px 40px rgba(0,0,0,0.5)"
          : "0 8px 40px rgba(24, 110, 150, 0.12)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-10px) scale(1.01)",
          borderColor: colors.accent,
          boxShadow: darkMode
            ? `0 24px 70px rgba(212, 175, 55, 0.25)`
            : `0 24px 70px rgba(24, 110, 150, 0.28)`,
        },
        // شريط علوي مميز للمشاريع Featured
        ...(featured && {
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, ${colors.accent}, #FFD700, ${colors.accent})`,
            backgroundSize: "200% 100%",
            animation: `${shimmer} 3s linear infinite`,
            zIndex: 5,
          },
        }),
      }}
    >
      {/* ═══════════════════════════════════════
          صورة المشروع
      ═══════════════════════════════════════ */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: { xs: "16/10", sm: "16/9" },
          overflow: "hidden",
          backgroundColor: colors.imageBg,
        }}
      >
        {/* شارة Featured */}
        {featured && (
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: 14,
              zIndex: 4,
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              px: 1.4,
              py: 0.6,
              borderRadius: "8px",
              bgcolor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${colors.accent}`,
              boxShadow: `0 4px 15px rgba(212, 175, 55, 0.3)`,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 14, color: colors.accent }} />
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 800,
                color: colors.accent,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Featured
            </Typography>
          </Box>
        )}

        {/* شارة الفئة */}
        {project.category && (
          <Box
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 4,
              px: 1.4,
              py: 0.6,
              borderRadius: "8px",
              bgcolor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              {project.category}
            </Typography>
          </Box>
        )}

        {/* الصورة */}
        {!imgError && mainPhoto ? (
          <Box
            component="img"
            src={mainPhoto}
            alt={project.title}
            onError={() => setImgError(true)}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
              ".MuiCard-root:hover &": {
                transform: "scale(1.08)",
              },
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.textSecondary,
              fontSize: "0.85rem",
            }}
          >
            Image unavailable
          </Box>
        )}

        {/* تدرج سفلي */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 45%, rgba(0,0,0,0.75) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* عدّاد الصور + نقاط التنقل */}
        {hasMultiple && (
          <>
            {/* النقاط */}
            <Box
              sx={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 0.6,
                zIndex: 3,
              }}
            >
              {photos.map((_, idx) => (
                <Box
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhoto(idx);
                  }}
                  sx={{
                    width: idx === currentPhoto ? 22 : 7,
                    height: 7,
                    borderRadius: "4px",
                    backgroundColor:
                      idx === currentPhoto
                        ? colors.accent
                        : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: colors.accent,
                    },
                  }}
                />
              ))}
            </Box>

            {/* عدّاد */}
            <Box
              sx={{
                position: "absolute",
                bottom: 14,
                right: 14,
                zIndex: 3,
                px: 1.2,
                py: 0.5,
                borderRadius: "8px",
                bgcolor: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <CameraAltIcon sx={{ fontSize: 12, color: "#fff" }} />
              <Typography
                sx={{
                  fontSize: "10px",
                  color: "#fff",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                {currentPhoto + 1}/{photos.length}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* ═══════════════════════════════════════
          المحتوى
      ═══════════════════════════════════════ */}
      <CardContent
        sx={{
          flex: 1,
          p: { xs: 2.5, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          animation: `${fadeInUp} 0.6s ease-out`,
        }}
      >
        {/* العنوان */}
        <Typography
          sx={{
            color: colors.textPrimary,
            fontWeight: 800,
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.title}
        </Typography>

        {/* Tagline */}
        {project.tagline && (
          <Typography
            sx={{
              color: colors.accent,
              fontSize: { xs: "0.82rem", sm: "0.9rem" },
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              pl: 1.5,
              borderLeft: `3px solid ${colors.accent}`,
            }}
          >
            {project.tagline}
          </Typography>
        )}

        {/* الوصف */}
        <Typography
          sx={{
            color: colors.textSecondary,
            fontSize: { xs: "0.83rem", sm: "0.9rem" },
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.subtitle}
        </Typography>

        {/* Focus — إن وُجد */}
        {project.focus && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              p: 1.4,
              borderRadius: 1.5,
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.05)"
                : "rgba(24, 110, 150, 0.05)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <FlagIcon
              sx={{
                fontSize: 16,
                color: colors.accent,
                mt: 0.2,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
                fontWeight: 600,
                color: colors.textPrimary,
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.focus}
            </Typography>
          </Box>
        )}

        {/* التقنيات — عرض كامل مع Tooltip */}
        {project.techStack?.length > 0 && (
          <Box sx={{ mt: 0.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                mb: 1,
              }}
            >
              <CodeIcon sx={{ fontSize: 14, color: colors.accent }} />
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: colors.accent,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                Tech Stack
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
              {project.techStack.slice(0, 5).map((tech, i) => (
                <Chip
                  key={i}
                  label={tech}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "10.5px",
                    fontWeight: 600,
                    bgcolor: colors.chipBg,
                    color: colors.accent,
                    border: `1px solid ${colors.chipBorder}`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: darkMode
                        ? "rgba(212, 175, 55, 0.2)"
                        : "rgba(24, 110, 150, 0.15)",
                      transform: "translateY(-2px)",
                      boxShadow: `0 4px 10px rgba(212, 175, 55, 0.15)`,
                    },
                  }}
                />
              ))}

              {project.techStack.length > 5 && (
                <Tooltip
                  title={
                    <Box sx={{ p: 0.5 }}>
                      {project.techStack.slice(5).map((t, i) => (
                        <Typography
                          key={i}
                          sx={{ fontSize: "0.75rem", lineHeight: 1.6 }}
                        >
                          • {t}
                        </Typography>
                      ))}
                    </Box>
                  }
                  arrow
                  placement="top"
                >
                  <Chip
                    label={`+${project.techStack.length - 5} more`}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: "10.5px",
                      fontWeight: 700,
                      bgcolor: "transparent",
                      color: colors.textSecondary,
                      border: `1px dashed ${
                        darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"
                      }`,
                      cursor: "help",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        borderColor: colors.accent,
                        color: colors.accent,
                        bgcolor: colors.chipBg,
                      },
                    }}
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* ═══════════════════════════════════════
          الأزرار
      ═══════════════════════════════════════ */}
      <CardActions
        sx={{
          px: { xs: 2.5, sm: 3 },
          pb: { xs: 2.5, sm: 3 },
          pt: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* زر Details الرئيسي */}
        <Button
          onClick={() => onOpenDetails(project)}
          endIcon={
            <ArrowForwardIcon
              sx={{
                fontSize: 16,
                transition: "transform 0.3s ease",
              }}
            />
          }
          sx={{
            color: colors.accent,
            fontWeight: 700,
            fontSize: { xs: "0.82rem", sm: "0.88rem" },
            textTransform: "none",
            px: 2,
            py: 0.9,
            borderRadius: "10px",
            border: `1.5px solid ${colors.accent}`,
            bgcolor: "transparent",
            letterSpacing: "0.3px",
            "&:hover": {
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.12)"
                : "rgba(24, 110, 150, 0.1)",
              borderColor: colors.accentHover,
              color: colors.accentHover,
              transform: "translateY(-2px)",
              boxShadow: darkMode
                ? "0 6px 20px rgba(212, 175, 55, 0.2)"
                : "0 6px 20px rgba(24, 110, 150, 0.2)",
              "& .MuiSvgIcon-root": {
                transform: "translateX(4px)",
              },
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          View Details
        </Button>

        {/* أزرار GitHub + Live */}
        <Stack direction="row" spacing={0.7}>
          {project.linkgithub && (
            <Tooltip title="View Source Code" arrow>
              <IconButton
                component="a"
                href={project.linkgithub}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: colors.textPrimary,
                  bgcolor: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                  border: `1px solid ${
                    darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
                  }`,
                  width: 38,
                  height: 38,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: colors.accent,
                    bgcolor: darkMode
                      ? "rgba(212, 175, 55, 0.12)"
                      : "rgba(24, 110, 150, 0.1)",
                    borderColor: colors.accent,
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: `0 6px 18px rgba(212, 175, 55, 0.2)`,
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}

          {project.linkview && (
            <Tooltip title="Live Demo" arrow>
              <IconButton
                component="a"
                href={project.linkview}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: darkMode ? "#000" : "#fff",
                  bgcolor: colors.accent,
                  border: `1px solid ${colors.accent}`,
                  width: 38,
                  height: 38,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: colors.accentHover,
                    borderColor: colors.accentHover,
                    transform: "translateY(-3px) scale(1.05)",
                    boxShadow: `0 6px 20px rgba(212, 175, 55, 0.4)`,
                  },
                }}
              >
                <LaunchIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
