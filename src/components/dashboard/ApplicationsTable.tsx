"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatSalary } from "@/lib/formatters";
import { Application, ApplicationStatus } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { needsFollowUp } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
type Props = {
  filters: "ALL" | ApplicationStatus;
  applications: Application[];
};

const ApplicationsTable = ({ applications, filters }: Props) => {
  const router = useRouter();
  const handleClick = (app: string) => {
    router.push(`/dashboard/application/${app}`);
  };

  const currentFilter =
    filters === "ALL"
      ? applications
      : applications.filter((app) => app.currentStatus === filters);

  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedData = currentFilter.slice(startIndex, endIndex);

  const totalPages = Math.ceil(currentFilter.length / ITEMS_PER_PAGE);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden md:table-cell">Salary</TableHead>
            <TableHead>Applied</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((app) => (
            <TableRow
              key={app.id}
              className="cursor-pointer"
              onClick={() => handleClick(app.id)}
            >
              <TableCell className="flex items-center gap-2">
                {app.company}

                {needsFollowUp(app) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-[10px] border w-fit pt-0.5 px-1 bg-amber-100 text-amber-700 border-amber-200 rounded-lg">
                        follow up
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>No response for 14+ days.</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={app.currentStatus} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {app.location}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {app.salaryMin && app.salaryMax
                  ? `${formatSalary(app.salaryMin)} - ${formatSalary(app.salaryMax)}`
                  : ""}
              </TableCell>
              <TableCell>{app.appliedAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="text-center my-4 text-gray-600">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Next
        </button>

        <span className="mx-6">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Previous
        </button>
      </div>
    </div>
  );
};

export default ApplicationsTable;
