import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useJobContext } from "../../context/JobContext";
import { useNotificationContext } from "../../context/NotificationContext";
import jobService from "../../services/jobs";
import IconSection from "./IconSection";

const Card = ({ job }) => {
  const [{ jobs }, dispatch] = useJobContext();
  const [, dispatchNotification] = useNotificationContext();

  const removeJob = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the job post: "${title}"?`)) {
      try {
        await jobService.deleteJob(id);
        const updatedJobList = jobs.filter((job) => job.id !== id);
        dispatch({ type: "SET_JOBS", payload: updatedJobList });
        dispatchNotification({
          type: "SHOW_NOTIFICATION",
          payload: `Post "${title}" deleted successfully`,
        });
      } catch (error) {
        dispatchNotification({
          type: "SHOW_NOTIFICATION",
          payload: `Error deleting post: ${error.message}`,
        });
        console.error("Failed to delete job:", error);
      }
    }
  };

  return (
    <div className="mt-6 flex min-w-[320px] flex-col rounded-md border p-4 dark:border-slate-800">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="mb-1 ml-2 flex flex-col text-left">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="flex flex-col">
              <span className="text-slate-400">{job.company}</span>
              <span className="text-slate-400">{job.location}</span>
            </p>
          </div>
          <button
            className="mb-auto rounded-lg bg-slate-200 p-1 hover:bg-slate-300"
            onClick={() => removeJob(job.id, job.title)}
          >
            <Trash2 size={20} className="dark:text-slate-600"/>
          </button>
        </div>
      </div>

      <IconSection job={job} />

      <div className="m-2">
        We are looking for a dedicated {job.title} to {job.description}
      </div>

      <div className="mt-auto flex justify-end">
        <Link to={`/jobs/${job.id}`}>
          <button className="btn">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
