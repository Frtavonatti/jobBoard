import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useJobContext } from "../../context/JobContext";
import { useNotificationContext } from "../../context/NotificationContext";
import jobService from "../../services/jobs";
import likeService from "../../services/likes";
import IconSection from "./IconSection";
import CardActions from "./CardActions";

const Card = ({ job }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [{ jobs }, dispatch] = useJobContext();
  const [, dispatchNotification] = useNotificationContext();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(user.profile.likes.includes(job.id));
  }, [user.profile.likes, job.id]);

  const handleLike = async () => {
    try {
      const scrollPosition = window.scrollY;

      setIsLiked(!isLiked);
      await likeService.toggleLikeJob(job.id, user.token);

      const updatedLikes = isLiked
        ? user.profile.likes.filter((id) => id !== job.id)
        : [...user.profile.likes, job.id];
      
      window.scrollTo(0, scrollPosition);
      
      setUser({
        ...user,
        profile: {
          ...user.profile,
          likes: updatedLikes,
        },
      });
    } catch (error) {
      console.error("Error liking job:", error);
    }
  }

  const removeJob = async (id, title) => {
    if (
      window.confirm(
        `Are you sure you want to delete the job post: "${title}"?`,
      )
    ) {
      try {
        await jobService.deleteJob(id, user.token);
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
    <div className="mt-6 flex min-w-[320px] flex-col rounded-md border p-4 dark:border-slate-800"
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="mb-1 ml-2 flex flex-col text-left">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="flex flex-col">
              <span className="text-slate-400">{job.company}</span>
              <span className="text-slate-400">{job.location}</span>
            </p>
          </div>

          <CardActions 
            job={job} 
            isLiked={isLiked}
            removeJob={removeJob}
            handleLike={handleLike}
          />
        </div>
      </div>

      <IconSection job={job} />

      <div className="m-2 mb-6">
        We are looking for a dedicated {job.title} to {job.description}
      </div>

      <div className="mt-auto flex justify-end">
        <button onClick={() => navigate(`/jobs/${job.id}`)} className="btn">
          View Post
        </button>

        {user.role === "company" && user.profile.name === job.company && (
          <button
            onClick={() => navigate(`/jobs/${job.id}/applications/edit`)}
            className="btn ml-2"
          >
            View Applicants
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
