import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

    const handleKeyDown = (event: KeyboardEvent) => {
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
    { id: "homepage", label: "Início", to: "/" },
    { id: "library", label: "Biblioteca", to: "/library" },
    {
      id: "activities",
      label: "Simulados",
      to: "/activities",
    },
    {
      id: "essay",
      label: "Redação",
      to: "/essay",
    },
    {
      id: "stepCalculator",
      label: "Calculadora Passo a Passo",
      to: "/step-calculator",
    },
  ];

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
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
        {navItems.map(({ id, label, to }) => {
          const displayLabel = isMobile
            ? label.replace(/([a-záéíóúãõç])([A-Z])/g, "$1\n$2")
            : label;

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
        })}
      </nav>
    </header>
  );
};
