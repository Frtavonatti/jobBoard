const JobCardPreview = ({ job }) => {
  return (
    <div className="border dark:border-white rounded-md mt-6 p-4">
      <h3>{job.title}</h3>
      <span>{job.company}</span><br />
      <span>{job.location}</span>
      <div> We are looking for a dedicated {job.title} to {job.description}</div>
      <button>View More</button>
    </div>
  )
}

export default JobCardPreview
