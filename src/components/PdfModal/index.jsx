import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const PdfModal = (book, onClose) => {
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
          background: "#501C2F",
          borderBottom: "1px solid #501C2F",
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
              background: "linear-gradient(180deg, #F7F1EB, #EFE5DC, #E6D8CC)",
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
};
