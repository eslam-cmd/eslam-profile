"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Divider,
  Stack,
  alpha,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const FONT = "'Space Grotesk', 'Inter', system-ui, sans-serif";

export default function ProjectDetailsDialog({
  open,
  project,
  onClose,
  darkMode,
}) {
  const [currentPhoto, setCurrentPhoto] = React.useState(0);

  React.useEffect(() => {
    if (open) setCurrentPhoto(0);
  }, [open, project?.id]);

  if (!project) return null;

  // ───── نفس نظام الألوان الموحّد والتقني ─────
  const colors = {
    bg: darkMode ? "#050a14" : "#ffffff",
    accent: darkMode ? "#D4AF37" : "#186e96",
    accentHover: darkMode ? "#FFD700" : "#0f4d68",
    textPrimary: darkMode ? "#F5F5F5" : "#0A1F44",
    textMuted: darkMode ? alpha("#F5F5F5", 0.6) : alpha("#0A1F44", 0.6),
    border: darkMode ? alpha("#ffffff", 0.08) : alpha("#186e96", 0.15),
    borderHover: darkMode ? alpha("#D4AF37", 0.4) : alpha("#186e96", 0.4),
    tagBg: darkMode ? alpha("#ffffff", 0.03) : alpha("#000000", 0.03),
    tagBorder: darkMode ? alpha("#ffffff", 0.08) : alpha("#000000", 0.08),
    dotColor: darkMode ? "rgba(255,255,255,0.03)" : "rgba(24,110,150,0.06)",
    iconBg: darkMode ? alpha("#ffffff", 0.05) : alpha("#000000", 0.04),
  };

  const photos = project.photos || [];
  const hasMultiple = photos.length > 1;

  const handlePrev = () =>
    setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);
  const handleNext = () => setCurrentPhoto((p) => (p + 1) % photos.length);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: alpha("#020a1a", 0.7),
            backdropFilter: "blur(10px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          fontFamily: FONT,
          "& .MuiTypography-root, & .MuiButton-root, & .MuiChip-root": {
            fontFamily: FONT,
          },
          // خلفية النقاط التقنية
          backgroundImage: `radial-gradient(circle, ${colors.dotColor} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          bgcolor: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: "24px", // حواف ناعمة
          overflow: "hidden",
          maxHeight: { xs: "95vh", sm: "90vh" },
          boxShadow: darkMode
            ? "0 24px 70px rgba(0,0,0,0.6)"
            : "0 24px 70px rgba(24,110,150,0.15)",
          position: "relative",
          m: { xs: 1.5, sm: 3 },
          // إزالة تأثير التدرج القديم
          background: "none",
        },
      }}
    >
      {/* شريط علوي متوهج */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
          opacity: 0.85,
          zIndex: 6,
        }}
      />

      {/* زر الإغلاق */}
      <IconButton
        onClick={onClose}
        aria-label="Close"
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          zIndex: 10,
          color: colors.textPrimary,
          bgcolor: colors.tagBg,
          border: `1px solid ${colors.tagBorder}`,
          p: "6px",
          borderRadius: "8px", // حواف مربعة
          transition:
            "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
          "&:hover": {
            bgcolor: colors.iconBg,
            borderColor: colors.accent,
            color: colors.accent,
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      {/* العنوان */}
      <DialogTitle
        sx={{
          pt: { xs: 4, sm: 4.5 },
          px: { xs: 2.5, sm: 4 },
          pb: 1,
          pr: { xs: 7, sm: 8 },
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.15rem", sm: "1.5rem" },
            fontWeight: 700,
            color: colors.textPrimary,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </Typography>
        {project.tagline && (
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              color: colors.accent,
              fontStyle: "italic",
              fontWeight: 500,
              mt: 0.8,
              pl: 1.2,
              borderLeft: `2px solid ${colors.accent}`,
            }}
          >
            {project.tagline}
          </Typography>
        )}
      </DialogTitle>

      <Divider sx={{ borderColor: colors.border, mx: { xs: 2, sm: 3 } }} />

      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: { xs: 2.5, sm: 3 },
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: colors.border,
            borderRadius: "2px",
          },
        }}
      >
        {/* ═══ معرض الصور ═══ */}
        {photos.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${colors.border}`,
                bgcolor: colors.tagBg,
              }}
            >
              <Box
                component="img"
                src={photos[currentPhoto]}
                alt={`${project.title} - ${currentPhoto + 1}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: { xs: 260, sm: 380, md: 440 },
                  objectFit: "contain",
                  display: "block",
                  mx: "auto",
                }}
              />

              {hasMultiple && (
                <>
                  <IconButton
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    sx={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      bgcolor: alpha("#020a1a", 0.7),
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      width: { xs: 32, sm: 36 },
                      height: { xs: 32, sm: 36 },
                      borderRadius: "8px",
                      transition:
                        "background-color 0.25s ease, color 0.25s ease",
                      "&:hover": {
                        bgcolor: colors.accent,
                        color: darkMode ? "#050a14" : "#fff",
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon
                      sx={{ fontSize: { xs: 14, sm: 16 } }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={handleNext}
                    aria-label="Next photo"
                    sx={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      bgcolor: alpha("#020a1a", 0.7),
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      width: { xs: 32, sm: 36 },
                      height: { xs: 32, sm: 36 },
                      borderRadius: "8px",
                      transition:
                        "background-color 0.25s ease, color 0.25s ease",
                      "&:hover": {
                        bgcolor: colors.accent,
                        color: darkMode ? "#050a14" : "#fff",
                      },
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{ fontSize: { xs: 14, sm: 16 } }}
                    />
                  </IconButton>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      px: 1.2,
                      py: 0.4,
                      borderRadius: "6px",
                      bgcolor: alpha("#020a1a", 0.8),
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${colors.tagBorder}`,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "10px", color: "#fff", fontWeight: 700 }}
                    >
                      {currentPhoto + 1} / {photos.length}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            {/* مصغرات */}
            {hasMultiple && (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 1.5,
                  overflowX: "auto",
                  pb: 0.5,
                  "&::-webkit-scrollbar": { height: "4px" },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: colors.border,
                    borderRadius: "2px",
                  },
                }}
              >
                {photos.map((p, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentPhoto(idx)}
                    sx={{
                      flexShrink: 0,
                      width: { xs: 50, sm: 60 },
                      height: { xs: 36, sm: 44 },
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: `2px solid ${
                        idx === currentPhoto ? colors.accent : "transparent"
                      }`,
                      opacity: idx === currentPhoto ? 1 : 0.5,
                      transition: "opacity 0.25s ease, border-color 0.25s ease",
                    }}
                  >
                    <Box
                      component="img"
                      src={p}
                      alt={`thumb-${idx + 1}`}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        )}

        {/* الوصف */}
        <Typography
          sx={{
            color: colors.textMuted,
            fontSize: { xs: "0.9rem", sm: "0.95rem" },
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          {project.subtitle}
        </Typography>

        {/* Focus */}
        {project.focus && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 2,
              mb: 3,
              borderRadius: "12px",
              bgcolor: colors.tagBg,
              border: `1px solid ${colors.tagBorder}`,
            }}
          >
            <AutoAwesomeIcon
              sx={{
                color: colors.accent,
                fontSize: 18,
                mt: 0.2,
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: colors.accent,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  mb: 0.4,
                }}
              >
                Project Focus
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  color: colors.textPrimary,
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                {project.focus}
              </Typography>
            </Box>
          </Box>
        )}

        {/* التقنيات */}
        {project.techStack?.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                color: colors.textMuted,
                letterSpacing: "1px",
                textTransform: "uppercase",
                mb: 1.2,
              }}
            >
              Technologies
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
              {project.techStack.map((t, i) => (
                <Chip
                  key={i}
                  label={t}
                  size="small"
                  sx={{
                    bgcolor: colors.tagBg,
                    color: colors.textPrimary,
                    border: `1px solid ${colors.tagBorder}`,
                    borderRadius: "6px", // حواف مربعة ناعمة
                    fontSize: { xs: "0.72rem", sm: "0.78rem" },
                    fontWeight: 600,
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* ═══ الأزرار ═══ */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            pt: 2.5,
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {project.linkview && (
            <Button
              variant="contained"
              startIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
              href={project.linkview}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: colors.textPrimary,
                color: darkMode ? "#050a14" : "#fff",
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "none",
                px: 2.5,
                py: 0.8,
                borderRadius: "8px", // حواف ناعمة
                boxShadow: "none",
                transition:
                  "background-color 0.25s ease, border-color 0.25s ease",
                "&:hover": {
                  bgcolor: colors.accent,
                  color: darkMode ? "#050a14" : "#fff",
                  boxShadow: "none",
                },
              }}
            >
              Live Demo
            </Button>
          )}

          {project.linkgithub && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
              href={project.linkgithub}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: colors.border,
                color: colors.textPrimary,
                fontWeight: 600,
                fontSize: "0.85rem",
                textTransform: "none",
                px: 2.5,
                py: 0.8,
                borderRadius: "8px",
                borderWidth: "1px",
                transition:
                  "background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease",
                "&:hover": {
                  borderWidth: "1px",
                  borderColor: colors.accent,
                  bgcolor: colors.tagBg,
                  color: colors.accent,
                },
              }}
            >
              Source Code
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
