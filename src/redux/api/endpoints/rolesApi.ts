import { Role } from "../../../models/role";
import { deleteById } from "../../../utils";
import { mainApi } from "../api";



export const rolesApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveRoles: builder.query<any, void>({
      query: () => ({
        url: "/api/v1/roles",
        method: "GET",
      }),
    }),
    getDeletedRoles: builder.query<any, void>({
      query: () => ({
        url: "/ap/role-get-list-deleted",
        method: "GET",
      }),
    }),

    addRole: builder.mutation<any, Role>({
      query: (body) => ({
        url: `ap/role-add`,
        method: "POST",
        body: JSON.stringify(body)
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
        
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
    editRole: builder.mutation<any, Role>({
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
    deleteRole: builder.mutation<any, number>({
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
    
  }),
  overrideExisting: false,
});

export const {
  useGetActiveRolesQuery,
  useGetDeletedRolesQuery,
  useAddRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
