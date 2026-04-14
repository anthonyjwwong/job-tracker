import { Application, ApplicationStatus } from "@/generated/prisma/client";
import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";
import StatusBadge from "@/components/ui/StatusBadge";
type Props = {
  title: ApplicationStatus;
  applications: Application[];
};

const KanbanColumn = ({ title, applications }: Props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div
      className="border rounded-md px-2 py-2 w-64 min-h-[500px] flex flex-col"
      ref={setNodeRef}
    >
      <h1 className="text-center text-sm pt-2">
        <StatusBadge status={title} />
      </h1>
      <p className="pb-2 text-center text-gray-500 text-[12px] font-bold">
        {applications.length}
      </p>
      <div>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          applications.map((app) => <KanbanCard key={app.id} app={app} />)
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
