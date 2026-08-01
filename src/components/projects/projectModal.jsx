"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
  Fade,
  Grow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";
import { keyframes } from "@mui/system";

// تأثيرات حركية
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.1); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.2); }
`;

const ProjectModal = ({ open, onClose, project }) => {
  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Fade}
      transitionDuration={400}
      PaperProps={{
        sx: {
          background: "linear-gradient(145deg, #0A0F1E, #0A1F44)",
          color: "#fff",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          borderRadius: 4,
          boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 60px rgba(212,175,55,0.05)",
          overflow: "hidden",
          position: "relative",
          animation: `${pulseGlow} 3s ease-in-out infinite`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #D4AF37, #FFD700, #f5d76e, #D4AF37)",
            backgroundSize: "200% 100%",
            animation: `${shimmer} 2s linear infinite`,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
          },
        },
      }}
    >
      {/* زر الإغلاق المطور */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          color: "#D4AF37",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.2)",
            transform: "rotate(90deg) scale(1.1)",
            borderColor: "#D4AF37",
          },
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "10px",
        }}
      >
        <CloseIcon sx={{ fontSize: "20px" }} />
      </IconButton>

      {/* العنوان المطور */}
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.3rem", sm: "1.8rem" },
          color: "#D4AF37",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pt: 3.5,
          pb: 2,
          px: { xs: 2.5, sm: 4 },
          pr: { xs: 6, sm: 6 },
          textShadow: "0 2px 20px rgba(212, 175, 55, 0.15)",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(212, 175, 55, 0.1)",
            borderRadius: "12px",
            p: 1,
            border: "1px solid rgba(212, 175, 55, 0.15)",
          }}
        >
          <CodeIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, color: "#D4AF37" }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {project.title}
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 400,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Project Details
          </Typography>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(212,175,55,0.08)", mx: 2 }} />

      <DialogContent
        dividers
        sx={{
          maxHeight: "65vh",
          overflowY: "auto",
          px: { xs: 2.5, sm: 4 },
          py: { xs: 2.5, sm: 3.5 },
          borderColor: "rgba(212,175,55,0.08)",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.03)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #D4AF37, #f5d76e)",
            borderRadius: "3px",
          },
        }}
      >
        {/* صورة المشروع */}
        {project.photo && (
          <Grow in={true} timeout={600}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3.5,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "600px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "2px solid rgba(212, 175, 55, 0.2)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
                  transition: "all 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.01)",
                    borderColor: "rgba(212, 175, 55, 0.4)",
                    boxShadow: "0 12px 60px rgba(212,175,55,0.15)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)",
                    pointerEvents: "none",
                  },
                }}
              >
                <img
                  src={project.photo}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = "/fallback-project.png";
                  }}
                  style={{
                    width: "100%",
                    maxHeight: "350px",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.6s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                {/* شارة مميزة فوق الصورة */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    bgcolor: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.5,
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <StarIcon sx={{ fontSize: 14, color: "#D4AF37" }} />
                  <Typography sx={{ fontSize: "10px", color: "#D4AF37", fontWeight: 600 }}>
                    Featured
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grow>
        )}

        {/* وصف المشروع */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            lineHeight: 1.8,
            color: "#e8e8e8",
            mb: 2.5,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.2px",
          }}
        >
          {project.subtitle || project.description}
        </Typography>

        {/* التركيز */}
        {project.focus && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              mt: 2,
              mb: 2.5,
              p: 2.5,
              bgcolor: "rgba(212, 175, 55, 0.04)",
              borderRadius: "14px",
              border: "1px solid rgba(212, 175, 55, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(212, 175, 55, 0.06)",
                borderColor: "rgba(212, 175, 55, 0.15)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(212, 175, 55, 0.1)",
                borderRadius: "50%",
                p: 1,
                minWidth: "36px",
                minHeight: "36px",
              }}
            >
              <StarIcon sx={{ color: "#D4AF37", fontSize: "1.2rem" }} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ color: "#aaa", fontSize: "0.75rem", mb: 0.3 }}>
                Project Focus
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0", fontWeight: 500 }}>
                {project.focus}
              </Typography>
            </Box>
          </Box>
        )}

        {/* التقنيات المستخدمة */}
        {project.techStack && project.techStack.length > 0 && (
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#D4AF37",
                fontWeight: 600,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "0.9rem",
              }}
            >
              <CodeIcon sx={{ fontSize: "1.2rem" }} />
              Technologies
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.techStack.map((tech, i) => (
                <Chip
                  key={i}
                  label={tech}
                  size="medium"
                  sx={{
                    bgcolor: "rgba(212, 175, 55, 0.08)",
                    color: "#D4AF37",
                    border: "1px solid rgba(212, 175, 55, 0.15)",
                    fontWeight: 500,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.18)",
                      transform: "translateY(-3px) scale(1.03)",
                      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.15)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* المميزات */}
        {project.features && project.features.length > 0 && (
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#D4AF37",
                fontWeight: 600,
                mb: 1.5,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              ✨ Features
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.features.map((feature, i) => (
                <Chip
                  key={i}
                  label={feature}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.03)",
                    color: "#ccc",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.08)",
                      borderColor: "rgba(212, 175, 55, 0.2)",
                      color: "#D4AF37",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* أزرار الإجراءات */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            borderTop: "1px solid rgba(212, 175, 55, 0.08)",
          }}
        >
          {project.linkview && project.linkview !== "#" && (
            <Button
              variant="contained"
              startIcon={<LinkIcon />}
              href={project.linkview}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                fontWeight: 600,
                px: 3.5,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  bgcolor: "#FFD700",
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 30px rgba(212, 175, 55, 0.3)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Live Demo
            </Button>
          )}

          {project.downloadLink && project.downloadLink !== "#" && (
            <Button
              variant="contained"
              startIcon={<SmartphoneIcon />}
              href={project.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                fontWeight: 600,
                px: 3.5,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  bgcolor: "#FFD700",
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 30px rgba(212, 175, 55, 0.3)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Download App
            </Button>
          )}

          {project.linkgithub && project.linkgithub !== "#" && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={project.linkgithub}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: "rgba(212, 175, 55, 0.4)",
                color: "#D4AF37",
                fontWeight: 600,
                px: 3.5,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "0.9rem",
                "&:hover": {
                  bgcolor: "rgba(212, 175, 55, 0.08)",
                  borderColor: "#FFD700",
                  color: "#FFD700",
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow: "0 8px 25px rgba(212, 175, 55, 0.15)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Source Code
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;