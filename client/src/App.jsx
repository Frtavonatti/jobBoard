import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import { useState, useEffect } from "react";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import NewJobForm from "./pages/NewJobForm";
import Header from "./components/Header";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <JobProvider>
        <Header handleTheme={handleTheme} />
        <Routes>
          <Route path="/" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/new" element={<NewJobForm />} />
        </Routes>
      </JobProvider>
    </Router>
  );
}

export default App;
