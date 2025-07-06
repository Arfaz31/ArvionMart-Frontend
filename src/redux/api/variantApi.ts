// variantApi.ts
import { baseApi } from "@/redux/api/baseApi";

const variantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Variant (admin/superAdmin only)
    createVariant: builder.mutation({
      query: (payload) => ({
        url: "/variant/create-variant",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Variant"],
    }),

    // Get All Variants
    getAllVariants: builder.query({
      query: (params) => ({
        url: "/variant",
        method: "GET",
        params, // For pagination, filtering, sorting
      }),
      providesTags: ["Variant"],
    }),

    // Get Variants by Product ID
    getVariantsByProduct: builder.query({
      query: ({ id, ...params }) => ({
        url: `/variant/product/${id}`,
        method: "GET",
        params, // For pagination within product variants
      }),
      providesTags: ["Variant"],
    }),

    // Get Single Variant
    getSingleVariant: builder.query({
      query: (id) => ({
        url: `/variant/${id}`,
        method: "GET",
      }),
      providesTags: ["Variant"],
    }),

    // Update Variant (admin/superAdmin only)
    updateVariant: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/variant/update/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Variant"],
    }),

    // Delete Variant (admin/superAdmin only)
    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `/variant/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variant"],
    }),

    // Update Variant Stock (admin/superAdmin only)
    updateVariantStock: builder.mutation({
      query: ({ variantId, payload }) => ({
        url: `/variant/${variantId}/stock`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["Variant"],
    }),
  }),
});

export const {
  useCreateVariantMutation,
  useGetAllVariantsQuery,
  useGetVariantsByProductQuery,
  useGetSingleVariantQuery,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantStockMutation,
} = variantApi;
