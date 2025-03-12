import { useNavigate } from "react-router-dom"
import { Trash2, Pen } from "lucide-react"

const CardActions = ({ job, removeJob }) => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-2">
    <button
      className="mb-auto rounded-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-slate-600"
      onClick={() => navigate(`/jobs/${job.id}/edit`)}
    >
      <Pen size={20} className="dark:text-slate-100" />
    </button>

    <button
      className="mb-auto rounded-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-slate-600"
      onClick={() => removeJob(job.id, job.title)}
      >
      <Trash2 size={20} className="dark:text-slate-100" />
    </button>
  </div>
  )
}

export default CardActions
