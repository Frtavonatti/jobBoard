import { useState, useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Confetti from "react-confetti";
import { useAuth } from "../../context/AuthContext";
import appService from "../../services/applications";
import Column from "./Column";

const columns = [
  { id: "applied", title: "New Applications" },
  { id: "discarded", title: "Discarded" },
  { id: "screening", title: "Screening" },
  { id: "interview", title: "Interview" },
  { id: "offer", title: "Offer" },
  { id: "hired", title: "Hired" },
];

const ApplicationBoard = ({ applications, setApplications }) => {
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    return monitorForElements({
      onDrop: async ({ source, location }) => {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const destinationLocation = destination.data.columnId;
        const sourceLocation = source.data.status;

        const application = applications.find(
          (app) => app.id === source.data.id,
        );
        const restOfApplications = applications.filter(
          (app) => app.id !== source.data.id,
        );

        if (destinationLocation === sourceLocation) return;

        try {
          const updatedApplication = await appService.updateApplicationStatus(
            application.id,
            { status: destinationLocation },
            user.token,
          );

          if (updatedApplication.status === "hired") {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }

          setApplications([...restOfApplications, updatedApplication]);
        } catch (error) {
          console.log("Error updating application status:", error);
        }
      },
    });
  }, [applications, setApplications, user.token]);

  return (
    <div className="overflow-x-auto">
      {showConfetti && <Confetti />}
      <div className="mt-8 flex min-w-max flex-nowrap space-x-4 px-4">
        {columns.map((column) => (
          <Column key={column.id} column={column} applications={applications} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationBoard;
