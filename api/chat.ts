export default async function handler(req: any, res: any) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    },
  );

  const data = await response.json();

  res.status(200).json(data);
}
