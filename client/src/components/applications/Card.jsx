import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import getTimeDiff from "../../utils/getTimeDiff";

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
      className={`
        bg-gray-300 dark:bg-slate-700
        rounded-md border-gray-400 border p-4 
        transition-all duration-200
        ${isDragging ? "opacity-20 scale-[1.04] shadow-lg border-3 z-50" : ""}`}
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
