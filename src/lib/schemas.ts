import * as z from "zod";

export const formSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  url: z.url().optional().or(z.literal("")),
  location: z.string().optional(),
  workType: z.enum(["REMOTE", "HYBRID", "ONSITE"]).optional(),
  currentStatus: z.enum([
    "WISHLIST",
    "APPLIED",
    "SCREENING",
    "INTERVIEW",
    "OFFER",
    "ACCEPTED",
    "REJECTED",
    "GHOSTED",
  ]),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  appliedAt: z.date().default(new Date()),
});

export const createNoteSchema = z.object({
  applicationId: z.string(),
  body: z.string().min(1, "Note cannot be empty").max(1000),
});

export const createContactSchema = z.object({
  applicationId: z.string(),
  name: z.string().min(1, "Name is required"),
  title: z.string().optional().or(z.literal("")),
  email: z.email().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
});

export const editApplicationSchema = z.object({
  applicationId: z.string(),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  url: z.url().optional().or(z.literal("")),
  location: z.string().optional(),
  workType: z.enum(["REMOTE", "HYBRID", "ONSITE"]).optional(),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
});

// export async function createApplication(data: FormData) {
//   const dataObj = {
//     company: data.get("company"),
//     role: data.get("role"),
//     url: data.get("url") || "",
//     location: data.get("location") || undefined,
//     workType: data.get("workType") || undefined,
//     currentStatus: data.get("currentStatus"),

//     salaryMin: data.get("salaryMin")
//       ? Number(data.get("salaryMin"))
//       : undefined,

//     salaryMax: data.get("salaryMax")
//       ? Number(data.get("salaryMax"))
//       : undefined,

//     appliedAt: data.get("appliedAt")
//       ? new Date(data.get("appliedAt") as string)
//       : undefined,
//   };

//   const result = formSchema.safeParse(dataObj);
//   if (!result.success) {
//     return { success: false, error: result.error.flatten() };
//   }

//   const session = await auth();

//   if (!session?.user?.id) {
//     return { success: false, error: "Unauthorized" };
//   }

//   const newApplication = await prisma.application.create({
//     data: {
//       ...result.data,
//       userId: session.user.id,
//       statusEvents: {
//         create: {
//           status: result.data.currentStatus,
//           note: "Application created",
//         },
//       },
//     },
//   });
//   return { success: true, data: newApplication };
// }
