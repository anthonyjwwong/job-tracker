"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@/generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createContact, updateApplicationStatus } from "@/actions/application";
import { createNote } from "@/actions/application";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import * as z from "zod";
type ApplicationWithRelations = Prisma.ApplicationGetPayload<{
  include: {
    statusEvents: true;
    notes: true;
    contacts: true;
  };
}>;

type Props = {
  app: ApplicationWithRelations;
};

const formSchema = z.object({
  name: z.string().min(1, "name is required"),
  title: z.string().optional().or(z.literal("")),
  email: z.email().optional().or(z.literal("")),
  linkedin: z.url().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const ApplicationTabs = ({ app }: Props) => {
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleStatusUpdate() {
    if (!newStatus) return;

    await updateApplicationStatus(app.id, newStatus, statusNote);
    setNewStatus("");
    setStatusNote("");
    router.refresh();
  }

  async function handleCreateNote() {
    if (!noteBody) return;

    await createNote({ applicationId: app.id, body: noteBody });
    setNoteBody("");
    router.refresh();
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      linkedin: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const newValue = { applicationId: app.id, ...values };

    const result = await createContact(newValue);

    if (result?.success) {
      form.reset();
      setOpen(false);
      router.refresh();
    }
  }

  function getInitials(name: string) {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("");
  }
  return (
    <div>
      <Tabs defaultValue="timeline">
        <TabsList variant="line">
          <TabsTrigger value="timeline" className="text-lg">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-lg">
            Notes
          </TabsTrigger>
          <TabsTrigger value="contacts" className="text-lg">
            Contacts
          </TabsTrigger>
        </TabsList>
        <Separator />
        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <div className="flex flex-col mt-3">
            {app.statusEvents.map((events, index) => (
              <div key={events.id} className="flex gap-3 relative pb-6">
                {/* vertical line — hidden on last item */}
                {index !== app.statusEvents.length - 1 && (
                  <div className="absolute left-[7px] top-5 bottom-0 w-px bg-gray-200" />
                )}

                {/* dot */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 z-10
                    ${
                      index === 0
                        ? "bg-gray-900 border-gray-900" // current — filled
                        : "bg-white border-gray-300" // past — empty
                    }`}
                />
                <div>
                  <p className="text-sm font-medium">{events.status}</p>
                  <p className="text-xs text-gray-500">{events.note}</p>
                  <p className="text-xs text-gray-400">
                    {events.occurredAt.toDateString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex flex-col">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full max-w-48 rounded-md">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="APPLIED">Applied</SelectItem>
                    <SelectItem value="SCREENING">Screening</SelectItem>
                    <SelectItem value="WISHLIST">Wishlist</SelectItem>
                    <SelectItem value="INTERVIEW">Interview</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                    <SelectItem value="GHOSTED">Ghosted</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                className="w-[12rem] rounded-md mt-3"
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add a note (optional)..."
              />
              <Button
                variant="outline"
                className="rounded-md w-[12rem] mt-3"
                onClick={handleStatusUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        </TabsContent>
        {/* Note Tab */}
        <TabsContent value="notes">
          <div className="pl-4 mt-4 text-gray-400 text-xs">
            {app.notes.length === 0 ? (
              <p>Add Notes</p>
            ) : (
              app.notes.map((note, index) => (
                <div key={note.id} className="w-[15rem] text-black mb-5">
                  <p className="font-bold">{note.body}</p>
                  <p className="mt-0.5 text-gray-600">
                    {note.createdAt.toDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="mt-5 pl-3 w-[20rem] flex gap-3">
            <Textarea
              placeholder="Add notes..."
              className="rounded-md"
              onChange={(e) => setNoteBody(e.target.value)}
              value={noteBody}
            />
            <Button
              variant="outline"
              className="rounded-md mt-7"
              onClick={handleCreateNote}
            >
              Add
            </Button>
          </div>
        </TabsContent>
        {/* Contacts Tab */}

        <TabsContent value="contacts">
          <div className="pl-5 pt-4 pb-5">
            {app.contacts.map((contact) => (
              <div key={contact.id} className="flex">
                <div className="bg-blue-300 rounded-full p-3">
                  {getInitials(contact.name)}
                </div>
                <div className="ml-3 mt-1">
                  <p className="font-bold">{contact.name}</p>
                  <p className="text-gray-500">{contact.title}</p>
                </div>
              </div>
            ))}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">+ Add Contact</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Contact</DialogTitle>
              </DialogHeader>

              {/*FORM*/}
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>name</FieldLabel>
                        <Input {...field} id={field.name} placeholder="Alex" />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>title</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="Senior Developer..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>email</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="alex@gmail.com..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="linkedin"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>linkedIn</FieldLabel>
                        <Input {...field} id={field.name} placeholder="url.." />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationTabs;
