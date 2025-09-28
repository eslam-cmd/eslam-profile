"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "أهلًا! 👋 أنا مساعد موقع إسلام. اسألني عن مهاراته، مشاريعه أو أسلوب عمله.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = data.reply || "لم تصل إجابة.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠ حدث خطأ، حاول مجددًا." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      id="islam-chat"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 360,
        background: "#fff",
        color: "#222",
        borderRadius: 12,
        boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* رأس المحادثة */}
      <div
        style={{
          padding: "14px 16px",
          background: "#0A1F44",
          color: "#fff",
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        💬 مساعد موقع إسلام
        <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 400 }}>
          اسأل عن المهارات، المشاريع أو أسلوب العمل
        </div>
      </div>

      {/* الرسائل */}
      <div
        ref={listRef}
        style={{
          flex: 1,
          maxHeight: 320,
          overflowY: "auto",
          padding: 12,
          background: "#f9f9f9",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              margin: "8px 0",
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: m.role === "user" ? "#0A1F44" : "#e5e5ea",
                color: m.role === "user" ? "#fff" : "#000",
                padding: "10px 14px",
                borderRadius: 16,
                maxWidth: "75%",
                lineHeight: 1.4,
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ fontSize: 13, opacity: 0.7 }}>…جارٍ توليد الرد</div>
        )}
      </div>

      {/* إدخال الرسالة */}
      <div
        style={{
          padding: 10,
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: 8,
          background: "#fff",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="اكتب سؤالك واضغط Enter…"
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            padding: "10px",
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none",
            fontSize: 14,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "0 16px",
            borderRadius: 20,
            background: "#0A1F44",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}