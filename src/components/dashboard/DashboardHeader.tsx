"use client";
import { Button } from "@/components/ui/button";
import AddApplicationForm from "./AddApplicationForm";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  views: "table" | "kanban";
  setView: Dispatch<SetStateAction<"table" | "kanban">>;
};

const DashboardHeader = ({ views, setView }: Props) => {
  return (
    <div className="flex justify-between mt-15">
      <p>My applications</p>
      <div className="flex gap-2">
        <div className="hidden md:flex gap-2">
          <Button
            variant="outline"
            className={`rounded-md ${views === "table" ? "bg-gray-200" : "bg-white"}`}
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button
            variant="outline"
            className={`rounded-md ${views === "kanban" ? "bg-gray-200" : "bg-white"}`}
            onClick={() => setView("kanban")}
          >
            Kanban
          </Button>
        </div>

        <AddApplicationForm />
      </div>
    </div>
  );
};

export default DashboardHeader;
