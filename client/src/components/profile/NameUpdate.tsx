import { UserNameSchema } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { toast } from "../ui/toast";
import { useUserNameUpdateMutation } from "@/store/slices/userApi";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface userNameProps {
  username: string;
}

type formInput = z.infer<typeof UserNameSchema>;

function NameUpdate({ username }: userNameProps) {
  const form = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: {
      username,
    },
  });

  const watched = form.watch("username");
  const [userNameUpdateMutation, { isLoading }] = useUserNameUpdateMutation();

  const submit: SubmitHandler<formInput> = async (data) => {
    try {
      await userNameUpdateMutation(data).unwrap();

      toast.add({
        type: "success",
        description: "Username update Success.",
      });
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message || "Username update failed.",
      });
    }
  };

  useEffect(() => {
    form.reset({ username });
  }, [username]);

  return (
    <form onSubmit={form.handleSubmit(submit)} className="mt-2">
      <FieldGroup className="w-1/2">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                {...field}
                id="username"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        disabled={username === watched || isLoading}
        className={"mt-2"}
      >
        Update
      </Button>
    </form>
  );
}

export default NameUpdate;
