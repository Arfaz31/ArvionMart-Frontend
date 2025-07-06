// bannerApi.ts
import { baseApi } from "@/redux/api/baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBanner: builder.mutation({
      query: (payload) => ({
        url: "/banner/create-banner",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["Banner"],
    }),

    // Get All Banners
    getAllBanners: builder.query({
      query: (params) => ({
        url: "/banner/all-banner",
        method: "GET",
        params,
      }),
      providesTags: ["Banner"],
    }),
  }),
});

export const { useCreateBannerMutation, useGetAllBannersQuery } = bannerApi;
