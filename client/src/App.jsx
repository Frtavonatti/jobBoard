import { Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { JobProvider } from "./context/JobContext";
import { useState, useEffect } from "react";
import useTheme from "./hooks/useTheme";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import JobListPage from "./pages/JobListPage";
import MyJobsList from "./pages/MyJobsList";
import JobDetailsPage from "./pages/JobDetailsPage";
import NewJobForm from "./pages/NewJobForm";
import EditJobForm from "./pages/EditJobForm";
import Layout from "./components/Layout";
import Notification from "./components/Notification";

function App() {
  const [ẗheme, toggleTheme] = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const formattedUser = JSON.parse(storedUser);
      setUser(formattedUser);
    }
  }, []);

  return (
    <NotificationProvider>
      <JobProvider>
        <Notification />
        <Layout user={user} handleTheme={toggleTheme}>
          <Routes>
            {!user ? (
              <>
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<JobListPage token={user.token}/>} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                {user.role === "company" && (
                  <>
                    <Route path="*" element={<Navigate to="/myjobs" />} />
                    <Route path="/myjobs" element={<MyJobsList token={user.token} />} />
                    <Route path="/jobs/:id/edit" element={<EditJobForm token={user.token} />} />
                    <Route path="/new" element={<NewJobForm token={user.token} />} />
                  </>
                )}
              </>
            )}
          </Routes>
        </Layout>
      </JobProvider>
    </NotificationProvider>
  );
}

export default App;
