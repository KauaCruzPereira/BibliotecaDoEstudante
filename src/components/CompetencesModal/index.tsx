import { ReactNode } from "react";

type CompetencesModalType = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const CompetencesModal = ({
  open,
  onClose,
  children,
}: CompetencesModalType) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 500,
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 16,
          padding: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
};
