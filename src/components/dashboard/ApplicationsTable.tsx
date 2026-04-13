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
import { Application } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  applications: Application[];
};

const ApplicationsTable = ({ applications }: Props) => {
  const router = useRouter();
  const handleClick = (app: string) => {
    router.push(`/dashboard/application/${app}`);
  };
  return (
    <div className="mt-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Applied</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow
              key={app.id}
              className="cursor-pointer"
              onClick={() => handleClick(app.id)}
            >
              <TableCell>{app.company}</TableCell>
              <TableCell>
                <StatusBadge status={app.currentStatus} />
              </TableCell>
              <TableCell>{app.location}</TableCell>
              <TableCell>
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
