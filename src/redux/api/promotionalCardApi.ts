// promotionalBannerApi.ts
import { baseApi } from "@/redux/api/baseApi";

const promotionalCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Promotional Banner (admin/superAdmin only)
    createPromotionalCard: builder.mutation({
      query: (payload) => ({
        url: "/promo-card/create-promo-card",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["PromotionalCard"],
    }),

    // Get All Promotional Banners
    getAllPromotionalCards: builder.query({
      query: (params) => ({
        url: "/promo-card/get-all-promo-card",
        method: "GET",
        params,
      }),
      providesTags: ["PromotionalCard"],
    }),
  }),
});

export const {
  useCreatePromotionalCardMutation,
  useGetAllPromotionalCardsQuery,
} = promotionalCardApi;
