import { Link } from "react-router-dom"

const JobCardPreview = ({ job }) => {
  return (
    <div className="flex flex-col border dark:border-slate-800 rounded-md mt-6 p-4 min-w-[320px]">

      <div className="flex flex-col"> 
        <h3 className="text-xl font-bold">{job.title}</h3>
        <p>
          <span className="text-slate-400">{job.company}</span><br />
          <span className="text-slate-400">{job.location}</span>
        </p>

        <div className="flex gap-1 flex-wrap m-2">
          <div className="items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-slate-800 border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50 flex gap-1 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg> 
            ${job.salary}
          </div>

          <div className="items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-slate-800 border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50 flex gap-1 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
           {job.employmentType}
          </div>

          <div className="items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-slate-800 border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50 flex gap-1 whitespace-nowrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg> 
            {job.seniority}
          </div>

        </div>
      </div>

      <div className="m-2"> We are looking for a dedicated {job.title} to {job.description}</div>
      <div className="flex justify-end mt-auto">
        <Link to={`/jobs/${job.id}`}>
          <button className="btn dark:bg-slate-100 dark:text-slate-800">View More</button>
        </Link>
      </div>
    </div>
  )
}

export default JobCardPreview
