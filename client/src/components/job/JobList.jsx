import { Link } from "react-router-dom";
import Card from "./Card";

const JobList = ({ jobs, pageTitle, searchTerm, handleSearch }) => {
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="px-8">
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-4xl font-bold">{pageTitle}</h2>
        <Link to="/new">
          <button className="btn">Create a JobPost</button>
        </Link>
      </div>

      <form>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search jobs..."
          className="mt-6 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id} job={job}/>
        ))}
      </div>
    </div>
  );
};

export default JobList;