import { useState, useEffect } from "react";
import appService from "../../services/applications";
import { useAuth } from "../../context/AuthContext";
import ApplicationCard from "../../components/applications/MyApplicationsCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await appService.getCandidateApplications(
          user.profile.id,
          user.token,
        );
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">My Applications</h1>

      {applications.length === 0 ? (
        <div className="rounded-md border border-dashed p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            You havent applied to any jobs yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <ApplicationCard key={app.id || app._id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
