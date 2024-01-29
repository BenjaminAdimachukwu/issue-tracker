"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>; //
// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewissuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsubmitting] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
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
            setIsubmitting(true)
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsubmitting(false)
            setError(" Sorry! An unexpected error occured.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
       
          <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
          
  
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
       
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
          
        

        <Button disabled={isSubmitting}> Submit new Issue  { isSubmitting && < Spinner/>}</Button>
      </form>
    </div>
  );
};

export default NewissuePage;
