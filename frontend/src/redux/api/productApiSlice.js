import { PRODUCTS_URL, UPLOAD_URL } from "../constantes";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (keyword) => ({
        url: `${PRODUCTS_URL}`,
        params: `${keyword}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    getProductsById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        providesTags: () => [{ type: "Product", id: productId }],
      }),
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/allproducts`,
      }),
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    uploadImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/new`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    filterProducts: builder.mutation({
      query: (checked, radio) => ({
        url: `${PRODUCTS_URL}/filtred-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadImageMutation,
  useFilterProductsMutation,
} = productApiSlice;
