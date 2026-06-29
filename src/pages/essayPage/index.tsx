import { useState } from "react";
import { CompetencesModal } from "../../components/CompetencesModal";
import { EssayComponent } from "../../components/EssayComponent";
import { useIsMobile } from "../../utils/isMobile";
import { competencies } from "../../utils/competences";

export const EssayPage = () => {
  const isMobile = useIsMobile();
  const [openModal, setOpenModal] = useState(false);

  return (
    <main
      style={{
        margin: "0 auto",
        padding: !isMobile ? 32 : "32px 8px",
        display: "flex",
        gap: 20,
        flexDirection: isMobile ? "column" : "row",
        alignItems: !isMobile ? "center" : "none",
      }}
    >
      <EssayComponent />

      {!isMobile && (
        <aside
          style={{
            width: "320px",
            flexShrink: 0,
            position: "sticky",
            top: 20,
            alignSelf: "flex-start",
            backgroundColor: "#FFF",
            borderRadius: 16,
            padding: 20,
            border: "1px solid #E2E8F0",
          }}
        >
          <h2 style={{ marginBottom: 20, fontSize: 22, color: "#1E293B" }}>
            Competências do ENEM
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {competencies.map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: 14,
                  backgroundColor: "#F8FAFC",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    fontSize: 16,
                    color: "#0F172A",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#64748B",
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </aside>
      )}

      {isMobile && (
        <a
          className="button button--secondary"
          onClick={() => setOpenModal(true)}
        >
          Ver Competências
        </a>
      )}

      <CompetencesModal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: 22, color: "#1E293B" }}>
              Competências do ENEM
            </h2>
            <strong onClick={() => setOpenModal(false)}>X</strong>
          </div>
          {competencies.map((item) => (
            <div
              key={item.title}
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: 8,
                backgroundColor: "#F8FAFC",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontSize: 16,
                  color: "#0F172A",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#64748B",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </CompetencesModal>
    </main>
  );
};
