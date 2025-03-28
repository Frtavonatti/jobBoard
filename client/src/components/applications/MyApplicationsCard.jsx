import { Link } from "react-router-dom";
import getTimeDiff from "../../lib/utils";

const statusColors = {
  applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  screening:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  interview:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  hired:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  discarded: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const ApplicationCard = ({ application }) => {
  const statusClass =
    statusColors[application.status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  return (
    <Link
      to={`/jobs/${application.job_id.id}`}
      className="mb-4 flex flex-col rounded-md border p-4 transition-all hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">{application.job_id.title}</h3>
          <p>{application.job_id.company}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
        >
          {application.status.charAt(0).toUpperCase() +
            application.status.slice(1)}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-sm">Applied {getTimeDiff(application.date)}</span>
        <button className="btn">View Details</button>
      </div>
    </Link>
  );
};

export default ApplicationCard;
