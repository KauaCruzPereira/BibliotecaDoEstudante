import { useMemo, useState } from "react";
import { useIsMobile } from "../../utils/isMobile";

export const EssayComponent = () => {
  const [essay, setEssay] = useState("");
  const isMobile = useIsMobile()

  const wordCount = useMemo(() => {
    return essay.trim() ? essay.trim().split(/\s+/).length : 0;
  }, [essay]);

  const LINE_HEIGHT = 40;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: !isMobile ? 24 : 16,
        border: "1px solid #E2E8F0",
        flex: 1,
        minWidth: 0,
      }}
    >
      <h1
        style={{
          fontSize: 22,
          marginBottom: 24,
          color: "#1E293B",
        }}
      >
        Redação ENEM
      </h1>

      <div
        style={{
          position: "relative",
          background: "#fff",
          border: "1px solid #CBD5E1",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Comece sua redação aqui..."
          style={{
            width: "100%",
            minHeight: 700,
            paddingRight: 12,
            paddingLeft: 12,
            fontSize: 18,
            lineHeight: `${LINE_HEIGHT}px`,
            resize: "vertical",
            border: "none",
            outline: "none",
            boxSizing: "border-box",
            backgroundImage: `repeating-linear-gradient(
  transparent,
  transparent ${LINE_HEIGHT - 1}px,
  #E2E8F0 ${LINE_HEIGHT}px
)`,
            backgroundAttachment: "local",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 16,
          color: "#64748B",
          fontSize: 14,
          flexWrap: "wrap",
        }}
      >
        <span>Palavras: {wordCount}</span>
        <span>Caracteres: {essay.length}</span>
      </div>
    </div>
  );
};
