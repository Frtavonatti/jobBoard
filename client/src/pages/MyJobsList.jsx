import { useState, useEffect } from "react";
import jobService from "../services/jobs";
import JobList from "../components/job/JobList";

const MyJobsList = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      jobService
        .getMyJobs(user.token)
        .then((data) => setJobs(data))
        .catch((error) => console.error("Error fetching jobs:", error));
    }
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!jobs) return <div>Loading...</div>;

  return (
    <>
      <JobList
        jobs={jobs}
        token={token}
        pageTitle="My Jobs"
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
    </>
  );
};

export default MyJobsList;