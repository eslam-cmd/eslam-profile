"use client";
import { useState, useEffect } from "react";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, comment }),
    });
    const newFeedback = await res.json();
    setFeedbacks((prev) => [newFeedback, ...prev]);
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Leave Your Feedback</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Stars
            </option>
          ))}
        </select>
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Send Feedback</button>
      </form>

      <hr />
      <h3>Customer Feedback</h3>
      {feedbacks.map((f) => (
        <div
          key={f.id}
          style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}
        >
          <strong>{f.name || "Anonymous"}</strong> – {f.rating}⭐
          <p>{f.comment}</p>
        </div>
      ))}
    </div>
  );
}
