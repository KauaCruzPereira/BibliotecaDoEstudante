import { BookIcon } from "lucide-react";
import { useState } from "react";

export const BookCard = ({ book, onOpen }) => {
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
              background: "#501C2F",
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
                background: "#501c2f1f",
                color: "#501c2fb7",
                border: "1px solid #501c2fb4",
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
