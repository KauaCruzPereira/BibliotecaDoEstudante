import { useEffect, useState } from "react";
import { BOOKS } from "../../utils/books";
import { CHANNELS } from "../../utils/channels";
import { BookIcon, SearchIcon } from "lucide-react";
import { BookCard } from "../../components/BookCard";
import { AiChat } from "../../components/AiChat";
import { PdfModal } from "../../components/PdfModal";

export const LibraryPage = () => {
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
    <div>
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
                        background: "#501C2F",
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
        {filteredBooks.length === 1 ? "livro encontrado" : "livros encontrados"}
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
          <p style={{ margin: 0, fontSize: 14, color: "#000000" }}>
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

      {openBook && (
        <PdfModal
          key={openBook?.pdfUrl}
          book={openBook}
          onClose={() => setOpenBook(null)}
        />
      )}
      <AiChat activePdfTitle={openBook?.title} />
    </div>
  );
};
