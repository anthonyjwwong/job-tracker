"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatusFilters from "@/components/dashboard/StatusFilters";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import KanbanBoard from "@/components/dashboard/kanban/KanbanBoard";
import { Application } from "@/generated/prisma/client";

type Props = {
  applications: Application[];
};
const DashboardView = ({ applications }: Props) => {
  const [view, setView] = useState<"table" | "kanban">("table");

  return (
    <div>
      <DashboardHeader views={view} setView={setView} />
      <StatusFilters />
      {view === "table" ? (
        <ApplicationsTable applications={applications} />
      ) : (
        <KanbanBoard applications={applications} />
      )}
    </div>
  );
};

export default DashboardView;
