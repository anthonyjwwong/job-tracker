import { Application } from "@/generated/prisma/client";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
type Props = {
  app: Application;
};

const KanbanCard = ({ app }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: app.id,
    });

  // Apply the transform as a CSS style to move the element
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1, // Optional: visual feedback
  };

  return (
    <div
      className="border p-2 rounded-md shadow-sm mb-2 bg-white cursor-grab"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p className="text-sm font-bold">{app.company}</p>
      <p className="text-sm">{app.role}</p>
      <p className="text-[11px] text-gray-600">
        {app.createdAt.toDateString()}
      </p>
    </div>
  );
};

export default KanbanCard;
