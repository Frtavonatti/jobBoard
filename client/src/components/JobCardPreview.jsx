const JobCardPreview = ({ job }) => {
  return (
    <div className="border border-white mt-6">
      <h3>{job.title}</h3>
      <span>{job.company}</span><br />
      <span>{job.location}</span>
    </div>
  )
}

export default JobCardPreview
