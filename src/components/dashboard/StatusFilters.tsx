"use client";
import { Button } from "@/components/ui/button";
import { ApplicationStatus } from "@/generated/prisma/client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  filters: "ALL" | ApplicationStatus;
  setFilters: Dispatch<SetStateAction<"ALL" | ApplicationStatus>>;
};

const StatusFilters = ({ setFilters, filters }: Props) => {
  return (
    <div className="flex gap-1 mt-5">
      <Button
        variant="outline"
        className={`rounded-md ${filters === "ALL" ? "bg-gray-200" : "bg-white"}`}
        onClick={() => setFilters("ALL")}
      >
        All
      </Button>
      <Button
        variant="outline"
        className={`rounded-md ${filters === "APPLIED" ? "bg-gray-200" : "bg-white"}`}
        onClick={() => setFilters("APPLIED")}
      >
        Applied
      </Button>
      <Button
        variant="outline"
        className={`rounded-md ${filters === "INTERVIEW" ? "bg-gray-200" : "bg-white"}`}
        onClick={() => setFilters("INTERVIEW")}
      >
        Interview
      </Button>
      <Button
        variant="outline"
        className={`rounded-md ${filters === "OFFER" ? "bg-gray-200" : "bg-white"}`}
        onClick={() => setFilters("OFFER")}
      >
        Offer
      </Button>
      <Button
        variant="outline"
        className={`rounded-md ${filters === "REJECTED" ? "bg-gray-200" : "bg-white"}`}
        onClick={() => setFilters("REJECTED")}
      >
        Rejected
      </Button>
    </div>
  );
};

export default StatusFilters;
