import { FilePen, Hammer, LucideLightbulb, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../../hooks/useReveal";

type HomePageType = {
  setIsAiOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type NavigateProps = "library" | "solver" | "carbon" | "ai";

export const HomePage = ({ setIsAiOpen }: HomePageType) => {
  const navigate = useNavigate();
  useReveal();

  const handleNavigate = (target: NavigateProps) => {
    switch (target) {
      case "library":
        navigate("/library");
        break;

      case "solver":
        window.location.href = "https://solver-equacoes.vercel.app";
        break;

      case "carbon":
        window.location.href = "https://calculadora-carbono-cedup.vercel.app/";
        break;

      case "ai":
        navigate("/ia");
        break;

      default:
        break;
    }
  };

  return (
    <main>
      <section className="hero" aria-label="Biblioteca do Estudante">
        <div className="hero__inner">
          <div className="hero__content reveal is-visible">
            <h1>BIBLIOTECA DO ESTUDANTE</h1>
            <p>
              Aprenda de forma mais inteligente com ferramentas educacionais
              modernas, simulados, inteligência artificial e recursos
              desenvolvidos para potencializar seus estudos.
            </p>
            <div className="hero__actions" aria-label="Acoes principais">
              <a className="button button--primary" href="#destaques">
                Começar Agora
              </a>
              <a className="button button--ghost" href="#como-funciona">
                Conhecer Ferramentas
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light" id="como-funciona">
        <div className="section__inner">
          <header className="section__header reveal">
            <h2>COMO FUNCIONA A BIBLIOTECA DO ESTUDANTE?</h2>
            <p>
              Conheça as principais ferramentas desenvolvidas para ajudar
              estudantes a aprender, praticar e evoluir nos estudos utilizando
              tecnologia e recursos educacionais modernos.
            </p>
          </header>

          <div
            className="timeline"
            aria-label="Etapas da Biblioteca do Estudante"
          >
            <article className="timeline__item reveal">
              <div className="item" onClick={() => handleNavigate("library")}>
                <div className="timeline__number" aria-hidden="true">
                  1
                </div>
                <div className="timeline__icon" aria-hidden="true">
                  <img src="/library.png" alt="" />
                </div>
                <h3>Biblioteca do Estudante</h3>
                <p>
                  Acesse conteúdos organizados, materiais de apoio, resumos e
                  recursos educacionais para facilitar seus estudos.
                </p>
              </div>
            </article>

            <article className="timeline__item reveal">
              <div className="item" onClick={() => handleNavigate("solver")}>
                <div className="timeline__number" aria-hidden="true">
                  2
                </div>
                <div className="timeline__icon" aria-hidden="true">
                  <img src="/calculator.png" alt="" />
                </div>
                <h3>Solver Equações</h3>
                <p>
                  Resolva equações matemáticas passo a passo e compreenda cada
                  etapa da resolução para aprender de forma prática.
                </p>
              </div>
            </article>

            <article className="timeline__item reveal">
              <div className="item" onClick={() => handleNavigate("carbon")}>
                <div className="timeline__number" aria-hidden="true">
                  3
                </div>
                <div className="timeline__icon" aria-hidden="true">
                  <img src="/carbonFootprint.png" alt="" />
                </div>
                <h3>Calculadora de Carbono</h3>
                <p>
                  Utilize nossa calculadora para entender seu impacto ambiental
                  e desenvolver consciência sustentável através da tecnologia.
                </p>
              </div>
            </article>

            <article className="timeline__item reveal">
              <div className="item" onClick={() => setIsAiOpen(true)}>
                <div className="timeline__number" aria-hidden="true">
                  4
                </div>
                <div className="timeline__icon" aria-hidden="true">
                  <img src="/ai.png" alt="" />
                </div>
                <h3>IA Integrada</h3>
                <p>
                  Conte com inteligência artificial para tirar dúvidas, obter
                  explicações rápidas e receber apoio durante os estudos.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--white" id="perguntas">
        <div className="section__inner section__inner--narrow">
          <header className="section__header reveal">
            <h2>PERGUNTAS GERAIS</h2>
          </header>

          <div className="faq reveal">
            <details className="faq__item" open>
              <summary>Quantas horas estudar por dia?</summary>
              <div className="faq_content">
                <p>
                  Não existe um tempo ideal para todos. O mais importante é
                  manter constância e qualidade nos estudos. Entre 2 e 5 horas
                  por dia, com foco e organização, já pode trazer bons
                  resultados.
                </p>
              </div>
            </details>

            <details className="faq__item">
              <summary>Por que estudar pela Biblioteca do Estudante?</summary>
              <div className="faq_content">
                <p>
                  A Biblioteca do Estudante utiliza recursos inspirados em IA na
                  educação para tornar o aprendizado mais prático, organizado e
                  eficiente.
                </p>
              </div>
            </details>

            <details className="faq__item">
              <summary>Qual é o objetivo do site?</summary>
              <div className="faq_content">
                <p>
                  Nosso objetivo é facilitar o acesso ao conhecimento e ajudar
                  estudantes a aprenderem de forma mais moderna, usando
                  tecnologia para melhorar a experiência de estudo.
                </p>
              </div>
            </details>

            <details className="faq__item">
              <summary>Simulados e provas antigas do ENEM</summary>
              <div className="faq_content">
                <p>
                  Pratique com simulados e provas antigas do ENEM para testar
                  conhecimentos, acompanhar sua evolução e chegar mais preparado
                  para a prova.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section section--beige" id="destaques">
        <div className="section__inner">
          <header className="section__header reveal">
            <h2>DESTAQUES</h2>
          </header>

          <div className="highlights">
            <article className="highlight-card reveal">
              <span className="highlight-card__icon" aria-hidden="true">
                <LucideLightbulb color="white" />
              </span>
              <h3>Aprendizado Inteligente</h3>
              <p>Tecnologia aplicada para melhorar sua rotina de estudos.</p>
            </article>

            <article className="highlight-card reveal">
              <span className="highlight-card__icon" aria-hidden="true">
                <Hammer color="white" />
              </span>
              <h3>Ferramentas Gratuitas</h3>
              <p>Acesso simplificado a recursos educacionais.</p>
            </article>

            <article className="highlight-card reveal">
              <span className="highlight-card__icon" aria-hidden="true">
                <FilePen color="white" />
              </span>
              <h3>Simulados ENEM</h3>
              <p>Pratique utilizando provas e simulados.</p>
            </article>

            <article className="highlight-card reveal">
              <span className="highlight-card__icon" aria-hidden="true">
                <Sparkles color="white" />
              </span>
              <h3>IA Educacional</h3>
              <p>Suporte inteligente para dúvidas e aprendizado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="cta" aria-label="Chamada para ação">
        <div className="cta__inner reveal">
          <h2>Pronto para evoluir seus estudos?</h2>
          <p>
            Explore nossas ferramentas e descubra uma nova forma de aprender
            utilizando tecnologia.
          </p>
          <div className="cta__actions">
            <a className="button button--light" href="#como-funciona">
              Explorar Ferramentas
            </a>
            <a className="button button--outline-light" href="#destaques">
              Começar Agora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
