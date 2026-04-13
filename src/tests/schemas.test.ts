import {
  formSchema,
  createContactSchema,
  editApplicationSchema,
} from "@/lib/schemas";
import { describe, it, expect } from "vitest";

describe("formSchema", () => {
  it("should fail if role is empty", () => {
    const result = formSchema.safeParse({ role: "" });
    expect(result.success).toBe(false);
  });

  it("should fail if company is empty", () => {
    const result = formSchema.safeParse({ company: "" });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMin is negative", () => {
    const result = formSchema.safeParse({ salaryMin: -1000 });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMax is negative", () => {
    const result = formSchema.safeParse({ salaryMax: -1000 });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMax is String", () => {
    const result = formSchema.safeParse({ salaryMax: "1000" });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMin is String", () => {
    const result = formSchema.safeParse({ salaryMin: "1000" });
    expect(result.success).toBe(false);
  });

  it("should fail if workType isnt one of the three", () => {
    const result = formSchema.safeParse({ workType: "OFFICE" });
    expect(result.success).toBe(false);
  });

  it("should fail if url is invalid", () => {
    const result = formSchema.safeParse({ url: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("should pass with valid data", () => {
    const result = formSchema.safeParse({
      company: "Macdonald",
      role: "Frontend developer",
      currentStatus: "OFFER",
    });

    expect(result.success).toBe(true);
  });
});

describe("createContactSchema", () => {
  it("should fail if name is empty", () => {
    const result = createContactSchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
  });

  it("should pass even if title is empty", () => {
    const result = createContactSchema.safeParse({
      applicationId: "fijf20f2",
      name: "alex",
      title: "",
    });
    expect(result.success).toBe(true);
  });
  it("should pass even if email is empty", () => {
    const result = createContactSchema.safeParse({
      applicationId: "fijf20f2",
      name: "alex",
      email: "",
    });
    expect(result.success).toBe(true);
  });

  it("should if email isn't in email format", () => {
    const result = createContactSchema.safeParse({ email: "alexemaill" });
    expect(result.success).toBe(false);
  });

  it("should pass even if linkedin is empty", () => {
    const result = createContactSchema.safeParse({
      applicationId: "fijf20f2",
      name: "alex",
      linkedin: "",
    });
    expect(result.success).toBe(true);
  });

  it("should pass with valid data", () => {
    const result = createContactSchema.safeParse({
      applicationId: "fijf20f2",
      name: "Alex",
    });

    expect(result.success).toBe(true);
  });
});

describe("editApplicationSchema", () => {
  it("should fail if company is empty", () => {
    const result = editApplicationSchema.safeParse({ company: "" });
    expect(result.success).toBe(false);
  });

  it("should fail if role is empty", () => {
    const result = editApplicationSchema.safeParse({ role: "" });
    expect(result.success).toBe(false);
  });

  it("should fail if url is invalid", () => {
    const result = editApplicationSchema.safeParse({ url: "not-a-url" });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMin is negative", () => {
    const result = editApplicationSchema.safeParse({ salaryMin: -1000 });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMax is negative", () => {
    const result = editApplicationSchema.safeParse({ salaryMax: -1000 });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMax is String", () => {
    const result = editApplicationSchema.safeParse({ salaryMax: "1000" });
    expect(result.success).toBe(false);
  });

  it("should fail if salaryMin is String", () => {
    const result = editApplicationSchema.safeParse({ salaryMin: "1000" });
    expect(result.success).toBe(false);
  });

  it("should fail if workType isnt one of the three", () => {
    const result = editApplicationSchema.safeParse({ workType: "OFFICE" });
    expect(result.success).toBe(false);
  });

  it("should pass with valid data", () => {
    const result = editApplicationSchema.safeParse({
      applicationId: "ef12f41",
      company: "Macdonald",
      role: "Fullstack Dev",
    });

    expect(result.success).toBe(true);
  });
});
