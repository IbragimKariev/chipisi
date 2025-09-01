import { Product } from "../../../models/product";
import { ProductVariant } from "../../../models/productVariant";
import { ResponseItems } from "../../../models/utils/responseItems";
import { mainApi } from "../api";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveProducts: builder.query<
      ResponseItems<Product[]>,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 20 } = {}) => ({
        url: `/api/v1/catalog/skus?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),
    getProductItem: builder.query<Product, number>({
      query: (id) => ({
        url: `/api/v1/catalog/skus/${id}`,
        method: "GET",
      }),
    }),
    getProductVariants: builder.query<ResponseItems<ProductVariant[]>, number>({
      query: (id) => ({
        url: `/api/v1/catalog/skus/${id}/variants`,
        method: "GET",
      }),
    }),

    addProduct: builder.mutation<any, Product>({
      query: (body) => ({
        url: `/api/v1/catalog/skus`,
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),
    addProductVariant: builder.mutation<
      any,
      { productId: number; variant: ProductVariant }
    >({
      query: ({ productId, variant }) => ({
        url: `/api/v1/catalog/skus/${productId}/variants`,
        method: "POST",
        body: JSON.stringify(variant),
      }),
    }),
    updateProductVariant: builder.mutation<
      any,
      { productId: number; variant: ProductVariant }
    >({
      query: ({ productId, variant }) => ({
        url: `/api/v1/catalog/skus/${productId}/variants/${variant.id}`,
        method: "PUT",
        body: JSON.stringify(variant),
      }),
    }),
    editProduct: builder.mutation<any, Product>({
      query: (body) => ({
        url: `/api/v1/catalog/skus/${body.id}`,
        method: "PUT",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (product, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          product.id = res.data.result!.id;
        } catch {}
      },
    }),
    deleteProduct: builder.mutation<any, number>({
      query: (productId) => ({
        url: `ap/product-delete?productId=${productId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetProductItemQuery,
  useGetProductVariantsQuery,
  useAddProductVariantMutation,
  useUpdateProductVariantMutation
} = productApi;
