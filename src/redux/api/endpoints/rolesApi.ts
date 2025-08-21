import { ResponseData } from "../../../models/responseData";
import { Role } from "../../../models/role";
import { EntRoleMethods } from "../../../models/roleMethods";
import { EntRoleMethodsIdGet } from "../../../models/roleMethodsGet";
import { EntRoles } from "../../../models/roles";
import { deleteById } from "../../../utils";
import { mainApi } from "../api";



interface IResultRole {
  success: boolean;
  message: string;
  error: string;
  result: Role[] | null;
  time: string;
  ver: string;
}
export class ResGetRoleList extends ResponseData {
  result: Role[] = [];;
}
export class ResGetRole extends ResponseData {
  result: Role | null = null;
}
export class ResGetRolesListMethods extends ResponseData {
  result: EntRoleMethodsIdGet[] = [];
}
export class ResGetRoles extends ResponseData {
  result: EntRoles | null = null;
}
export const rolesApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveRoles: builder.query<ResGetRoleList, void>({
      query: () => ({
        url: "ap/role-get-list-active",
        method: "GET",
      }),
    }),
    getDeletedRoles: builder.query<ResGetRoleList, void>({
      query: () => ({
        url: "/ap/role-get-list-deleted",
        method: "GET",
      }),
    }),
    getAccessRestByRole: builder.query<ResGetRolesListMethods, number>({
      query: (rolesId) => ({
        url: `/ap/get-access-rest-by-role?rolesId=${rolesId}`,
        method: "GET",
      }),
    }),
    addRole: builder.mutation<ResGetRole, Role>({
      query: (body) => ({
        url: `ap/role-add`,
        method: "POST",
        body: JSON.stringify(body)
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          // const res = await queryFulfilled;
          // const rol = res.data.result!;
          dispatch(
            rolesApi.util.updateQueryData(
              "getActiveRoles",
              undefined,
              (getActiveRoles) => {
                getActiveRoles.result?.push(user)
              }
            )
          )
        } catch { }
      }
    }),
    editRole: builder.mutation<ResGetRole, Role>({
      query: (body) => ({
        url: `ap/role-edit`,
        method: 'PUT',
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          user.id = res.data.result!.id;
          dispatch(
            rolesApi.util.updateQueryData(
              'getActiveRoles',
              undefined,
              (getActiveRoles) => {
                // editById(getActiveUsers.result, user)
              }
            )
          )
        } catch { }
      }
    }),
    deleteRole: builder.mutation<ResGetRole, number>({
      query: (roleId) => ({
        url: `ap/role-delete?roleId=${roleId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (roleId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            rolesApi.util.updateQueryData(
              "getActiveRoles",
              undefined,
              (getActiveRoles: any) => {
                deleteById(getActiveRoles.result, roleId);
              }
            )
          )
        } catch { }
      }
    }),
    addRoleMethods: builder.mutation<ResGetRoles, EntRoleMethods>({
      query: (body) => ({
        url: "/ap/add-access-rest",
        method: "POST",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          user.id = res.data.result!.id;

        } catch {}
      },
    }),
    editRoleMethods: builder.mutation<ResGetRoles, EntRoleMethods>({
      query: (body) => ({
        url: "/ap/edit-access-rest",
        method: "PUT",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          user.id = res.data.result!.id;

        } catch {}
      },
    }),
    deleteRoleMethods: builder.mutation<ResGetRoles, EntRoleMethods>({
      query: (body) => ({
        url: "/ap/delete-access-rest",
        method: "DELETE",
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;

        } catch {}
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetActiveRolesQuery,
  useGetDeletedRolesQuery,
  useAddRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,

  useAddRoleMethodsMutation,
  useDeleteRoleMethodsMutation,
  useEditRoleMethodsMutation,
  useGetAccessRestByRoleQuery
} = rolesApi;
