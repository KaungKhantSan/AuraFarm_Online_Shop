import type { Orderitem } from "@/types/Order";
import { apiSlice } from "./api";

export const OrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      { url: string },
      { items: Orderitem[]; bill: number }
    >({
      query: (body) => ({
        url: "/create-order",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = OrderApiSlice;
