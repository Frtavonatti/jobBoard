import { useState, useEffect } from "react";
import { useJobContext } from "../context/JobContext";
import jobService from "../services/jobs";
import JobList from "../components/job/JobList";

const MyJobsList = () => {
  const [{ jobs }, dispatch] = useJobContext();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      jobService
        .getMyJobs(user.token)
        .then((data) => dispatch({ type: "SET_JOBS", payload: data }))
        .catch((error) => console.error("Error fetching jobs:", error));
    }
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <JobList
        jobs={jobs}
        pageTitle="My Jobs"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default MyJobsList;