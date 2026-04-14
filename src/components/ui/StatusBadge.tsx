import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/generated/prisma/client";

interface statusProps {
  status: ApplicationStatus;
}

const StatusBadge = ({ status }: statusProps) => {
  const statusStyles: Record<string, string> = {
    APPLIED: "bg-blue-100 text-blue-700",
    WISHLIST: "bg-yellow-100 text-yellow-800",
    INTERVIEW: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    SCREENING: "bg-purple-100 text-purple-800",
    GHOSTED: "bg-gray-100 text-gray-700",
    OFFER: "bg-teal-100 text-teal-800",
    ACCEPTED: "bg-emerald-100 text-emerald-800",
  };

  return (
    <div>
      <Badge className={`${statusStyles[status]}`}>{status}</Badge>
    </div>
  );
};

export default StatusBadge;
