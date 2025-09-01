import { Orders } from "../../../models/orders";
import { ResponseItems } from "../../../models/utils/responseItems";
import { mainApi } from "../api";

export const ordersApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveOrders: builder.query<
      ResponseItems<Orders[]>,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 20 } = {}) => ({
        url: `/api/v1/orders?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),

    addOrders: builder.mutation<any, Orders>({
      query: (body) => ({
        url: `/api/v1/orders`,
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),
    editOrders: builder.mutation<any, Orders>({
      query: (body) => ({
        url: `/api/v1/orders/${body.id}`,
        method: "PUT",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (orders, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          orders.id = res.data.result!.id;
        } catch {}
      },
    }),
    deleteOrders: builder.mutation<any, number>({
      query: (ordersId) => ({
        url: `ap/orders-delete?ordersId=${ordersId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveOrdersQuery,
  useAddOrdersMutation,
  useEditOrdersMutation,
  useDeleteOrdersMutation,
} = ordersApi;
