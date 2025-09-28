"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Skeleton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function FeedbackList({ darkMode }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ألوان حسب الوضع
  const bgCard = darkMode ? "#030d1d" : "#cbe4f0";
  const borderColor = darkMode ? "#D4AF37" : "#186e96";
  const textColor = darkMode ? "#ddd" : "#000";
  const starColor = "#D4AF37";
  const skeletonBg = darkMode ? "#1a2a3d" : "#d0e6f2";
  barColor: darkMode ? "#D4AF37" : "#186e96",
    useEffect(() => {
      fetch("/api/feedback")
        .then((res) => res.json())
        .then((data) => {
          setFeedbacks(data);
          setLoading(false);
        });
    }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        sx={{
          color: starColor,
          mb: 2,
          fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.7rem" },
          justifyContent:"center",
          display:"flex"

        }}
      >
        💬 Customer Feedback
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          margin: "25px 10px",
          paddingBottom: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { height: 4 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: starColor,
            borderRadius: 3,
          },
        }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                sx={{
                  minWidth: 250,
                  backgroundColor: bgCard,
                  borderRadius: 3,
                  scrollSnapAlign: "start",
                  boxShadow: `0 0 10px ${borderColor}40`,
                }}
              >
                <CardContent>
                  <Skeleton
                    variant="text"
                    width="80%"
                    sx={{ bgcolor: skeletonBg }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    sx={{ bgcolor: skeletonBg, mt: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={60}
                    sx={{ bgcolor: skeletonBg, mt: 2 }}
                  />
                </CardContent>
              </Card>
            ))
          : feedbacks.map((f) => (
              <Card
                key={f.id || f._id}
                sx={{
                  minWidth: 250,
                  backgroundColor: bgCard,
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                  borderRadius: 3,
                  scrollSnapAlign: "start",
                  boxShadow: `0 0 10px ${borderColor}60`,
                  transition: "transform 0.3s ease",
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: starColor,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {f.name || "Anonymous"}
                    <Box sx={{ display: "flex" }}>
                      {Array.from({ length: f.rating }).map((_, i) => (
                        <StarIcon
                          key={i}
                          sx={{ fontSize: 18, color: starColor }}
                        />
                      ))}
                    </Box>
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {f.comment}
                  </Typography>
                </CardContent>
              </Card>
            ))}
      </Box>
    </Box>
  );
}
