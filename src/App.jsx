import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AiChat } from "./components/AiChat";
import { NavigationHeader } from "./components/Header";
import { useBook } from "./contexts/bookContext";
import { ActivitiesPage } from "./pages/activities";
import { HomePage } from "./pages/homePage";
import { LibraryPage } from "./pages/library";
import { Footer } from "./components/Footer";

export default function App() {
  const { openBook } = useBook();
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #F7F1EB, #EFE5DC, #E6D8CC)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <NavigationHeader />

        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage setIsAiOpen={() => setIsAiOpen(!isAiOpen)} />}
            />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Routes>

          <AiChat
            activePdfTitle={openBook?.title}
            open={isAiOpen}
            setOpen={setIsAiOpen}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
