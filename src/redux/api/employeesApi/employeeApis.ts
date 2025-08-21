

import { ChangePasswordEmpl } from "../../../models/changePswdEmpl";
import { Employee } from "../../../models/employee";
import { EmployeesFilter } from "../../../models/filters/employeeFilter";
import { ResponseData } from "../../../models/utils/responseData";
import { ResultInfo } from "../../../models/utils/resultInfo";
import { deleteById, getDataFromJson, getJsonFromData } from "../../../utils";
import { mainApi } from "../api";

export const employeesApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<ResponseData<ResultInfo<Employee>>, void>({
      query: () => ({
        url: "/employee/get-list-all",
        method: "GET",
      }),
    }),
    getEmployeeById: builder.query<ResponseData<Employee>, number>({
      query: (idn) => ({
        url: `employee/${idn}`,
        method: 'GET'
      }),
      transformResponse: getDataFromJson
    }),
    getActiveEmployees: builder.query<ResponseData<ResultInfo<Employee>>, EmployeesFilter>({
      query: (filter) => ({
        url: `employee/get-list-active`,
        method: 'POST',
        body: JSON.stringify(filter)
      }),
      transformResponse: getDataFromJson
    }),
    getAllActiveEmployes: builder.query<ResponseData<ResultInfo<Employee>>, void>({
      query: () => ({
        url: "/employee/get-list-active",
        method: "GET",
      }),
      transformResponse: getDataFromJson
    }),
    getAllActiveEmployesScroll: builder.query<ResponseData<ResultInfo<Employee>>, EmployeesFilter>({
      query: (filter) => ({
        url: `employee/get-list-active`,
        method: 'POST',
        body: JSON.stringify(filter)
      }),
    }),

    getAllDeletedEmployes: builder.query<ResponseData<ResultInfo<Employee>>, void>({
      query: () => ({
        url: "/employee/get-list-deleted",
        method: "GET",
      }),
    }),
    changeEmployeePassword: builder.mutation<ResponseData<Employee>, ChangePasswordEmpl>({
      query: (changedPswd) => ({
        url: `/employee/change-password?employeeId=${changedPswd.id}&newPassword=${changedPswd.newPassword}`,
        method: "POST",
      }),
    }),
    addEmployee: builder.mutation<ResponseData<Employee>, Employee>({
      query: (body) => ({
        url: `employee/add`,
        method: "POST",
        body: getJsonFromData(body)
      })
    }),
    editEmployee: builder.mutation<ResponseData<Employee>, Employee>({
      query: (body) => ({
        url: `employee/edit`,
        method: "PUT",
        body: JSON.stringify(body)
      })
    }),
    deleteEmployee: builder.mutation<ResponseData<Employee>, number>({
      query: (employeeId) => ({
        url: `employee/delete?employeeId=${employeeId}`,
        method: 'DELETE',
      })
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllActiveEmployesQuery,
  useLazyGetAllActiveEmployesScrollQuery,
  useGetAllDeletedEmployesQuery,
  useAddEmployeeMutation,
  useEditEmployeeMutation,
  useChangeEmployeePasswordMutation,
  useDeleteEmployeeMutation,
  useLazyGetActiveEmployeesQuery,
  useLazyGetEmployeeByIdQuery
} = employeesApi;