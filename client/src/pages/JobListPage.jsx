import { Link } from "react-router-dom"
import { useJobContext } from "../context/JobContext"
import { useState, useEffect } from "react"
import jobService from '../services/jobs'
import JobCardPreview from "../components/JobCardPreview"

const JobListPage = () => {
  const [{ jobs }, dispatch] = useJobContext()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    jobService.getJobs()
    .then((data) => dispatch({ type: 'SET_JOBS', payload: data }))
    .catch((error) => console.error('Error fetching jobs:', error))
  }, [dispatch])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredJobs = jobs.filter((job) => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="flex justify-between items-center mt-8">
        <h2 className='text-4xl font-bold'>JobBoard</h2>
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
          className="mt-6 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <JobCardPreview key={job.id} job={job} />  
        ))}
      </div>
    </>
  )
}

export default JobListPage