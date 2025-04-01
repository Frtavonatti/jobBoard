import { useEffect } from "react";
import { useJobContext } from "../../context/JobContext";
import { useAuth } from "../../context/AuthContext";
import jobService from "../../services/jobs";
import JobList from "../../components/job/JobList"

const LikedJobs = () => {
  const [{ jobs }, dispatch] = useJobContext();
  const { user } = useAuth();

  useEffect(() => {
    jobService
      .getJobs()
      .then((data) => dispatch({ type: "SET_JOBS", payload: data }))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [dispatch]);

  const likedjobs = jobs.filter((job) => user.profile.likes.includes(job.id));

  return (
    <>
      <JobList 
        jobs={likedjobs}
        pageTitle="Liked Jobs" 
      />
    </>
  )
}

export default LikedJobs
