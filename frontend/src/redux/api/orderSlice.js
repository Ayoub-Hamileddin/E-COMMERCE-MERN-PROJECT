import { apiSlice } from "./apiSlice.js";
import { ORDER_URL, PAYPAL_URL } from "../constantes.js";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetaills: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetaillsQuery } =
  orderApiSlice;
