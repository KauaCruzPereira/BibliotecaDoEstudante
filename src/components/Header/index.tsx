import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const EXTERNAL_URLS = {
  calculadoracarbono: "https://calculadora-carbono-cedup.vercel.app/",
};

const LOGO_SRC = "/203logo.png";

export const NavigationHeader = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const nextWidth = window.innerWidth;

      setWindowWidth(nextWidth);

      if (nextWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const isMobile = windowWidth < 768;

  const navItems = [
    { id: "homepage", label: "Início", to: "/", isInternal: true },
    { id: "library", label: "Biblioteca", to: "/library", isInternal: true },
    {
      id: "activities",
      label: "Simulados",
      to: "/activities",
      isInternal: true,
    },
    {
      id: "essay",
      label: "Redação",
      to: "/essay",
      isInternal: true,
    },
    {
      id: "stepCalculator",
      label: "Calculadora Passo a Passo",
      to: "/step-calculator",
      isInternal: true,
    },
    {
      id: "calculadoracarbono",
      label: "CalculadoraCarbono",
      to: EXTERNAL_URLS.calculadoracarbono,
      isInternal: false,
    },
  ];

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleExternalNavigation = (to) => {
    closeMobileMenu();
    window.location.href = to;
  };

  return (
    <header className="nav-header">
      <NavLink className="nav-logo-link" to="/" aria-label="Ir para o início">
        <img src={LOGO_SRC} alt="Logo 203" className={"nav-logo"} />
      </NavLink>

      {isMobile && (
        <button
          type="button"
          className={`nav-menu-toggle ${isMenuOpen ? "active" : ""}`}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="main-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="nav-menu-toggle-line" />
          <span className="nav-menu-toggle-line" />
          <span className="nav-menu-toggle-line" />
        </button>
      )}

      <nav
        id="main-navigation"
        className={`nav-buttons-container ${isMobile ? "mobile" : ""} ${
          isMobile && isMenuOpen ? "open" : ""
        }`}
        aria-label="Navegação principal"
      >
        {navItems.map(({ id, label, to, isInternal }) => {
          const displayLabel = isMobile
            ? label.replace(/([a-záéíóúãõç])([A-Z])/g, "$1\n$2")
            : label;

          if (isInternal) {
            return (
              <NavLink
                key={id}
                to={to}
                className={({ isActive }) =>
                  `nav-button ${isMobile ? "mobile" : ""} ${
                    isActive ? "active" : ""
                  }`
                }
                onClick={closeMobileMenu}
              >
                <span className={`nav-button-text ${isMobile ? "mobile" : ""}`}>
                  {displayLabel}
                </span>
              </NavLink>
            );
          }

          return (
            <button
              key={id}
              type="button"
              className={`nav-button ${isMobile ? "mobile" : ""}`}
              onClick={() => handleExternalNavigation(to)}
            >
              <span className={`nav-button-text ${isMobile ? "mobile" : ""}`}>
                {displayLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
