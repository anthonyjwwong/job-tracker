import { ApplicationStatus, Prisma } from "@/generated/prisma/client";
import { ApplicationWithEvents } from "@/components/dashboard/DashboardView";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  applications: ApplicationWithEvents[];
};

const initial: Record<ApplicationStatus, number> = {
  WISHLIST: 0,
  APPLIED: 0,
  SCREENING: 0,
  INTERVIEW: 0,
  OFFER: 0,
  ACCEPTED: 0,
  REJECTED: 0,
  GHOSTED: 0,
};

const statusColors: Record<string, string> = {
  APPLIED: "#3b82f6",
  INTERVIEW: "#f59e0b",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
  GHOSTED: "#6b7280",
};

const BarSection = ({ applications }: Props) => {
  const counts = applications.reduce(
    (acc, app) => {
      acc[app.currentStatus] += 1;
      return acc;
    },
    { ...initial },
  );

  const data = Object.entries(counts).map(([status, count]) => ({
    status: status,
    count: count,
    fill: statusColors[status] || "#8884d8",
  }));

  return (
    <div className="mt-10 pt-3">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            axisLine={false}
            tick={{ fontSize: "0.8rem" }}
            allowDecimals={false}
            tickLine={false}
          />
          <YAxis
            tickLine={false}
            tick={{ fontSize: "0.7rem" }}
            type="category"
            dataKey="status"
            width={70}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
            }}
            itemStyle={{ fontSize: "0.8rem" }}
            labelStyle={{ fontSize: "0.8rem", color: "#888" }}
          />
          <Bar dataKey="count" barSize={15} radius={10}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarSection;
