import { CompanyType } from "../../../models/companyType";
import { ResponseItems } from "../../../models/utils/responseItems";
import { mainApi } from "../api";

export const companyTypeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCompanyTypes: builder.query<
      ResponseItems<CompanyType[]>,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 20 } = {}) => ({
        url: `/api/v1/company-types?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),

    addCompanyType: builder.mutation<any, CompanyType>({
      query: (body) => ({
        url: `/api/v1/company-types`,
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),

    editCompanyType: builder.mutation<any, CompanyType>({
      query: (body) => ({
        url: `/api/v1/company-types/${body.id}`,
        method: "PATCH",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (companyType, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          companyType.id = res.data.result!.id;
        } catch {}
      },
    }),

    deleteCompanyType: builder.mutation<any, number>({
      query: (companyTypeId) => ({
        url: `/api/v1/company-types/${companyTypeId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveCompanyTypesQuery,
  useAddCompanyTypeMutation,
  useEditCompanyTypeMutation,
  useDeleteCompanyTypeMutation,
} = companyTypeApi;
