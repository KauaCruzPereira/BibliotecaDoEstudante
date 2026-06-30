import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { BookProvider } from "./contexts/bookContext.js";
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
