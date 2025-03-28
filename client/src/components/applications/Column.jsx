import { useState, useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import Card from "./Card";

const Column = ({ applications, column }) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: column.id }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      canDrop: ({ source }) => source.data.status !== column.id,
    });
  }, [column.id]);

  useEffect(() => {
    if (isDraggedOver) {
      ref.current.classList.add("opacity-50");
    } else {
      ref.current.classList.remove("opacity-50");
    }
  }, [isDraggedOver]);

  const applicationCount = applications.filter(
    (app) => app.status === column.id,
  ).length;

  return (
    <div
      data-testid="column-container"
      className="flex h-full w-80 flex-shrink-0 flex-col"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {column.title}
        </h2>
        <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          {applicationCount}
        </span>
      </div>

      <div
        ref={ref}
        data-testid="column"
        className={`h-[calc(100vh-10rem)] w-full flex-grow overflow-y-auto rounded-lg border border-gray-300 bg-gray-200 p-3 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/60 ${
          isDraggedOver ? "ring-2 ring-blue-300 dark:ring-blue-700" : ""
        }`}
      >
        {applications.filter((application) => application.status === column.id)
          .length === 0 ? (
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-400 dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No applications
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applications
              .filter((application) => application.status === column.id)
              .map((application) => (
                <Card key={application.id} application={application} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
