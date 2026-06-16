import { BookIcon, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BOOKS } from "./utils/books";
import { CHANNELS } from "./utils/channels";
import favicon from "../public/favicon.png";

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Icons ────────────────────────────────────────────────────────────────────

function XIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function SendIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function SearchIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function ChevronLeftIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ─── Book Card ────────────────────────────────────────────────────────────────
function BookCard({ book, onOpen }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      onClick={() => onOpen(book)}
      style={{
        background: "#ffffff",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Cover */}
      <div
        style={{
          position: "relative",
          aspectRatio: "2/3",
          overflow: "hidden",
          background: "#F1F5F9",
        }}
      >
        {!imgError ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#334E68",
            }}
          >
            <BookIcon size={40} color="#ffffff" />
          </div>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          padding: "14px 14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.4,
            color: "#0F172A",
          }}
        >
          {book.title}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: "#475569",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.authors}
        </p>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 8,
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          {book.disciplines.map((d) => (
            <span
              key={d}
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 999,
                fontWeight: 500,
                background: "#F1F5F9",
                color: "#334E68",
                border: "1px solid #CBD5E1",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PDF Modal ────────────────────────────────────────────────────────────────
function PdfModal({ book, onClose }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const [pdfLoading, setPdfLoading] = useState(true);
  // when the modal mounts its `pdfLoading` state starts as `true`
  // we avoid calling setState inside an effect to silence the linter

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "#0F172A",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 16px",
          background: "#334E68",
          borderBottom: "1px solid #43617A",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 500,
            padding: "6px 12px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.15)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ChevronLeftIcon size={16} />
          Voltar
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {book.title}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "rgba(255,255,255,0.65)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {book.authors}
          </p>
        </div>
      </div>
      {/* PDF */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {pdfLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#F1F5F9",
              zIndex: 10,
            }}
          >
            <div className="spinner" />
            <p style={{ margin: 8, fontSize: 14, color: "#0F172A" }}>
              Abrindo PDF…
            </p>
          </div>
        )}
        <iframe
          src={`${book.pdfUrl}#toolbar=1&navpanes=0`}
          title={book.title}
          onLoad={() => setPdfLoading(false)}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

// ─── AI Chat ──────────────────────────────────────────────────────────────────
function AIChat({ activePdfTitle }) {
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

          background: "#334E68",
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
            background: "#334E68",
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
            background: "#F8FAFC",
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
                        background: "#334E68",
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
                  color: "#64748B",
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
              background: "#334E68",
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
            <SendIcon size={16} color="#fff" />
          </button>
        </div>
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeDiscipline, setActiveDiscipline] = useState("Todas");
  const [search, setSearch] = useState("");
  const [openBook, setOpenBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  useEffect(() => {
    // simulate async loading (swap with real fetch if needed)
    const t = setTimeout(() => {
      setBooks(BOOKS);
      setLoadingBooks(false);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const filteredBooks = books.filter((b) => {
    const matchesDiscipline =
      activeDiscipline === "Todas" || b.disciplines.includes(activeDiscipline);
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.authors.toLowerCase().includes(q) ||
      b.disciplines.some((d) => d.toLowerCase().includes(q));
    return matchesDiscipline && matchesSearch;
  });

  const ALL_DISCIPLINES = [
    "Todas",
    ...Array.from(new Set(books.flatMap((b) => b.disciplines))).sort(),
  ];

  function mapDisciplineToSubjectKey(d) {
    if (!d) return null;
    const normalize = (str) =>
      String(str)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const nd = normalize(d);
    const channelSubjects = Array.from(
      new Set(CHANNELS.map((c) => normalize(c.subject))),
    );

    const found = channelSubjects.find((cs) => nd === cs || nd.includes(cs));
    if (found) return found;

    // fallback heuristics
    if (nd.includes("port")) return "portugues";
    if (nd.includes("espan")) return "espanhol";
    if (nd.includes("redac")) return "redacao";
    if (nd.includes("educ") && nd.includes("fis")) return "educacao fisica";
    if (nd.includes("fisic") || nd.includes("fisica")) return "fisica";
    if (nd.includes("mat")) return "matematica";
    if (nd.includes("bio")) return "biologia";
    if (nd.includes("quim")) return "quimica";
    if (nd.includes("hist")) return "historia";
    if (nd.includes("geog") || nd.includes("geografia")) return "geografia";
    if (nd.includes("filos")) return "filosofia";
    if (nd.includes("soci")) return "sociologia";
    if (nd.includes("arte")) return "artes";
    if (nd.includes("ingles")) return "ingles";

    return nd;
  }

  let activeSubjectKey = null;
  if (activeDiscipline !== "Todas") {
    activeSubjectKey = mapDisciplineToSubjectKey(activeDiscipline);
  } else if (search.trim() !== "") {
    // try to match a discipline by search text
    const q = search.toLowerCase();
    const matched = ALL_DISCIPLINES.find((d) => d.toLowerCase().includes(q));
    if (matched && matched !== "Todas")
      activeSubjectKey = mapDisciplineToSubjectKey(matched);
    else if (filteredBooks.length > 0)
      activeSubjectKey = mapDisciplineToSubjectKey(
        filteredBooks[0].disciplines[0],
      );
  }
  const normalize = (str) =>
    String(str)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const subjectChannels = activeSubjectKey
    ? CHANNELS.filter((c) => normalize(c.subject) === activeSubjectKey).slice(
        0,
        2,
      )
    : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F1F5F9",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "#334E68",
          borderBottom: "1px solid #43617A",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img src={favicon} alt="Favicon" />
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.3px",
            }}
          >
            Biblioteca Do Estudante
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <div
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#64748B",
            }}
          >
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título, autor ou matéria…"
            style={{
              width: "100%",
              paddingLeft: 42,
              paddingRight: 16,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 12,
              fontSize: 14,
              border: "1px solid #E2E8F0",
              background: "#fff",
              color: "#0F172A",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              fontFamily: "inherit",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#334E68")}
            onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
          />
        </div>

        {/* Filters */}
        <div
          className="filter-strip"
          style={{ overflowX: "auto", marginBottom: 20, paddingBottom: 8 }}
        >
          <div style={{ display: "flex", gap: 8, width: "max-content" }}>
            {ALL_DISCIPLINES.map((d) => {
              const active = activeDiscipline === d;
              return (
                <button
                  key={d}
                  onClick={() => setActiveDiscipline(d)}
                  style={{
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "7px 14px",
                    borderRadius: 999,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s",
                    fontFamily: "inherit",
                    ...(active
                      ? {
                          background: "#334E68",
                          color: "#fff",
                          border: "1px solid #334E68",
                        }
                      : {
                          background: "#fff",
                          color: "#475569",
                          border: "1px solid #E2E8F0",
                        }),
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Channels (show when searching or a filter is active) */}
        {(search.trim() !== "" || activeDiscipline !== "Todas") &&
          subjectChannels.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 16,
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  Canais relacionados a:{" "}
                  {activeDiscipline !== "Todas"
                    ? activeDiscipline
                    : (filteredBooks[0]?.disciplines[0] ?? "")}
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#64748B" }}>
                  Assista a estes vídeos para complementar seus estudos.
                </p>
              </div>
              <div className="channels-list">
                {subjectChannels.map((c) => (
                  <a
                    key={c.youtubeUrl}
                    href={c.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="channel-item"
                  >
                    <div style={{ display: "flex", gap: 8 }}>
                      <img
                        src={c.imageUrl}
                        alt="yt"
                        style={{ width: 40, height: 40, borderRadius: 50 }}
                      />
                      <div style={{ flexDirection: "column", display: "flex" }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>
                          {c.name}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "grey",
                          }}
                        >
                          {c.subscriptions} de inscritos
                        </span>
                      </div>
                    </div>
                    <img
                      src="https://cdn.creazilla.com/icons/3245994/youtube-icon-lg.png"
                      alt="youtubeLogo"
                      height={20}
                      width={35}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

        {/* Count */}
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748B" }}>
          {filteredBooks.length}{" "}
          {filteredBooks.length === 1
            ? "livro encontrado"
            : "livros encontrados"}
          {activeDiscipline !== "Todas" && ` em "${activeDiscipline}"`}
        </p>

        {/* Loading / Grid / Empty */}
        {loadingBooks ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "96px 0",
              gap: 12,
            }}
          >
            <div className="spinner" />
            <p
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
                color: "#0F172A",
              }}
            >
              Carregando livros…
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#64748B" }}>
              Aguarde um instante.
            </p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div
            style={{
              display: "grid",
              gap: 20,
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            }}
          >
            {filteredBooks.map((b, i) => (
              <BookCard key={i} book={b} onOpen={setOpenBook} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "96px 0",
              gap: 12,
            }}
          >
            <BookIcon size={48} color="#CBD5E1" />
            <p
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 600,
                color: "#0F172A",
              }}
            >
              Nenhum livro encontrado
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#64748B" }}>
              Tente outro filtro ou ajuste sua busca.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveDiscipline("Todas");
              }}
              style={{
                marginTop: 8,
                padding: "8px 20px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                background: "#334E68",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </main>

      {openBook && (
        <PdfModal
          key={openBook?.pdfUrl}
          book={openBook}
          onClose={() => setOpenBook(null)}
        />
      )}
      <AIChat activePdfTitle={openBook?.title} />
    </div>
  );
}
