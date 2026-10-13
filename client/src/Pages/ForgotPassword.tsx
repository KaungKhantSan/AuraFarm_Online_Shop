import { useNavigate, useParams } from "react-router";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react/button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/schema/auth";
import type z from "zod";
import { toast } from "@/components/ui/toast";
import {
  useLogoutMutation,
  useResetForgotPasswordMutation,
} from "@/store/slices/userApi";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "@/store/slices/auth";

type formInput = z.infer<typeof ForgotPasswordSchema>;

function ForgotPassword() {
  const [resetForgotPasswordMutation, { isLoading }] =
    useResetForgotPasswordMutation();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const params = useParams();
  const navigate = useNavigate();

  const submit: SubmitHandler<formInput> = async (data) => {
    try {
      const res = await resetForgotPasswordMutation({
        token: params.id!,
        newPassword: data.newPassword,
      }).unwrap();
      await logoutMutation({});
      dispatch(removeUserInfo());
      form.reset;
      toast.add({
        type: "success",
        description: res.message,
      });
      navigate("/login");
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message,
      });
    }
  };
  return (
    <section className="flex h-[60vh] w-full justify-center items-center">
      <div className="w-1/3 border-2 border-gray-200 rounded-xl p-8">
        <h2 className="font-bold text-center">Aura Farming</h2>
        <p className="text-center text-sm font-medium text-gray-400">
          Change your forgot password
        </p>
        <form onSubmit={form.handleSubmit(submit)} className="mt-4">
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">New Password</FieldLabel>
                  <Input
                    {...field}
                    id="newPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="******"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={
                "w-full mt-2 border-2 rounded-xl p-2 text-sm bg-gray-700 text-white mb-2"
              }
            >
              Change Password
            </Button>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;
