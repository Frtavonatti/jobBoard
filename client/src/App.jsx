import axios from 'axios'
import { useState, useEffect } from 'react'

import JobCardPreview from './components/JobCardPreview'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    axios('http://localhost:3001/jobPostings')
    .then((res) => res.data)
    .then((data) => setJobs(data))
    .catch((error) => console.error('Error fetching jobs:', error))
  }, [])
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredJobs = jobs.filter((job) => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <>
      <div>
        <div className='flex justify-center items-center'>
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h2>Recruitalize</h2>
        </div>
      </div>
      
      <section>
        <h2>JobBoard</h2>

        {/* SearchSection */}
        <form>
          <input 
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search jobs..."
            className="mt-6 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </form>

        {/* JobsSection */}
        {filteredJobs.map((job) => (
          <JobCardPreview key={job.id} job={job} />  
        ))}
      </section>
    </>
  )
}

export default App
