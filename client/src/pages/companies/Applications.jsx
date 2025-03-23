import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ApplicationService from "../../services/applications";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Applications = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    ApplicationService.getJobApplications(id, user.token)
      .then(data => {
        setApplications(data)
        setLoading(false)
      })
      .catch(error => console.error('Error fetching applications:', error))
  }
  , [id, user.token])
  
  if (loading) return <LoadingSpinner />
  if (applications) {
    console.log('applications:', applications)
  }

  return (
    <>
      <h2 className="text-4xl font-bold">Applications</h2>
    </>
  )
}

export default Applications
