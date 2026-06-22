import { NavigationHeader } from "./components/Header";
import { LibraryPage } from "./pages/library";
import { ActivitiesPage } from "./pages/activities";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function App() {
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

        <main
          style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/library" replace />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
