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
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CodeIcon from "@mui/icons-material/Code";
import FlagIcon from "@mui/icons-material/Flag";
import { keyframes } from "@mui/system";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

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
    cardBg: darkMode ? alpha("#050a14", 0.85) : alpha("#ffffff", 0.9),
    border: darkMode ? alpha("#D4AF37", 0.15) : alpha("#186e96", 0.15),
    borderHover: darkMode ? alpha("#D4AF37", 0.4) : alpha("#186e96", 0.4),
    accent: darkMode ? "#D4AF37" : "#186e96",
    accentHover: darkMode ? "#FFD700" : "#0f4d68",
    textPrimary: darkMode ? "#F5F5F5" : "#0A1F44",
    textMuted: darkMode ? alpha("#F5F5F5", 0.6) : alpha("#0A1F44", 0.6),
    tagBg: darkMode ? alpha("#ffffff", 0.03) : alpha("#000000", 0.03),
    tagBorder: darkMode ? alpha("#ffffff", 0.08) : alpha("#000000", 0.08),
    dotColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    iconBg: darkMode ? alpha("#ffffff", 0.05) : alpha("#000000", 0.04),
    iconHover: darkMode ? alpha("#D4AF37", 0.15) : alpha("#186e96", 0.1),
  };

  const photos = project?.photos?.length > 0 ? project.photos : [null];
  const hasMultiple = photos.length > 1;

  React.useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(() => {
      setCurrentPhoto((p) => (p + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hasMultiple, photos.length]);

  if (!project) return null;

  const mainPhoto = photos[currentPhoto];

  return (
    <Card
      sx={{
        fontFamily: FONT,
        "& .MuiTypography-root, & .MuiButton-root, & .MuiChip-root": {
          fontFamily: FONT,
        },
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "24px",
        overflow: "hidden",
        background: colors.cardBg,
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${colors.border}`,
        boxShadow: darkMode
          ? "0 8px 32px rgba(0,0,0,0.3)"
          : "0 8px 32px rgba(24,110,150,0.06)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        // خلفية تقنية بنقاط ناعمة جداً
        backgroundImage: `radial-gradient(circle, ${colors.dotColor} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
        "&:hover": {
          borderColor: colors.borderHover,
          boxShadow: darkMode
            ? `0 12px 40px ${alpha("#000", 0.4)}`
            : `0 12px 40px ${alpha("#186e96", 0.12)}`,
        },
        ...(featured && {
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
            opacity: 0.85,
            zIndex: 5,
          },
        }),
      }}
    >
      {/* ═══ الصورة ═══ */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: { xs: "16/10", sm: "16/9" },
          overflow: "hidden",
          p: 2, // إضافة مساحة لكي تبدو الصورة كأنها داخل إطار
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            border: `1px solid ${colors.tagBorder}`,
          }}
        >
          {featured && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 4,
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                px: 1.2,
                py: 0.5,
                borderRadius: "8px",
                bgcolor: alpha("#020a1a", 0.8),
                backdropFilter: "blur(10px)",
                border: `1px solid ${colors.border}`,
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 12, color: colors.accent }} />
              <Typography
                sx={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: colors.accent,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Featured
              </Typography>
            </Box>
          )}

          {project.category && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 4,
                px: 1.2,
                py: 0.5,
                borderRadius: "8px",
                bgcolor: alpha("#020a1a", 0.8),
                backdropFilter: "blur(10px)",
                border: `1px solid ${colors.tagBorder}`,
              }}
            >
              <Typography
                sx={{
                  fontSize: "9px",
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
                transition: "transform 0.6s ease",
                ".MuiCard-root:hover &": { transform: "scale(1.04)" },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
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
                color: colors.textMuted,
                fontSize: "0.85rem",
              }}
            >
              Image unavailable
            </Box>
          )}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)",
              pointerEvents: "none",
            }}
          />

          {hasMultiple && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
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
                      width: idx === currentPhoto ? 18 : 6,
                      height: 6,
                      borderRadius: "999px",
                      backgroundColor:
                        idx === currentPhoto
                          ? colors.accent
                          : alpha("#ffffff", 0.5),
                      cursor: "pointer",
                      transition:
                        "background-color 0.25s ease, width 0.25s ease",
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                  zIndex: 3,
                  px: 1,
                  py: 0.4,
                  borderRadius: "6px",
                  bgcolor: alpha("#020a1a", 0.8),
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  border: `1px solid ${colors.tagBorder}`,
                }}
              >
                <CameraAltIcon sx={{ fontSize: 11, color: "#fff" }} />
                <Typography
                  sx={{ fontSize: "9px", color: "#fff", fontWeight: 700 }}
                >
                  {currentPhoto + 1}/{photos.length}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* ═══ المحتوى ═══ */}
      <CardContent
        sx={{
          flex: 1,
          p: { xs: 2, sm: 2.5 },
          pt: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          animation: `${fadeInUp} 0.6s ease-out`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        <Typography
          sx={{
            color: colors.textPrimary,
            fontWeight: 700,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.title}
        </Typography>

        {project.tagline && (
          <Typography
            sx={{
              color: colors.accent,
              fontSize: "0.8rem",
              fontWeight: 500,
              fontStyle: "italic",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              pl: 1.2,
              borderLeft: `2px solid ${colors.accent}`,
            }}
          >
            {project.tagline}
          </Typography>
        )}

        <Typography
          sx={{
            color: colors.textMuted,
            fontSize: "0.85rem",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.subtitle}
        </Typography>

        {project.focus && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              p: 1.2,
              borderRadius: "10px",
              bgcolor: colors.tagBg,
              border: `1px solid ${colors.tagBorder}`,
            }}
          >
            <FlagIcon
              sx={{
                fontSize: 14,
                color: colors.accent,
                mt: 0.2,
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
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

        {/* Tech Stack - مُصمم كأزرار لوحة مفاتيح ناعمة */}
        {project.techStack?.length > 0 && (
          <Box sx={{ mt: 0.5 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1 }}
            >
              <CodeIcon sx={{ fontSize: 14, color: colors.textMuted }} />
              <Typography
                sx={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: colors.textMuted,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Tech Stack
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
              {project.techStack.slice(0, 5).map((tech, i) => (
                <Chip
                  key={i}
                  label={tech}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "10px",
                    fontWeight: 600,
                    bgcolor: colors.tagBg,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.tagBorder}`,
                    borderRadius: "6px", // حواف مربعة ناعمة (مثل لوحة المفاتيح)
                    "& .MuiChip-label": { px: 1 },
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
                    label={`+${project.techStack.length - 5}`}
                    size="small"
                    sx={{
                      height: 24,
                      fontSize: "10px",
                      fontWeight: 700,
                      bgcolor: "transparent",
                      color: colors.textMuted,
                      border: `1px dashed ${colors.tagBorder}`,
                      borderRadius: "6px",
                      cursor: "help",
                    }}
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* ═══ الأزرار ═══ */}
      <CardActions
        sx={{
          px: { xs: 2, sm: 2.5 },
          pb: { xs: 2, sm: 2.5 },
          pt: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={() => onOpenDetails(project)}
          endIcon={
            <ArrowForwardIcon
              sx={{ fontSize: 14, transition: "transform 0.25s ease" }}
            />
          }
          sx={{
            color: colors.textPrimary,
            fontWeight: 600,
            fontSize: "0.8rem",
            textTransform: "none",
            px: 2,
            py: 0.8,
            borderRadius: "8px",
            border: `1px solid ${colors.tagBorder}`,
            bgcolor: colors.tagBg,
            transition:
              "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
            "&:hover": {
              bgcolor: colors.iconHover,
              borderColor: colors.accent,
              color: colors.accent,
            },
          }}
        >
          View Details
        </Button>

        <Stack direction="row" spacing={1}>
          {project.linkgithub && (
            <Tooltip title="Source Code" arrow>
              <IconButton
                component="a"
                href={project.linkgithub}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: colors.textPrimary,
                  bgcolor: colors.tagBg,
                  border: `1px solid ${colors.tagBorder}`,
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  transition:
                    "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                  "&:hover": {
                    color: colors.accent,
                    bgcolor: colors.iconHover,
                    borderColor: colors.accent,
                  },
                }}
              >
                <GitHubIcon sx={{ fontSize: 16 }} />
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
                  color: darkMode ? "#050a14" : "#fff",
                  bgcolor: colors.textPrimary,
                  border: `1px solid ${colors.textPrimary}`,
                  width: 34,
                  height: 34,
                  borderRadius: "8px",
                  transition: "background-color 0.25s ease, color 0.25s ease",
                  "&:hover": {
                    bgcolor: colors.accent,
                    borderColor: colors.accent,
                    color: darkMode ? "#050a14" : "#fff",
                  },
                }}
              >
                <LaunchIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
