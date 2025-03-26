import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ApplicationService from "../../services/applications";
import JobService from "../../services/jobs";
import ApplicationBoard from "../../components/applications/Board";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Applications = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsData, jobData] = await Promise.all([
          ApplicationService.getJobApplications(id, user.token),
          JobService.getOneJob(id, user.token)
        ]);
        
        setApplications(applicationsData);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user.token]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <h2 className="text-4xl m-4 font-bold">{job.title} at {job.company}</h2>
      <ApplicationBoard
        applications={applications}
        setApplications={setApplications}
      />
    </>
  );
};

export default Applications;
