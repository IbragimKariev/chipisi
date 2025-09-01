import { Company } from "../../../models/company";
import { ResponseItems } from "../../../models/utils/responseItems";
import { mainApi } from "../api";

export const companyApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCompanies: builder.query<
      ResponseItems<Company[]>,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 1, pageSize = 20 } = {}) => ({
        url: `/api/v1/companies?page=${page}&pageSize=${pageSize}`,
        method: "GET",
      }),
    }),

    addCompany: builder.mutation<any, Company>({
      query: (body) => ({
        url: `/api/v1/companies`,
        method: "POST",
        body: JSON.stringify(body),
      }),
    }),
    editCompany: builder.mutation<any, Company>({
      query: (body) => ({
        url: `/api/v1/companies/${body.id}`,
        method: "PUT",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (company, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          company.id = res.data.result!.id;
        } catch {}
      },
    }),
    deleteCompany: builder.mutation<any, number>({
      query: (companyId) => ({
        url: `ap/company-delete?companyId=${companyId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveCompaniesQuery,
  useAddCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
