import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema } from "../schema/auth";
import { Link, useNavigate } from "react-router";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react/button";
import { useLoginMutation } from "@/store/slices/userApi";
import { toast } from "@/components/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/store/slices/auth";
import { useEffect } from "react";
import type { RootState } from "@/store";

type formInputs = z.infer<typeof LoginSchema>;

function Login() {
  const [loginMutation, { isLoading, isError }] = useLoginMutation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const submit: SubmitHandler<formInputs> = async (data) => {
    try {
      const res = await loginMutation(data).unwrap();
      dispatch(setUserInfo(res));
      form.reset;
      toast.add({
        type: "success",
        description: "Login Success.",
      });
      navigate("/");
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
          Enter your information to Login
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
              Login
            </Button>
          </FieldGroup>
          <p className="text-center text-sm font-medium">
            Don't have an account?
            <Link to={"/register"} className="underline ps-1">
              register
            </Link>
            <hr className="my-4" />
            <Link to={"/forgot-password"} className="underline text-gray-400">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
