import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema } from "@/schema/user";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEmailUpdateMutation } from "@/store/slices/userApi";
import { toast } from "../ui/toast";
import { useEffect } from "react";

interface EmailUpdateProps {
  email: string;
}

type formInput = z.infer<typeof EmailSchema>;

function EmailUpdate({ email }: EmailUpdateProps) {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email,
    },
  });

  const watched = form.watch("email");
  const [emailUpdateMutation, { isLoading }] = useEmailUpdateMutation();

  const submit: SubmitHandler<formInput> = async (data) => {
    try {
      await emailUpdateMutation(data).unwrap();

      toast.add({
        type: "success",
        description: "Email update Success.",
      });
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message || "Email update failed.",
      });
    }
  };

  useEffect(() => {
    form.reset({ email });
  }, [email]);

  return (
    <form onSubmit={form.handleSubmit(submit)} className="mt-2">
      <FieldGroup className="w-1/2">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input {...field} id="email" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        disabled={email === watched || isLoading}
        className={"mt-2"}
      >
        Update
      </Button>
    </form>
  );
}

export default EmailUpdate;
