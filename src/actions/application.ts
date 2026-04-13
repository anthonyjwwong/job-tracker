"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ApplicationStatus } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  formSchema,
  createNoteSchema,
  createContactSchema,
  editApplicationSchema,
} from "@/lib/schemas";

export async function createApplication(data: FormData) {
  const dataObj = {
    company: data.get("company"),
    role: data.get("role"),
    url: data.get("url") || "",
    location: data.get("location") || undefined,
    workType: data.get("workType") || undefined,
    currentStatus: data.get("currentStatus"),

    salaryMin: data.get("salaryMin")
      ? Number(data.get("salaryMin"))
      : undefined,

    salaryMax: data.get("salaryMax")
      ? Number(data.get("salaryMax"))
      : undefined,

    appliedAt: data.get("appliedAt")
      ? new Date(data.get("appliedAt") as string)
      : undefined,
  };

  const result = formSchema.safeParse(dataObj);
  if (!result.success) {
    return { success: false, error: result.error.flatten() };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const newApplication = await prisma.application.create({
    data: {
      ...result.data,
      userId: session.user.id,
      statusEvents: {
        create: {
          status: result.data.currentStatus,
          note: "Application created",
        },
      },
    },
  });
  return { success: true, data: newApplication };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: string,
  note?: string,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true },
  });

  if (!application || application.userId !== session.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      currentStatus: status as ApplicationStatus,
      statusEvents: {
        create: {
          status: status as ApplicationStatus,
          note: note || "",
        },
      },
    },
  });

  return { success: true };
}

export async function createNote(input: unknown) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  const result = createNoteSchema.safeParse(input);

  if (!result.success) {
    return { success: false, error: result.error };
  }
  const { applicationId, body } = result.data;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true },
  });

  if (!application || application.userId !== session.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.note.create({
    data: {
      applicationId,
      body,
    },
  });
  revalidatePath(`/dashboard/application/${applicationId}`);
  return { success: true };
}

export async function createContact(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }
  const result = createContactSchema.safeParse(input);

  if (!result.success) {
    return { success: false, error: result.error };
  }
  const { applicationId, name, title, email, linkedin } = result.data;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true },
  });

  if (!application || application.userId !== session.user.id) {
    return { success: false, error: "Unauthorized" };
  }
  await prisma.contact.create({
    data: {
      applicationId,
      name,
      title,
      email,
      linkedin,
    },
  });
  revalidatePath(`/dashboard/application/${applicationId}`);
  return { success: true };
}

export async function deleteApplication(applicationId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true },
  });

  if (!application || application.userId !== session.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.application.delete({
    where: {
      id: applicationId,
    },
  });
  redirect("/dashboard");
}

export async function editApplication(input: unknown) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }
  const result = editApplicationSchema.safeParse(input);

  if (!result.success) {
    return { success: false, error: "Invalid form data" };
  }
  const {
    applicationId,
    company,
    role,
    url,
    location,
    workType,
    salaryMin,
    salaryMax,
  } = result.data;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: { userId: true },
  });

  if (!application || application.userId !== session.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.application.update({
    where: { id: applicationId },
    data: {
      company,
      role,
      url,
      location,
      workType,
      salaryMin,
      salaryMax,
    },
  });
  revalidatePath(`/dashboard/application/${applicationId}`);
  return { success: true };
}
