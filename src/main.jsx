import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BookProvider } from "./contexts/bookContext.jsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookProvider>
      <App />
      <Analytics />
    </BookProvider>
  </StrictMode>
);
