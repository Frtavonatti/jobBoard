import { Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { JobProvider } from "./context/JobContext";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import NewJobForm from "./pages/NewJobForm";
import EditJobForm from "./pages/EditJobForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const formattedUser = JSON.parse(storedUser);
      setUser(formattedUser);
    }
  }, []);

  // Fix this function to handle user authentication
  if (!user) {
    return (<LoginPage />);
  }

  return (
    <NotificationProvider>
      <Notification />
      {!user ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      ) : (
        <JobProvider>
          <Header handleTheme={handleTheme} user={user} />
          <Routes>
            <Route path="/" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs/:id/edit" element={<EditJobForm token={user.token} />} />
            <Route path="/new" element={<NewJobForm token={user.token} />} />
          </Routes>
          <Footer />
        </JobProvider>
      )}
    </NotificationProvider>
  );
}

export default App;
