import type { ProductImage, ProductMeta } from "@/types/product";
import { apiSlice } from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewArrival: builder.query({
      query: () => "/product/new",
      providesTags: ["Product"],
    }),
    getIsFeatured: builder.query({
      query: () => "/product/isfeatured",
      providesTags: ["Product"],
    }),
    getProductDetails: builder.query<ProductImage, string>({
      query: (id: string) => `/product/${id}`,
      providesTags: ["Product"],
    }),
    getProductFilter: builder.query({
      query: ({
        keyword,
        size,
        color,
        minPrice,
        maxPrice,
        category,
        sortBy,
      }) => {
        const params = new URLSearchParams();
        if (size && size.length) {
          size.forEach((size: string) => {
            params.append("size", size);
          });
        }
        if (color && color.length) {
          color.forEach((color: string) => {
            params.append("color", color);
          });
        }
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);
        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);

        return `/product?${params.toString()}`;
      },
      providesTags: ["Product"],
    }),
    getProductMeta: builder.query<ProductMeta, string>({
      query: () => "/filter/meta",
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<ProductImage, FormData>({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      ProductImage,
      { id: string; formData: FormData }
    >({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "PUT",
        body: data.formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<string, { id: string }>({
      query: (data) => ({
        url: `/product/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetNewArrivalQuery,
  useGetIsFeaturedQuery,
  useGetProductDetailsQuery,
  useGetProductFilterQuery,
  useGetProductMetaQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
