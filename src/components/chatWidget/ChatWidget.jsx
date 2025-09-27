"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "أهلًا! أنا مساعد موقع إسلام. اسألني أي شيء عن مهاراته، مشاريعه، أو أسلوب عمله.",
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

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
        { role: "assistant", content: "حدث خطأ، حاول مجددًا." },
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
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: "12px 16px",
          borderRadius: 999,
          background: "#0A1F44",
          color: "#fff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          border: "none",
          cursor: "pointer",
        }}
        aria-expanded={open}
        aria-controls="islam-chat"
      >
        {open ? "إغلاق المحادثة" : "محادثة إسلام"}
      </button>

      {open && (
        <div
          id="islam-chat"
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 340,
            background: "#0A1F44",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <strong>مساعد موقع إسلام</strong>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              اسأل عن المهارات، المشاريع، أو أسلوب العمل.
            </div>
          </div>

          <div
            ref={listRef}
            style={{ maxHeight: 280, overflowY: "auto", padding: 12 }}
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
                    background:
                      m.role === "user"
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.08)",
                    padding: "8px 10px",
                    borderRadius: 10,
                    maxWidth: "85%",
                  }}
                >
                  <b style={{ opacity: 0.9 }}>
                    {m.role === "user" ? "أنت" : "المساعد"}:
                  </b>{" "}
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ opacity: 0.8, fontSize: 13 }}>…جارٍ توليد الرد</div>
            )}
          </div>

          <div
            style={{
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              gap: 8,
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="اكتب سؤالك واضغط Enter…"
              rows={2}
              style={{
                flex: 1,
                resize: "none",
                padding: 8,
                borderRadius: 8,
                border: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "#3FBF7F",
                color: "#041022",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              إرسال
            </button>
          </div>
        </div>
      )}
    </>
  );
}
