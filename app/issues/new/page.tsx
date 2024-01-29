"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/validationSchemas";
import  { zodResolver } from '@hookform/resolvers/zod' 
import { z } from 'zod'

type IssueForm = z.infer<typeof createIssueSchema> // 
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewissuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({
resolver : zodResolver(createIssueSchema)
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError(" Sorry! An unexpected error occured.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && <Text color="red" as='p'>{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        { errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

        <Button> Submit new Issue</Button>
      </form>
    </div>
  );
};

export default NewissuePage;
