import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BookProvider } from "./contexts/bookContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookProvider>
        <App />
    </BookProvider>
  </StrictMode>,
);
