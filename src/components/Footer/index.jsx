export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src="/203logo.png" alt="Turma 203 Informática" />
          </div>

          <div className="footer__text">
            <strong>Biblioteca do Estudante</strong>
            <p>Conhecimento, tecnologia e prática em um só lugar.</p>
          </div>
        </div>

        <button
          className="footer__instagram"
          onClick={() =>
            window.open("https://www.instagram.com/203int_/", "_blank")
          }
          aria-label="Instagram da turma 203"
        >
          <img
            src="https://png.pngtree.com/png-clipart/20221019/original/pngtree-instagram-icon-png-image_8704817.png"
            alt="Instagram"
          />
          @203Internet
        </button>
      </div>

      <p className="footer__copy">
        © 2026 Biblioteca do Estudante. Desenvolvido por Kauã Cruz Pereira =P
      </p>
    </footer>
  );
};
