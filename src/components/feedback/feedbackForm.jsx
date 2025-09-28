"use client";
import { useState } from "react";
import { Box, TextField, Button, Typography, Rating } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
export default function FeedbackForm({ onNewFeedback, darkMode }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // 🎨 ألوان حسب الوضع
  const bg = darkMode ? "#030d1d" : "#f0f9ff";
  const fieldBg = darkMode ? "#0A1F44" : "#e3edf3";
  const textColor = darkMode ? "#fff" : "#1a1a1a";
  const labelColor = darkMode ? "#ccc" : "#444";
  const buttonBg = darkMode ? "#D4AF37" : "#186e96";
  const buttonHover = darkMode ? "#c49e2f" : "#145c7d";
  const shadowColor = darkMode
    ? "0 0 20px rgba(212, 175, 55, 0.3)"
    : "0 0 10px rgba(24, 110, 150, 0.15)";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, comment }),
    });
    if (res.ok) {
      const data = await res.json();
      onNewFeedback({ name, rating, comment, _id: data.id });
      setName("");
      setRating(5);
      setComment("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        backgroundColor: bg,
        padding: 2,
        borderRadius: 8,
        boxShadow: shadowColor,
        maxWidth: "100%",
        margin: "0 15px",
        color: textColor,
      }}
    >
      <TextField
        placeholder="Name"
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="small"
        sx={{ width: 120 }}
        InputProps={{
          style: {
            backgroundColor: fieldBg,
            color: textColor,
            borderRadius: 6,
            fontSize: 14,
          },
        }}
      />

      <TextField
        placeholder="Comment"
        variant="filled"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        size="small"
        sx={{ flexGrow: 1 }}
        InputProps={{
          style: {
            backgroundColor: fieldBg,
            color: textColor,
            borderRadius: 6,
            fontSize: 14,
          },
        }}
      />
      <Rating
        name="rating"
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        precision={1}
        size="medium"
        sx={{ color: "#D4AF37" }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: buttonBg,
          color: "#fff",
          fontWeight: "bold",
          borderRadius: 3,
          textTransform: "none",
          paddingX: 2.5,
          paddingY: 1,
          fontSize: 14,
          "&:hover": { backgroundColor: buttonHover },
        }}
      >
        Send 
        <SendIcon style={{fontSize:"18px"}}/>
      </Button>
    </Box>
  );
}
