"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatusFilters from "@/components/dashboard/StatusFilters";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import KanbanBoard from "@/components/dashboard/kanban/KanbanBoard";
import { Application, ApplicationStatus } from "@/generated/prisma/client";

type Props = {
  applications: Application[];
};
const DashboardView = ({ applications }: Props) => {
  const [view, setView] = useState<"table" | "kanban">("table");
  const [filters, setFilters] = useState<"ALL" | ApplicationStatus>("ALL");

  return (
    <div>
      <DashboardHeader views={view} setView={setView} />
      <StatusFilters setFilters={setFilters} filters={filters} />
      {view === "table" ? (
        <ApplicationsTable applications={applications} filters={filters} />
      ) : (
        <KanbanBoard applications={applications} />
      )}
    </div>
  );
};

export default DashboardView;
