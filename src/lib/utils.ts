import { Application } from "@/generated/prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function needsFollowUp(app: Application) {
  const flaggedStatuses = ["APPLIED", "SCREENING", "INTERVIEW"];
  const daysSinceApplied =
    (Date.now() - new Date(app.appliedAt).getTime()) / (1000 * 60 * 60 * 24);
  return flaggedStatuses.includes(app.currentStatus) && daysSinceApplied >= 14;
}
