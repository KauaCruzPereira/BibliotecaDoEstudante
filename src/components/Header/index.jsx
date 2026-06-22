import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const EXTERNAL_URLS = {
  solverequacoes: "https://solver-equacoes.vercel.app/",
  calculadoracarbono: "https://calculadora-carbono-cedup.vercel.app/",
};

export const NavigationHeader = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  const navItems = [
    { id: "homepage", label: "Início", to: "/", isInternal: true },
    { id: "library", label: "Biblioteca", to: "/library", isInternal: true },
    {
      id: "activities",
      label: "Atividades",
      to: "/activities",
      isInternal: true,
    },
    {
      id: "solverequacoes",
      label: "SolverEquações",
      to: EXTERNAL_URLS.solverequacoes,
      isInternal: false,
    },
    {
      id: "calculadoracarbono",
      label: "CalculadoraCarbono",
      to: EXTERNAL_URLS.calculadoracarbono,
      isInternal: false,
    },
  ];

  return (
    <div className="nav-header">
      <div className={`nav-buttons-container ${isMobile ? "mobile" : ""}`}>
        {navItems.map(({ id, label, to, isInternal }) => {
          const displayLabel = isMobile
            ? label.replace(/([A-Z])/g, "\n$1")
            : label;

          if (isInternal) {
            return (
              <NavLink
                key={id}
                to={to}
                className={({ isActive }) =>
                  `nav-button ${isActive ? "active" : ""}`
                }
              >
                <span className={`nav-button-text`}>{displayLabel}</span>
              </NavLink>
            );
          } else {
            return (
              <button
                key={id}
                className="nav-button"
                onClick={() => (window.location.href = to)}
              >
                <span className="nav-button-text">{displayLabel}</span>
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};
