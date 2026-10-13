import type { User } from "@/types/user";
import { apiSlice } from "./api";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  username: string;
}

interface ImageInput {
  image_url: string;
}

interface EmailInput {
  email: string;
}

interface PasswordInput {
  oldPassword: string;
  newPassword: string;
}

interface forgotPasswordInput {
  email: string;
}

interface resetForgotPasswordInput {
  token: string;
  newPassword: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    currentProfile: builder.mutation({
      query: (data: ImageInput) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    emailUpdate: builder.mutation({
      query: (data: EmailInput) => ({
        url: "/emailUpdate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    userNameUpdate: builder.mutation({
      query: (data) => ({
        url: "/userNameUpdate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    newPasswordUpdate: builder.mutation({
      query: (data: PasswordInput) => ({
        url: "/passwordUpdate",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: forgotPasswordInput) => ({
        url: "/forgotPasswordReset",
        method: "POST",
        body: data,
      }),
    }),
    resetForgotPassword: builder.mutation({
      query: (data: resetForgotPasswordInput) => ({
        url: `/reset-password/${data.token}`,
        method: "POST",
        body: {
          newPassword: data.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useCurrentProfileMutation,
  useEmailUpdateMutation,
  useUserNameUpdateMutation,
  useNewPasswordUpdateMutation,
  useResetForgotPasswordMutation,
  useForgotPasswordMutation,
} = userApiSlice;
