"use client";

import { Application, ApplicationStatus } from "@/generated/prisma/client";
import KanbanColumn from "./KanbanColumn";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { updateApplicationStatus } from "@/actions/application";
import { startTransition, useOptimistic } from "react";
import { useRouter } from "next/navigation";
type Props = {
  applications: Application[];
};

const KanbanBoard = ({ applications }: Props) => {
  const [optimisticApplications, setOptimisticApplications] = useOptimistic(
    applications,
    (
      currentApplications,
      update: { id: string; newStatus: ApplicationStatus },
    ) => {
      return currentApplications.map((app) =>
        app.id === update.id
          ? { ...app, currentStatus: update.newStatus }
          : app,
      );
    },
  );

  const router = useRouter();

  const titles: ApplicationStatus[] = [
    "WISHLIST",
    "APPLIED",
    "SCREENING",
    "INTERVIEW",
    "OFFER",
  ];

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const appId = String(active.id);
    const newStatus = String(over.id) as ApplicationStatus;

    startTransition(async () => {
      setOptimisticApplications({
        id: appId,
        newStatus,
      });
      updateApplicationStatus(appId, newStatus);
    });
    router.refresh();
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {" "}
      <div className="mt-5 flex gap-4 overflow-x-auto pb-4">
        {titles.map((title) => {
          const filteredApps = optimisticApplications.filter(
            (app) => app.currentStatus === title,
          );

          return (
            <KanbanColumn
              key={title}
              title={title}
              applications={filteredApps}
            />
          );
        })}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
