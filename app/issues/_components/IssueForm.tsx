"use client";

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Issue } from "@prisma/client";
import { z } from "zod";

// Define or import the schema
export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueFormData>();
  console.log(register("title"));

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");
        } catch (error) {
          console.error(error);
        }
      })}
    >
      <TextField.Root
        defaultValue={issue?.title}
        placeholder="Title"
        {...register("title")}
      ></TextField.Root>

      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE
            {...field}
            value={field.value}
            onChange={field.onChange}
            placeholder="Description"
          />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
};

export default IssueForm;
