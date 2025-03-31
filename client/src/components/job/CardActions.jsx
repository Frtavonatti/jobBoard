import { useNavigate } from "react-router-dom";
import { Trash2, Pen, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const CardActions = ({ job, isLiked, removeJob, handleLike }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      {user.role === 'company' && user.profile.name === job.company
      ? <div className="flex gap-2">
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

      : user.role === 'candidate' && (
        <button 
          className="mb-auto rounded-lg bg-slate-200 p-1 hover:bg-slate-300 dark:bg-slate-600"
          onClick={() => handleLike(job.id, user.token)}  
        >
          <Heart size={20} className={`dark:text-slate-100 ${isLiked ? 'text-red-500 dark:text-red-500' : ''}`} />
        </button>
        )
      }
    </>
  );
};

export default CardActions;
