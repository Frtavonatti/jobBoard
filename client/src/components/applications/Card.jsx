import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import getTimeDiff from "../../lib/utils";

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

  return (
    <Link
      to={`/applications/${application.id}`}
      ref={ref}
      className={`rounded-md border border-gray-400 bg-gray-300 p-4 transition-all duration-200 dark:bg-slate-700 ${isDragging ? "border-3 z-50 scale-[1.04] opacity-20 shadow-lg" : ""}`}
    >
      <h3 className="flex text-xl font-semibold dark:text-zinc-50">
        {application.data.firstName} {application.data.lastName}
      </h3>
      <div className="flex justify-end">
        <span className="text-sm font-semibold text-red-600">
          {getTimeDiff(application.date)}{" "}
        </span>
      </div>
    </Link>
  );
};

export default Card;
