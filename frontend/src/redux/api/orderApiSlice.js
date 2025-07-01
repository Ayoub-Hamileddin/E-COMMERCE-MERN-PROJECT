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
    createPayMethod: builder.mutation({
      query: ({ orderId, detaills }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: detaills,
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${`${ORDER_URL}/mine`}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
    }),
    delivredOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
      }),
    }),
    getTotalsales: builder.query({
      url: `${ORDER_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDER_URL}/total-sales-by-date`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetaillsQuery,
  useCreatePayMethodMutation,
  useDelivredOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetPayPalClientIdQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalsalesQuery,
} = orderApiSlice;
