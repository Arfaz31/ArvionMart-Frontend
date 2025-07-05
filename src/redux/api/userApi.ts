// userApi.ts
import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: (params) => ({
        url: "/user/customers",
        method: "GET",
        params: params,
      }),
      providesTags: ["User"],
    }),

    getAllAdmins: builder.query({
      query: (params) => ({
        url: "/user/admin",
        method: "GET",
        params: params,
      }),
      providesTags: ["User"],
    }),

    registerCustomer: builder.mutation({
      query: (payload) => ({
        url: "/user/register",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // Create Admin (admin/superAdmin only)
    createAdmin: builder.mutation({
      query: (payload) => ({
        url: "/user/create-admin",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // Vendor Registration
    createVendor: builder.mutation({
      query: (payload) => ({
        url: "/user/create-vendor",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["User"],
    }),

    // Get My Profile
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Delete User (admin only)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetAllAdminsQuery,
  useRegisterCustomerMutation,
  useCreateAdminMutation,
  useCreateVendorMutation,
  useGetMeQuery,
  useDeleteUserMutation,
} = userApi;
