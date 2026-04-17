import { Application } from "@/generated/prisma/client";
import { needsFollowUp } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
      <p className="text-sm font-bold flex-col flex">
        {app.company}
        {needsFollowUp(app) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-[10px] my-1 border w-fit pt-0.5 px-1 bg-amber-100 text-amber-700 border-amber-200 rounded-lg ">
                follow up
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>No response for 14+ days.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </p>
      <p className="text-sm">{app.role}</p>
      <p className="text-[11px] text-gray-600">
        {app.appliedAt.toDateString()}
      </p>
    </div>
  );
};

export default KanbanCard;
