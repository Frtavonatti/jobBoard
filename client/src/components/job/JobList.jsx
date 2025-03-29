import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SearchPanel from "./SearchPanel";
import Card from "./Card";

const initialSearchTerm = {
  title: "",
  location: "",
  minSalary: 0,
  seniority: "Any",
  type: "Any",
};

const JobList = ({ jobs, pageTitle}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  const handleReset = () => {
    setSearchTerm(initialSearchTerm);
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(searchTerm.title.toLowerCase());
    const locationMatch = job.location.toLowerCase().includes(searchTerm.location.toLowerCase());

    const salaryMatch = job.salary >= Number(searchTerm.minSalary);

    const seniorityMatch = searchTerm.seniority.toLowerCase() === "any" 
      || job.seniority.toLowerCase().includes(searchTerm.seniority.toLowerCase()) 

    const typeMatch = searchTerm.type.toLowerCase() === "any"
      || job.employmentType.toLowerCase().includes(searchTerm.type.toLowerCase())

    return titleMatch && locationMatch && seniorityMatch && typeMatch && salaryMatch;
  });

  return (
    <div className="px-8">
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-4xl font-bold">{pageTitle}</h2>
        {user && user.role === "company" && (
          <Link to="/new">
            <button className="btn btn-primary">Create a JobPost</button>
          </Link>
        )}
      </div>

      <SearchPanel 
        searchTerm={searchTerm} 
        handleSearch={handleSearch} 
        handleReset={handleReset}  
      />

      { filteredJobs.length === 0 
        ? <div className="flex items-center justify-center h-96">
            <p className="text-lg font-bold">No jobs found</p>
          </div> 
        : <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          { filteredJobs.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div> 
      }
    </div>
  );
};

export default JobList;
