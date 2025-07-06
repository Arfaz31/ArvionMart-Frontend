// productApi.ts
import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Products
    getAllProducts: builder.query({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params, // For pagination, filtering, sorting
      }),
      providesTags: ["Product"],
    }),

    // Get Single Product
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/single/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Get New Arrivals
    getNewArrivals: builder.query({
      query: (params) => ({
        url: "/product/new-arrivals",
        method: "GET",
        params, // Can include limit, sort, etc.
      }),
      providesTags: ["Product"],
    }),

    // Get Products by Category
    getProductsByCategory: builder.query({
      query: ({ categoryId, ...params }) => ({
        url: `/product/category/${categoryId}`,
        method: "GET",
        params, // For pagination within category
      }),
      providesTags: ["Product"],
    }),

    // Get Products by Brand
    getProductsByBrand: builder.query({
      query: ({ brandId, ...params }) => ({
        url: `/product/brand/${brandId}`,
        method: "GET",
        params, // For pagination within brand
      }),
      providesTags: ["Product"],
    }),

    // Get Product Count by Vendor
    getProductsCountByVendor: builder.query({
      query: () => ({
        url: "/product/product-count",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Create Product (admin/superAdmin only)
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/create-product",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update Product (admin/superAdmin only)
    updateProduct: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete Product (admin/superAdmin only)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetNewArrivalsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByBrandQuery,
  useGetProductsCountByVendorQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
