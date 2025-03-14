import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import jobService from "../services/jobs";

const JobDetailsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const fetchedJob = await jobService.getOneJob(id);
        setJob(fetchedJob);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setJob(null);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <h1>Job not found</h1>;
  }

  return (
    <div className="text-start">
      <section className="mb-6 p-8">

        <div className="flex justify-between items-center mb-4">
          <div className="mb-4 flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{job.company}</p>
              <a href="#" className="text-blue-500 hover:underline">
                Follow
              </a>
            </div>
            <p className="text-sm text-gray-500">{job.datePosted.split("T")[0]}</p>
          </div>
          
          { user && user.role === 'company' && (
            <button onClick={() => navigate(`/jobs/${id}/edit`)} className="btn">Edit</button>
          )}
        </div>


        <h1 className="mb-2 text-4xl font-bold">{job.title}</h1>

        <div className="mb-4 flex flex-row gap-2 text-gray-600">
          <p className="text-md">{job.location}</p>
          <span>|</span>
          <p className="text-md">{job.employmentType}</p>
          <span>|</span>
          <p className="text-md">{job.seniority}</p>
        </div>

        <p className="mb-6 text-lg">
          <strong>Salary:</strong> {job.salary} USD/month
        </p>

        {user && user.role === 'candidate' && (
          <button  
            onClick={() => navigate(`/jobs/${id}/apply`)}
            className="btn"
          >
            Apply
          </button>
          )           
        }
      </section>

      <section className="mb-6 px-8">
        {job.description && (
          <p className="mb-4 text-lg">
            <strong>Description:</strong> {job.description}
          </p>
        )}

        {job.requirements && (
          <div className="mb-4">
            <h2 className="mb-2 text-2xl font-semibold">
              Qualifications and Requirements
            </h2>
            <ul className="list-inside list-disc pl-5">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="mb-1 text-lg">
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.tasks && (
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Job Functions</h2>
            <ul className="list-inside list-disc pl-5">
              {job.tasks.map((task, index) => (
                <li key={index} className="mb-1 text-lg">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobDetailsPage;
