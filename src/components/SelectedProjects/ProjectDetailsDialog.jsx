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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

  const colors = {
    accent: darkMode ? "#D4AF37" : "#186e96",
    textPrimary: darkMode ? "#ffffff" : "#0A1F44",
    textSecondary: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
    bg: darkMode ? "#0c1932" : "#ffffff",
    border: darkMode ? "rgba(212, 175, 55, 0.2)" : "rgba(24, 110, 150, 0.2)",
  };

  const photos = project.photos || [];
  const hasMultiple = photos.length > 1;

  const handlePrev = () => {
    setCurrentPhoto((p) => (p - 1 + photos.length) % photos.length);
  };
  const handleNext = () => {
    setCurrentPhoto((p) => (p + 1) % photos.length);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: { xs: 2, sm: 3 },
          overflow: "hidden",
          maxHeight: { xs: "95vh", sm: "90vh" },
        },
      }}
    >
      {/* شريط علوي بلون التمييز */}
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${colors.accent}, #FFD700, ${colors.accent})`,
        }}
      />

      {/* زر الإغلاق */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 10,
          color: colors.accent,
          bgcolor: darkMode ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)",
          border: `1px solid ${colors.border}`,
          "&:hover": {
            bgcolor: darkMode ? "rgba(0,0,0,0.8)" : "#fff",
            transform: "rotate(90deg)",
          },
          transition: "all 0.3s",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          pt: 3.5,
          px: { xs: 2.5, sm: 4 },
          pb: 1,
          pr: { xs: 7, sm: 8 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.1rem", sm: "1.5rem" },
            fontWeight: 700,
            color: colors.accent,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.78rem", sm: "0.85rem" },
            color: colors.textSecondary,
            fontStyle: "italic",
            mt: 0.5,
          }}
        >
          {project.tagline}
        </Typography>
      </DialogTitle>

      <Divider sx={{ borderColor: colors.border, mx: { xs: 2, sm: 3 } }} />

      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: { xs: 2.5, sm: 3 },
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: colors.accent,
            borderRadius: 3,
          },
        }}
      >
        {/* معرض الصور */}
        {photos.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                border: `1px solid ${colors.border}`,
                bgcolor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)",
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
                    sx={{
                      position: "absolute",
                      left: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      bgcolor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        bgcolor: colors.accent,
                        color: "#000",
                      },
                      width: { xs: 36, sm: 42 },
                      height: { xs: 36, sm: 42 },
                    }}
                  >
                    <ArrowBackIosNewIcon
                      sx={{ fontSize: { xs: 16, sm: 18 } }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={handleNext}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      bgcolor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        bgcolor: colors.accent,
                        color: "#000",
                      },
                      width: { xs: 36, sm: 42 },
                      height: { xs: 36, sm: 42 },
                    }}
                  >
                    <ArrowForwardIosIcon
                      sx={{ fontSize: { xs: 16, sm: 18 } }}
                    />
                  </IconButton>

                  {/* عدّاد الصور */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      px: 1.2,
                      py: 0.4,
                      borderRadius: "6px",
                      bgcolor: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "11px", color: "#fff", fontWeight: 600 }}
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
                  "&::-webkit-scrollbar": { height: 4 },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: colors.border,
                    borderRadius: 3,
                  },
                }}
              >
                {photos.map((p, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentPhoto(idx)}
                    sx={{
                      flexShrink: 0,
                      width: { xs: 56, sm: 70 },
                      height: { xs: 40, sm: 50 },
                      borderRadius: 1,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: `2px solid ${
                        idx === currentPhoto ? colors.accent : "transparent"
                      }`,
                      opacity: idx === currentPhoto ? 1 : 0.55,
                      transition: "all 0.25s ease",
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Box
                      component="img"
                      src={p}
                      alt={`thumb-${idx + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
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
            color: colors.textPrimary,
            fontSize: { xs: "0.88rem", sm: "0.98rem" },
            lineHeight: 1.8,
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
              borderRadius: 2,
              bgcolor: darkMode
                ? "rgba(212, 175, 55, 0.05)"
                : "rgba(24, 110, 150, 0.05)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <AutoAwesomeIcon
              sx={{ color: colors.accent, fontSize: 20, mt: 0.2 }}
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
                  fontSize: { xs: "0.82rem", sm: "0.9rem" },
                  color: colors.textPrimary,
                  fontWeight: 500,
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
                color: colors.accent,
                letterSpacing: "1.5px",
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
                    bgcolor: darkMode
                      ? "rgba(212, 175, 55, 0.08)"
                      : "rgba(24, 110, 150, 0.08)",
                    color: colors.accent,
                    border: `1px solid ${colors.border}`,
                    fontSize: { xs: "0.72rem", sm: "0.78rem" },
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: darkMode
                        ? "rgba(212, 175, 55, 0.18)"
                        : "rgba(24, 110, 150, 0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.25s ease",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* الأزرار */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            pt: 2,
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          {project.linkview && (
            <Button
              variant="contained"
              startIcon={<LaunchIcon />}
              href={project.linkview}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: colors.accent,
                color: darkMode ? "#000" : "#fff",
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: darkMode ? "#FFD700" : "#0f4d68",
                  transform: "translateY(-3px)",
                  boxShadow: darkMode
                    ? "0 8px 25px rgba(212, 175, 55, 0.3)"
                    : "0 8px 25px rgba(24, 110, 150, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Live Demo
            </Button>
          )}

          {project.linkgithub && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={project.linkgithub}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: colors.accent,
                color: colors.accent,
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                py: 1,
                borderRadius: "10px",
                borderWidth: "1.5px",
                "&:hover": {
                  borderWidth: "1.5px",
                  borderColor: colors.accent,
                  bgcolor: darkMode
                    ? "rgba(212, 175, 55, 0.08)"
                    : "rgba(24, 110, 150, 0.08)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s ease",
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
