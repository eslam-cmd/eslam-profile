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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";

const ProjectModal = ({ open, onClose, project }) => {
  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          background: "linear-gradient(145deg, #0A0F1E, #0A1F44)",
          color: "#fff",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          borderRadius: 4,
          boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)",
          },
        },
      }}
    >
      {/* زر الإغلاق */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          color: "#D4AF37",
          backgroundColor: "rgba(0,0,0,0.5)",
          "&:hover": {
            backgroundColor: "rgba(212, 175, 55, 0.2)",
            transform: "rotate(90deg)",
          },
          transition: "all 0.3s ease",
          padding: "8px",
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.3rem", sm: "1.8rem" },
          color: "#D4AF37",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pt: 3,
          pb: 2,
          px: { xs: 2, sm: 3 },
          pr: { xs: 6, sm: 6 },
          textShadow: "0 2px 10px rgba(212, 175, 55, 0.2)",
        }}
      >
        <CodeIcon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
        {project.title}
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(212,175,55,0.15)" }} />

      <DialogContent
        dividers
        sx={{
          maxHeight: "65vh",
          overflowY: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255,255,255,0.05)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#D4AF37",
            borderRadius: "3px",
          },
        }}
      >
        {/* صورة المشروع */}
        {project.photo && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
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
                border: "2px solid rgba(212, 175, 55, 0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3))",
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
                }}
              />
            </Box>
          </Box>
        )}

        {/* وصف المشروع */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            lineHeight: 1.7,
            color: "#e0e0e0",
            mb: 2,
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
              gap: 1,
              mt: 2,
              p: 2,
              bgcolor: "rgba(212, 175, 55, 0.05)",
              borderRadius: "12px",
              border: "1px solid rgba(212, 175, 55, 0.1)",
            }}
          >
            <StarIcon sx={{ color: "#D4AF37", fontSize: "1.2rem", mt: 0.2 }} />
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              <strong style={{ color: "#D4AF37" }}>Focus:</strong>{" "}
              {project.focus}
            </Typography>
          </Box>
        )}

        {/* التقنيات المستخدمة */}
        {project.techStack && project.techStack.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#D4AF37",
                fontWeight: 600,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CodeIcon sx={{ fontSize: "1.2rem" }} />
              Technologies Used:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.techStack.map((tech, i) => (
                <Chip
                  key={i}
                  label={tech}
                  size="medium"
                  sx={{
                    bgcolor: "rgba(212, 175, 55, 0.1)",
                    color: "#D4AF37",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.2s ease",
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* المميزات */}
        {project.features && project.features.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#D4AF37",
                fontWeight: 600,
                mb: 1.5,
              }}
            >
              ✨ Key Features:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.features.map((feature, i) => (
                <Chip
                  key={i}
                  label={feature}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    color: "#ccc",
                    border: "1px solid rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: "rgba(212, 175, 55, 0.1)",
                      borderColor: "#D4AF37",
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
            pt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            borderTop: "1px solid rgba(212, 175, 55, 0.1)",
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
                px: 3,
                py: 1,
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#FFD700",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
                },
                transition: "all 0.3s ease",
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
                px: 3,
                py: 1,
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#FFD700",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(212, 175, 55, 0.3)",
                },
                transition: "all 0.3s ease",
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
                borderColor: "#D4AF37",
                color: "#D4AF37",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "rgba(212, 175, 55, 0.1)",
                  borderColor: "#FFD700",
                  color: "#FFD700",
                  transform: "translateY(-2px)",
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
};

export default ProjectModal;
