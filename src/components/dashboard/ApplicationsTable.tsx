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
          {currentFilter.map((app) => (
            <TableRow
              key={app.id}
              className="cursor-pointer"
              onClick={() => handleClick(app.id)}
            >
              <TableCell>{app.company}</TableCell>
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
    </div>
  );
};

export default ApplicationsTable;
