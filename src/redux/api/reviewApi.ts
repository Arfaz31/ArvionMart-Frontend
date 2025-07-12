// reviewApi.ts
import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Review (customer only)
    createReview: builder.mutation({
      query: (payload) => ({
        url: "/review/create-review",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Review"],
    }),

    // Get Reviews by Product ID
    getReviewsByProduct: builder.query({
      query: (productId) => {
        // console.log(productId);
        return {
          url: `/review/product/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["Review"],
    }),

    // Update Review (customer only)
    updateReview: builder.mutation({
      query: ({ reviewId, payload }) => ({
        url: `/review/update/${reviewId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["Review"],
    }),

    // Delete Review (customer/admin/superAdmin)
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/review/delete/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsByProductQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
