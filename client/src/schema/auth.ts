import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter the valid Email." }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters." })
    .max(20, { message: "Password must only contain 20 characters." }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(5, { message: "User name must contain at least 5 characters." })
    .max(15, { message: "User name must only contain 15 characters." }),
  email: z.string().email({ message: "Please enter the valid Email." }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters." })
    .max(20, { message: "Password must only contain 20 characters." }),
});

export const ForgotPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters." })
      .max(20, { message: "Password must only contain 20 characters." }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters." })
      .max(20, { message: "Password must only contain 20 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords are not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordLoginSchema = z.object({
  email: z.string().email({ message: "Please enter the valid Email." }),
});
