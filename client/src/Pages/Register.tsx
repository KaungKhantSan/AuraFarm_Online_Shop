import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { RegisterSchema } from "../schema/auth";
import { Link, useNavigate } from "react-router";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react/button";
import { useRegisterMutation } from "@/store/slices/userApi";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type formInputs = z.infer<typeof RegisterSchema>;

function Register() {
  const [registerMutation, { isLoading, isError }] = useRegisterMutation();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const submit: SubmitHandler<formInputs> = async (data) => {
    try {
      await registerMutation(data).unwrap();
      form.reset();
      toast.add({
        type: "success",
        description: "Register Success.",
      });
      navigate("/login");
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
          Welcome to the AuraFarming Online shop
        </p>
        <form onSubmit={form.handleSubmit(submit)} className="mt-4">
          <FieldGroup>
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
                    placeholder="Josh"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
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
              Register
            </Button>
          </FieldGroup>
          <p className="text-center text-sm font-medium">
            Already have an account?
            <Link to={"/login"} className="underline ps-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
