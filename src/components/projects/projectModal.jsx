"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
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
          background: "linear-gradient(135deg, #000000, #0A1F44)",
          color: "#fff",
          border: "1px solid #D4AF37",
          borderRadius: 3,
        },
      }}
    >
      {/* Title with close button */}
      <DialogTitle
        sx={{
          fontWeight: "700",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          color: "#D4AF37",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {project.title}
        <IconButton onClick={onClose} sx={{ color: "#D4AF37" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: "rgba(212,175,55,0.3)" }} />

      <DialogContent dividers>
        {/* Project Image */}
        {project.photo && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <img
              src={project.photo}
              alt={project.title}
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "12px",
                border: "2px solid #D4AF37",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        {/* Description */}
        <Typography variant="body1" gutterBottom>
          {project.description}
        </Typography>

        {/* Focus */}
        {project.focus && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>🎯 Focus:</strong> {project.focus}
          </Typography>
        )}

        {/* Tech Stack */}
        {project.techStack && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
            ></Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {/* Tech Stack */}
              {project.techStack && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
                  >
                    🔧 Technologies:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {project.techStack.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: "rgba(212,175,55,0.1)",
                          color: "#D4AF37",
                          border: "1px solid #D4AF37",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Features */}
        {project.features && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
            >
              ✨ Features:
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              {project.features.map((feature, i) => (
                <Box
                  key={i}
                  component="li"
                  sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                >
                  <StarIcon sx={{ fontSize: 16, color: "#D4AF37", mr: 1 }} />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Purpose & Role */}
        {project.purpose && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>🎯 Purpose:</strong> {project.purpose}
          </Typography>
        )}
        {project.role && (
          <Typography variant="body2">
            <strong>👨‍💻 Role:</strong> {project.role}
          </Typography>
        )}

        {/* Links */}
        {/* Links */}
        <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          {/* ✅ شرط لمشاريع الويب */}
          {project.linkview && !project.downloadLink && (
            <Button
              variant="contained"
              startIcon={<LinkIcon />}
              href={project.linkview}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                "&:hover": { bgcolor: "#b8962e" },
              }}
            >
              Live Demo
            </Button>
          )}

          {/* ✅ شرط لمشاريع الموبايل */}
          {project.downloadLink && (
            <Button
              variant="contained"
              startIcon={<SmartphoneIcon />}
              href={project.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#D4AF37",
                color: "#000",
                "&:hover": { bgcolor: "#b8962e" },
              }}
            >
              Download App
            </Button>
          )}

          {/* GitHub link (مشترك) */}
          {project.linkgithub && (
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href={project.linkgithub}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: "#D4AF37",
                color: "#D4AF37",
                "&:hover": {
                  bgcolor: "rgba(212,175,55,0.1)",
                  borderColor: "#D4AF37",
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
};

export default ProjectModal;
