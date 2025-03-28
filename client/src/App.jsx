import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import useTheme from "./hooks/useTheme";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ApplicationForm from "./pages/candidates/ApplicationForm";
import MyApplications from "./pages/candidates/MyApplications";
import MyJobsList from "./pages/companies/MyJobsList";
import NewJobForm from "./pages/companies/NewJobForm";
import EditJobForm from "./pages/companies/EditJobForm";
import Applications from "./pages/companies/Applications";
import ApplicationPreview from "./pages/companies/ApplicationPreview";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Notification from "./components/Notification";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [_theme, toggleTheme] = useTheme();
  const { user } = useAuth();

  return (
    <>
      <Notification />
      <Layout user={user} handleTheme={toggleTheme}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected routes for all authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs/:id/apply" element={<ApplicationForm />} />
            <Route
              path="/myapplications/:userId"
              element={<MyApplications />}
            />
          </Route>

          {/* Protected routes only for companies */}
          <Route element={<ProtectedRoute allowedRoles={["company"]} />}>
            <Route path="/myjobs" element={<MyJobsList />} />
            <Route path="/jobs/:id/edit" element={<EditJobForm />} />
            <Route path="/new" element={<NewJobForm />} />
            <Route path="/jobs/:id/applications" element={<Applications />} />
            <Route path="/applications/:id" element={<ApplicationPreview />} />
          </Route>

          {/* Fallback routes: */}
          <Route path="/not-found" element={<NotFound />} />

          {/* Catch-all redirect: to NotFound if authenticated, to login if not */}
          <Route
            path="*"
            element={
              user ? (
                <Navigate to="/not-found" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
