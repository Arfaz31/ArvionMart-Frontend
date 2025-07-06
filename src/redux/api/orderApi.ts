// orderApi.ts
import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Sales Reports (admin/superAdmin only)
    getReports: builder.query({
      query: (params) => ({
        url: "/order/reports",
        method: "GET",
        params,
      }),
      providesTags: ["Order"],
    }),

    // Get All Orders (admin/superAdmin/vendor)
    getAllOrders: builder.query({
      query: (params) => ({
        url: "/order",
        method: "GET",
        params,
      }),
      providesTags: ["Order"],
    }),

    // Get My Orders (customer/admin/superAdmin)
    getMyOrders: builder.query({
      query: (params) => ({
        url: "/order/my-orders",
        method: "GET",
        params, // For pagination, status filtering
      }),
      providesTags: ["Order"],
    }),

    // Get Single Order (customer/admin/superAdmin)
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/order/my-orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    // Create Order (customer/admin/superAdmin)
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/order/create-order",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Order"],
    }),

    // Update Delivery Status (admin/superAdmin/vendor)
    updateDeliveryStatus: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/order/update-deliver-status/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["Order"],
    }),

    // Request Order Cancellation (customer)
    requestCancelOrder: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `/order/cancel-request/${orderId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["Order"],
    }),

    // Review Cancel Request (admin/superAdmin)
    reviewCancelRequest: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `/order/cancel-review/${orderId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useGetSingleOrderQuery,
  useCreateOrderMutation,
  useUpdateDeliveryStatusMutation,
  useRequestCancelOrderMutation,
  useReviewCancelRequestMutation,
} = orderApi;
