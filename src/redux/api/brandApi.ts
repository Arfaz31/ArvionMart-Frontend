// brandApi.ts
import { baseApi } from "@/redux/api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Brands
    getAllBrands: builder.query({
      query: (params) => ({
        url: "/brand/all-brand",
        method: "GET",
        params,
      }),
      providesTags: ["Brand"],
    }),

    // Create Brand
    createBrand: builder.mutation({
      query: (payload) => ({
        url: "/brand/create-brand",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Update Brand
    updateBrand: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Delete Brand
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
