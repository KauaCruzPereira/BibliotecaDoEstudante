import { useEffect, useState } from "react";

export const ActivitiesPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  async function loadQuestions() {
    try {
      setLoadingQuestions(true);

      const res = await fetch("https://api.enem.dev/v1/exams/2023/questions");

      const data = await res.json();

      const questions = data.questions.filter(
        (question) =>
          question.language !== "espanhol" && question.language !== "ingles",
      );

      const shuffled = questions.sort(() => Math.random() - 0.5);

      setQuestions(shuffled.slice(0, 5));

      setAnswers({});
      setResults({});
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function answerQuestion(questionId, correctAnswer) {
    const selected = answers[questionId];

    if (!selected) return;

    setResults((prev) => ({
      ...prev,
      [questionId]: selected === correctAnswer,
    }));
  }

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
          border: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              color: "#0F172A",
            }}
          >
            Atividades ENEM
          </h2>

          <button
            onClick={loadQuestions}
            disabled={loadingQuestions}
            style={{
              background: "#501C2F",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            {loadingQuestions ? "Carregando..." : "Gerar Novas Questões"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {loadingQuestions ? (
            <div
              style={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="spinner" />
            </div>
          ) : (
            questions.map((question, index) => (
              <div
                key={question.id}
                style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <h3>Questão {index + 1}</h3>

                <p
                  dangerouslySetInnerHTML={{
                    __html: question.context,
                  }}
                />

                <br />

                <p
                  dangerouslySetInnerHTML={{
                    __html: question.alternativesIntroduction,
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  {question.alternatives.map((alt) => (
                    <label
                      key={alt.letter}
                      style={{
                        display: "flex",
                        gap: 8,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={alt.letter}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [question.id]: alt.letter,
                          }))
                        }
                      />

                      <span>
                        <strong>{alt.letter})</strong> {alt.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
