import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AiChat } from "./components/AiChat";
import { NavigationHeader } from "./components/Header";
import { ActivitiesPage } from "./pages/activities";
import { HomePage } from "./pages/homePage";
import { LibraryPage } from "./pages/library";
import { Footer } from "./components/Footer";
import { EssayPage } from "./pages/essayPage";
import { useBook } from "./contexts/bookContext";
import { StepCalculator } from "./pages/stepCalculator";

export default function App() {
  const { openBook } = useBook();
  const [isAiOpen, setIsAiOpen] = useState<boolean | null>(false);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(180deg, #F7F1EB, #EFE5DC, #E6D8CC)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <NavigationHeader />

        <main style={{ flex: 1}}>
          <Routes>
            <Route
              path="/"
              element={<HomePage setIsAiOpen={() => setIsAiOpen(!isAiOpen)} />}
            />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/essay" element={<EssayPage />} />
            <Route path="/step-calculator" element={<StepCalculator />} />
          </Routes>

          <AiChat
            activePdfTitle={openBook?.title ?? ""}
            open={isAiOpen}
            setOpen={setIsAiOpen}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
