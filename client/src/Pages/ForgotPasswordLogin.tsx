import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { ForgotPasswordLoginSchema } from "../schema/auth";
import { useNavigate } from "react-router";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react/button";
import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { toast } from "@/components/ui/toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "@/store";

type formInputs = z.infer<typeof ForgotPasswordLoginSchema>;

function ForgotPasswordLogin() {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const form = useForm<z.infer<typeof ForgotPasswordLoginSchema>>({
    resolver: zodResolver(ForgotPasswordLoginSchema),
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const submit: SubmitHandler<formInputs> = async (data) => {
    try {
      await forgotPasswordMutation(data).unwrap();
      form.reset;
      toast.add({
        type: "success",
        description: "Email send.",
      });
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message,
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <section className="flex h-[60vh] w-full justify-center items-center">
      <div className="w-1/3 border-2 border-gray-200 rounded-xl p-8">
        <h2 className="font-bold text-center">Aura Farming</h2>
        <p className="text-center text-sm font-medium text-gray-400">
          Enter email to reset password
        </p>
        <form onSubmit={form.handleSubmit(submit)} className="mt-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Josh@gmail.com"
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
              Send Email
            </Button>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
}

export default ForgotPasswordLogin;
