// categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Category
    createCategory: builder.mutation({
      query: (payload) => ({
        url: `/category/create-category`,
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
        formData: true,
      }),
      invalidatesTags: ["Category"],
    }),

    // getCategories: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item: TAgsType) => {
    //         params.append(item.key, item.value);
    //       });
    //     }

    //     return {
    //       url: `/category/all-category`,
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["Category"],
    // }),

    // Get All Categories
    getCategories: builder.query({
      query: (params) => ({
        url: "/category/all-category",
        method: "GET",
        params,
      }),
      providesTags: ["Category"],
    }),

    // Update Category
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: payload,
        formData: true,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete Category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
