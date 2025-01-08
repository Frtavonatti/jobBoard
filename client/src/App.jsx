import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import JobListPage from './pages/JobListPage'
import JobDetailsPage from './pages/JobDetailsPage'
import NewJobForm from './pages/NewJobForm'
import Header from './components/Header'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  return (
    <Router> 
      <Header handleTheme={handleTheme} />
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
        <Route path="/new" element={<NewJobForm />} />
      </Routes>
    </Router>
  )
}

export default App
