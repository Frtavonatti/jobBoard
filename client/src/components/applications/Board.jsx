import { useState, useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Confetti from "react-confetti";
import Column from "./Column";

const columns = [
  { id: "applied", title: "New Applications" },
  { id: "discarded", title: "Discarded" },
  { id: "screening", title: "Screening" },
  { id: "interview", title: "Interview" },
  { id: "hired", title: "Hired" },
];

const ApplicationBoard = ({ applications, setApplications }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const cleanup = monitorForElements({
      onDrop: ({ source, location }) => {
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

        setApplications([
          ...restOfApplications,
          { ...application, status: destinationLocation },
        ]);

        if (destinationLocation === "hired") {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      },
    });
    return cleanup;
  }, [applications, setApplications]);

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
