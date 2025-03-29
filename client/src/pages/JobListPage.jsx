import { useEffect } from "react";
import { useJobContext } from "../context/JobContext";
import jobService from "../services/jobs";
import JobList from "../components/job/JobList";

const JobListPage = () => {
  const [{ jobs }, dispatch] = useJobContext();

  useEffect(() => {
    jobService
      .getJobs()
      .then((data) => dispatch({ type: "SET_JOBS", payload: data }))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [dispatch]);

  return (
    <>
      <JobList
        jobs={jobs}
        pageTitle="All Jobs"
      />
    </>
  );
};

export default JobListPage;
