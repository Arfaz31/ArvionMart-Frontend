// promotionalBannerApi.ts
import { baseApi } from "@/redux/api/baseApi";

const promotionalBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Promotional Banner (admin/superAdmin only)
    createPromotionalBanner: builder.mutation({
      query: (payload) => ({
        url: "/promotional-banner/create-promotional-banner",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["PromotionalBanner"],
    }),

    // Get All Promotional Banners
    getAllPromotionalBanners: builder.query({
      query: (params) => ({
        url: "/promotional-banner/all-promotional-banner",
        method: "GET",
        params,
      }),
      providesTags: ["PromotionalBanner"],
    }),
  }),
});

export const {
  useCreatePromotionalBannerMutation,
  useGetAllPromotionalBannersQuery,
} = promotionalBannerApi;
