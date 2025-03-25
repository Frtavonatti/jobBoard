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

  return (
    <div key={column.id} className="flex h-full w-80 flex-shrink-0 flex-col">
      <h2 className="mb-4 text-xl font-semibold">{column.title}</h2>
      <div
        ref={ref}
        className={`h-[calc(100vh-10rem)] w-full flex-grow overflow-y-auto rounded-md border p-4 ${isDraggedOver ? "opacity-50" : ""}`}
      >
        {applications
          .filter((application) => application.status === column.id)
          .map((application) => (
            <Card key={application.id} application={application} />
          ))}
      </div>
    </div>
  );
};

export default Column;
