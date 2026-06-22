import { SendIcon, Sparkles, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const AiChat = ({ activePdfTitle }) => {
  async function askGroq(messages, activePdfTitle) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        activePdfTitle,
        messages,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`Groq error: ${res.status}`);
    return data.choices[0].message.content;
  }

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Olá! 👋 Sou seu assistente de estudos. Pode me perguntar sobre qualquer matéria — estou aqui para ajudar!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (open)
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await askGroq(next, activePdfTitle);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "⚠️ Erro ao conectar com a IA. Verifique a chave da API Groq.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 61,

          display: "flex",
          alignItems: "center",
          gap: 8,

          padding: "12px 20px",

          borderRadius: 999,

          fontWeight: 600,
          fontSize: 14,

          background: "#501C2F",
          color: "#fff",

          border: "none",
          cursor: "pointer",

          boxShadow: "0 4px 20px rgba(51,78,104,0.4)",

          transition: "all .25s ease",

          opacity: open ? 0 : 1,

          transform: open ? "scale(.8)" : "scale(1)",

          pointerEvents: open ? "none" : "all",
        }}
      >
        <Sparkles size={20} color="#fff" />
        Assistente IA
      </button>

      {/* Fundo escuro mobile */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",

          zIndex: 58,

          opacity: open && isMobile ? 1 : 0,

          pointerEvents: open && isMobile ? "all" : "none",

          transition: "opacity .25s ease",
        }}
      />

      {/* Chat */}
      <div
        style={{
          position: "fixed",

          bottom: isMobile ? 0 : 24,
          right: isMobile ? 0 : 24,

          left: isMobile ? 0 : "auto",
          top: isMobile ? 0 : "auto",

          zIndex: 60,

          width: isMobile ? "100vw" : 360,

          height: isMobile ? "100vh" : 520,

          display: "flex",
          flexDirection: "column",

          borderRadius: isMobile ? 0 : 20,

          overflow: "hidden",

          background: "#fff",

          border: isMobile ? "none" : "1px solid #E2E8F0",

          boxShadow: isMobile ? "none" : "0 8px 40px rgba(0,0,0,0.18)",

          transition: "transform .25s ease, opacity .25s ease",

          transform: open
            ? "translateY(0)"
            : isMobile
              ? "translateY(100%)"
              : "translateY(30px) scale(.95)",

          opacity: open ? 1 : 0,

          pointerEvents: open ? "all" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: "#501C2F",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={18} color="#fff" />
            <div>
              <p
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Assistente de Estudos
              </p>
              {activePdfTitle && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.65)",
                    maxWidth: 220,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  📖 {activePdfTitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              opacity: 0.7,
              display: "flex",
              padding: 4,
            }}
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            background: "linear-gradient(180deg, #F7F1EB, #EFE5DC, #E6D8CC)",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  fontSize: 13,
                  lineHeight: 1.55,
                  padding: "8px 12px",
                  borderRadius: 16,
                  ...(m.role === "user"
                    ? {
                        background: "#501C2F",
                        color: "#fff",
                        borderBottomRightRadius: 4,
                      }
                    : {
                        background: "#fff",
                        color: "#0F172A",
                        border: "1px solid #E2E8F0",
                        borderBottomLeftRadius: 4,
                      }),
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  fontSize: 13,
                  color: "#501C2F",
                }}
              >
                Digitando…
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "10px 12px",
            borderTop: "1px solid #E2E8F0",
            background: "#fff",
            flexShrink: 0,
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Digite sua dúvida…"
            style={{
              flex: 1,
              resize: "none",
              fontSize: 13,
              borderRadius: 12,
              padding: "8px 12px",
              border: "1px solid #E2E8F0",
              background: "#F8FAFC",
              color: "#0F172A",
              outline: "none",
              fontFamily: "inherit",
              maxHeight: 80,
              overflowY: "auto",
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "#501C2F",
              border: "none",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              opacity: input.trim() && !loading ? 1 : 0.4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              alignSelf: "flex-end",
            }}
          >
            <SendIcon size={16} color="#ffffff" />
          </button>
        </div>
      </div>
    </>
  );
};
