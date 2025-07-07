// brandOfferApi.ts
import { baseApi } from "@/redux/api/baseApi";

const brandOfferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Brand Offer (admin/superAdmin only)
    createBrandOffer: builder.mutation({
      query: (payload) => ({
        url: "/brand-offer-card",
        method: "POST",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["BrandOffer"],
    }),

    // Get All Brand Offers
    getAllBrandOffers: builder.query({
      query: (params) => ({
        url: "/brand-offer-card",
        method: "GET",
        params,
      }),
      providesTags: ["BrandOffer"],
    }),

    // Get Top Brand Offers
    getTopBrandOffers: builder.query({
      query: () => ({
        url: "/brand-offer-card/top-brands",
        method: "GET",
      }),
      providesTags: ["BrandOffer"],
    }),

    // Update Brand Offer (admin/superAdmin only)
    updateBrandOffer: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/brand-offer-card/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: payload,
      }),
      invalidatesTags: ["BrandOffer"],
    }),

    // Delete Brand Offer (admin/superAdmin only)
    deleteBrandOffer: builder.mutation({
      query: (id) => ({
        url: `/brand-offer-card/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BrandOffer"],
    }),
  }),
});

export const {
  useCreateBrandOfferMutation,
  useGetAllBrandOffersQuery,
  useGetTopBrandOffersQuery,
  useUpdateBrandOfferMutation,
  useDeleteBrandOfferMutation,
} = brandOfferApi;
