"use client";
import { Button } from "@/components/ui/button";

const StatusFilters = () => {
  return (
    <div className="flex gap-1 mt-13">
      <Button variant="outline" className="rounded-md">
        All
      </Button>
      <Button variant="outline" className="rounded-md">
        Applied
      </Button>
      <Button variant="outline" className="rounded-md">
        Interview
      </Button>
      <Button variant="outline" className="rounded-md">
        Offer
      </Button>
      <Button variant="outline" className="rounded-md">
        Rejected
      </Button>
    </div>
  );
};

export default StatusFilters;
