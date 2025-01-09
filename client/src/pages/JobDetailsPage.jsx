import { useParams } from "react-router-dom";
import { useJobContext } from "../context/JobContext";

const JobDetailsPage = () => {
  // TO-DO: Implement method to give persistent data to the JobDetailsPage component
  const [{ jobs }] = useJobContext();
  const id = Number(useParams().id);
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return <h1>Job not found</h1>;
  }

  return (
    <div className="rounded-lg p-6">
      <section className="mb-6 text-start">
        <div className="mb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">{job.company}</p>
            <a href="#" className="text-blue-500 hover:underline">
              Follow
            </a>
          </div>
          <p className="text-sm text-gray-500">{job.datePosted}</p>
        </div>

        <h1 className="mb-4 text-4xl font-bold">{job.title}</h1>

        <div className="mb-4 flex flex-row gap-2 text-gray-600">
          <p className="text-lg">{job.location}</p>
          <span>|</span>
          <p className="text-lg">{job.employmentType}</p>
          <span>|</span>
          <p className="text-lg">{job.seniority}</p>
        </div>

        <p className="text-lg">
          <strong>Salary:</strong> {job.salary} USD/month
        </p>
      </section>

      <section className="mb-6">
        <p className="mb-4 text-lg">
          <strong>Description:</strong> {job.description}
        </p>

        <div className="mb-4">
          <h2 className="mb-2 text-2xl font-semibold">Requirements</h2>
          <ul className="list-inside list-disc pl-5">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="mb-1 text-lg">
                {requirement}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-semibold">Tasks</h2>
          <ul className="list-inside list-disc pl-5">
            {job.tasks.map((task, index) => (
              <li key={index} className="mb-1 text-lg">
                {task}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
