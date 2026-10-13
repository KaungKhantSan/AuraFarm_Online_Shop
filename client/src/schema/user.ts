import z from "zod";

export const EmailSchema = z.object({
  email: z.string().email({ message: "Please enter the valid Email." }),
});

export const UserNameSchema = z.object({
  username: z
    .string()
    .min(5, { message: "User name must contain at least 5 characters." })
    .max(15, { message: "User name must only contain 15 characters." }),
});

export const PasswordUpdateSchema = z
  .object({
    oldPassword: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters." })
      .max(20, { message: "Password must only contain 20 characters." }),
    newPassword: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters." })
      .max(20, { message: "Password must only contain 20 characters." }),
    confirmPassword: z.string({
      message: "Please enter password again",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords are not match",
    path: ["confirmPassword"],
  });
