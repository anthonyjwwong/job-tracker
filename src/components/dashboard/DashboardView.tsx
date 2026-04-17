"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatusFilters from "@/components/dashboard/StatusFilters";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import KanbanBoard from "@/components/dashboard/kanban/KanbanBoard";
import { ApplicationStatus, Prisma } from "@/generated/prisma/client";
import StatsSection from "./rechart/StatsSection";
import BarSection from "./rechart/BarSection";

export type ApplicationWithEvents = Prisma.ApplicationGetPayload<{
  include: { statusEvents: true };
}>;

type Props = {
  applications: ApplicationWithEvents[];
  isDemo?: boolean;
};
const DashboardView = ({ applications, isDemo }: Props) => {
  const [view, setView] = useState<"table" | "kanban">("table");
  const [filters, setFilters] = useState<"ALL" | ApplicationStatus>("ALL");

  return (
    <div>
      <StatsSection applications={applications} />
      <BarSection applications={applications} />
      <DashboardHeader views={view} setView={setView} isDemo={isDemo} />
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
