// subCategoryApi.ts
import { baseApi } from "@/redux/api/baseApi";

const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Subcategories
    getAllSubcategories: builder.query({
      query: (params) => ({
        url: "/subcategory/all-subcategory",
        method: "GET",
        params,
      }),
      providesTags: ["Subcategory"],
    }),

    // Get Subcategories by Category ID
    getSubcategoriesByCategory: builder.query({
      query: (categoryId) => ({
        url: `/subcategory/get-subcategory-by-category/${categoryId}`,
        method: "GET",
      }),
      providesTags: (result, error, categoryId) => [
        { type: "Subcategory", id: categoryId },
      ],
    }),

    // Create Subcategory
    createSubcategory: builder.mutation({
      query: (payload) => ({
        url: "/subcategory/create-subcategory",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    // Update Subcategory
    updateSubcategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/subcategory/update/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    // Delete Subcategory
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategory"],
    }),
  }),
});

export const {
  useGetAllSubcategoriesQuery,
  useGetSubcategoriesByCategoryQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} = subCategoryApi;
