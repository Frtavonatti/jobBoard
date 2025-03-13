import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import jobService from "../services/jobs";
import JobList from "../components/job/JobList";

const MyJobsList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user && user.token) {
      jobService
        .getMyJobs(user.token)
        .then((data) => setJobs(data))
        .catch((error) => console.error("Error fetching jobs:", error));
    }
  }, [user]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!jobs) return <div>Loading...</div>;

  return (
    <>
      <JobList
        jobs={jobs}
        pageTitle='My Jobs'
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      {jobs.length === 0 && (
        <div className='text-center mt-28 '>
          <h2 className='text-4xl font-bold'>You havent created any job posts yet.</h2>
          <p className='mt-4 text-lg'>
            Click the button below to create your first job post.
          </p>
          <button 
            onClick={() => navigate('/new')}
            className='btn mt-8'>Create a JobPost
          </button>
        </div>
      )}
    </>
  );
};

export default MyJobsList;