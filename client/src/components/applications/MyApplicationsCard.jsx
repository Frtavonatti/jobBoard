import { Link } from "react-router-dom";
import getTimeDiff from "../../lib/utils";
import { statusColor } from "../../lib/constants";

const ApplicationCard = ({ application }) => {
  return (
    <Link
      to={`/jobs/${application.job_id.id}`}
      className="mb-4 flex flex-col rounded-md border border-gray-400 p-4 transition-all hover:shadow-md"
    >
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold">{application.job_id.title}</h3>
          <p>{application.job_id.company}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(application.status)}`}
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
