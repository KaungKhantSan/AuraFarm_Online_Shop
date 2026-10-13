import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordUpdateSchema } from "@/schema/user";
import { z } from "zod";
import { Button } from "../ui/button";
import { useNewPasswordUpdateMutation } from "@/store/slices/userApi";
import { toast } from "../ui/toast";

type formInput = z.infer<typeof PasswordUpdateSchema>;

function PasswordUpdate() {
  const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
    resolver: zodResolver(PasswordUpdateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordWatched = form.watch("newPassword");
  const confirmPasswordWatched = form.watch("confirmPassword");

  const [newPasswordUpdateMutation, { isLoading }] =
    useNewPasswordUpdateMutation();

  const submit: SubmitHandler<formInput> = async (data) => {
    try {
      await newPasswordUpdateMutation(data).unwrap();
      toast.add({
        type: "success",
        description: "Password update Success.",
      });
      form.reset();
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message || "Password update failed.",
      });
    }
  };
  return (
    <form onSubmit={form.handleSubmit(submit)} className="mt-2">
      <FieldGroup className="w-1/2">
        <Controller
          name="oldPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="oldPassword">Old Password</FieldLabel>
              <Input
                {...field}
                id="oldPassword"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <Input
                {...field}
                id="newPassword"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        disabled={newPasswordWatched !== confirmPasswordWatched || isLoading}
        className={"mt-2"}
      >
        Update
      </Button>
    </form>
  );
}

export default PasswordUpdate;
