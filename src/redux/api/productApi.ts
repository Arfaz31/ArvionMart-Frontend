import { baseApi } from "@/redux/api/baseApi";

export interface TAgsType {
  key: string;
  value: string;
}

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TAgsType) => {
            params.append(item.key, item.value);
          });
        }

        return {
          url: "/product",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
