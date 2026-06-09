export default async function handler(req: any, res: any) {
  const { messages, activePdfTitle } = req.body;
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
Você é o Assistente da Biblioteca do Estudante.

Você só pode responder perguntas relacionadas a:
- Matérias escolares
- Estudos
- Livros didáticos
- Exercícios
- Redações
- Conteúdo educacional

Livro atualmente aberto:
${activePdfTitle || "Nenhum livro aberto"}

Se a pergunta não estiver relacionada a educação,
estudos ou ao livro aberto, responda exatamente:

"Posso ajudar apenas com conteúdos educacionais, matérias escolares e dúvidas relacionadas aos livros disponíveis na Biblioteca do Estudante."

Responda sempre em português do Brasil.
            `,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    },
  );

  const data = await response.json();

  res.status(response.status).json(data);
}
