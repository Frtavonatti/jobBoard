import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import JobCardPreview from './components/JobCardPreview'
import NewJob from './components/NewJob'

function App() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    axios('http://localhost:3001/jobs')
    .then((res) => res.data)
    .then((data) => setJobs(data))
    .catch((error) => console.error('Error fetching jobs:', error))
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  const filteredJobs = jobs.filter((job) => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <>
      <Header handleTheme={handleTheme} />
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

        {/* NewJobSection */}
        {/* <NewJob /> */}
      </section>
    </>
  )
}

export default App
