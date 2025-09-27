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
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { projectAppData } from "../../../data/projectAppData";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ProjectApp({ toggleTheme, darkMode, onOpenModal }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!projectAppData || !Array.isArray(projectAppData)) {
    return (
      <Typography sx={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        Projects data is missing or invalid.
      </Typography>
    );
  }

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
        gap: 1,
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
          padding: "8px",
          "&:hover": {
            backgroundColor: "#D4AF37",
            color: "#000",
            transform: "scale(1.1)",
          },
          "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
          transition: "all 0.3s ease",
        }}
      >
        <ArrowBackIosIcon sx={{ fontSize: "16px" }} />
      </IconButton>

      <Typography
        variant="body2"
        sx={{
          color: "#D4AF37",
          minWidth: "60px",
          textAlign: "center",
          fontSize: "12px",
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
          padding: "8px",
          "&:hover": {
            backgroundColor: "#D4AF37",
            color: "#000",
            transform: "scale(1.1)",
          },
          "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
          transition: "all 0.3s ease",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
      </IconButton>
    </Box>
  );

  return (
    <section
      id="project"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #0A1F44)",
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          mb: 3,
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
            marginTop: "20px",
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
            minHeight: "60vh", // ارتفاع كافٍ لتوسيط الكرت عموديًا
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <ProjectCard
            project={projectAppData[currentIndex]}
            onOpenModal={onOpenModal}
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
        <Grid container spacing={2} justifyContent="center">
          {projectAppData.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
              <ProjectCard project={project} onOpenModal={onOpenModal} />
            </Grid>
          ))}
        </Grid>
      )}
    </section>
  );
}

function ProjectCard({ project, onOpenModal }) {
  return (
    <Card
      sx={{
        maxWidth: { xs: "280px", sm: "300px", md: "320px" },
        width: "100%",
        minWidth: "260px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        padding: "8px",
        background: "rgba(10, 31, 68, 0.7)",
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
        border: "1px solid #D4AF37",
        "&:hover": {
          transform: "translateY(-5px) scale(1.02)",
          boxShadow: "0px 8px 20px rgba(212, 175, 55, 0.4)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={project.photo}
          alt={project.title}
          sx={{ objectFit: "cover", borderRadius: "12px" }}
        />
        <Divider sx={{ backgroundColor: "#D4AF37", marginTop: "8px", my: 1 }} />
        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              color: "#D4AF37",
              fontWeight: "600",
              fontSize: { xs: "1rem", sm: "1.1rem" },
              mb: 1,
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
               overflow:"hidden",
              whiteSpace:"nowrap",
              textOverflow:"ellipsis",
              WebkitLineClamp:2
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
                marginTop: "8px",
              }}
            >
              {project.more}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{ justifyContent: "center", padding: "8px", gap: 1, mt: "auto" }}
      >
        <Link href={project.linkview} target="_blank" rel="noopener">
          <IconButton size="small">
            <DownloadIcon
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
