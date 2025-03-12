import { Link } from "react-router-dom";
import { useJobContext } from "../../context/JobContext";
import { useNotificationContext } from "../../context/NotificationContext";
import jobService from "../../services/jobs";
import IconSection from "./IconSection";
import CardActions from "./CardActions";

const Card = ({ job, token }) => {
  const [{ jobs }, dispatch] = useJobContext();
  const [, dispatchNotification] = useNotificationContext();

  const user = JSON.parse(localStorage.getItem("user"));

  const removeJob = async (id, title) => {
    if (
      window.confirm(
        `Are you sure you want to delete the job post: "${title}"?`,
      )
    ) {
      try {
        await jobService.deleteJob(id, token);
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

          {(user.profile.id === job.company_id) && (
            <CardActions job={job} removeJob={removeJob} />
          )}
        </div>
      </div>

      <IconSection job={job} />

      <div className="m-2">
        We are looking for a dedicated {job.title} to {job.description}
      </div>

      <div className="mt-auto flex justify-end">
        <Link to={`/jobs/${job.id}`}>
          <button className="btn">View More</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
