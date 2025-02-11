import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { JobProvider } from "./context/JobContext";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import NewJobForm from "./pages/NewJobForm";
import Header from "./components/Header";
import Notification from "./components/Notification";

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

  // Authentication
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const formattedUser = JSON.parse(storedUser);
      setUser(formattedUser);
    }
  }, []);

  if (!user) {
    return <LoginPage/>
  }
  
  return (
    <Router>
      <NotificationProvider>
        <JobProvider>
          <Header handleTheme={handleTheme} user={user}/>
          <Notification />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/new" element={<NewJobForm />} />
          </Routes>
        </JobProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
