import { useRef, useState, useEffect } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"; // monitorForElements

const Card = ({ application }) => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      getInitialData: () => ({
        id: application.id,
        status: application.status,
        application: application,
      }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
  }, [application]);

  const getTimeDiff = () => {
    const now = new Date();
    const applicationDate = new Date(application.date);
    const diffInMinutes = Math.floor((now - applicationDate) / (1000 * 60));
    const diffInHours = Math.floor((now - applicationDate) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={`my-4 rounded-md border p-4 ${isDragging ? "opacity-50" : ""}`}
      >
        <h3 className="flex text-xl font-semibold">
          {application.data.firstName} {application.data.lastName}
        </h3>
        <div className="flex justify-end">
          <span className="text-sm font-semibold text-red-700">
            {getTimeDiff()}{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
