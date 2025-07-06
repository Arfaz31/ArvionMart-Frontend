// secondarySubCategoryApi.ts
import { baseApi } from "@/redux/api/baseApi";

const secondarySubCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Secondary Subcategories
    getAllSecondarySubcategories: builder.query({
      query: (params) => ({
        url: "/secondary-subcategory/get-all",
        method: "GET",
        params: params,
      }),
      providesTags: ["SecondarySubcategory"],
    }),

    // Get Single Secondary Subcategory by ID
    getSecondarySubcategoryById: builder.query({
      query: (id) => ({
        url: `/secondary-subcategory/single-subcategory/${id}`,
        method: "GET",
      }),
      providesTags: ["SecondarySubcategory"],
    }),

    // Get Secondary Subcategories by Subcategory ID
    getSecondarySubcategoriesBySubcategory: builder.query({
      query: (subcategoryId) => ({
        url: `/secondary-subcategory/subcategory/${subcategoryId}`,
        method: "GET",
      }),
      providesTags: ["SecondarySubcategory"],
    }),

    // Create Secondary Subcategory (admin/superAdmin only)
    createSecondarySubcategory: builder.mutation({
      query: (payload) => ({
        url: "/secondary-subcategory/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["SecondarySubcategory"],
    }),

    // Update Secondary Subcategory (admin/superAdmin only)
    updateSecondarySubcategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/secondary-subcategory/update/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["SecondarySubcategory"],
    }),

    // Delete Secondary Subcategory (admin/superAdmin only)
    deleteSecondarySubcategory: builder.mutation({
      query: (id) => ({
        url: `/secondary-subcategory/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SecondarySubcategory"],
    }),
  }),
});

export const {
  useGetAllSecondarySubcategoriesQuery,
  useGetSecondarySubcategoryByIdQuery,
  useGetSecondarySubcategoriesBySubcategoryQuery,
  useCreateSecondarySubcategoryMutation,
  useUpdateSecondarySubcategoryMutation,
  useDeleteSecondarySubcategoryMutation,
} = secondarySubCategoryApi;
