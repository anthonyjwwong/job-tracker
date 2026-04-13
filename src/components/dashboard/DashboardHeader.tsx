"use client";
import { Button } from "@/components/ui/button";
import AddApplicationForm from "./AddApplicationForm";
const DashboardHeader = () => {
  return (
    <div className="flex justify-between">
      <p>My applications</p>
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-md">
          Table
        </Button>
        <Button variant="outline" className="rounded-md">
          Kanban
        </Button>
        <AddApplicationForm />
      </div>
    </div>
  );
};

export default DashboardHeader;
