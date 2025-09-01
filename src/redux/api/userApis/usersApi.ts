
import { ChangePassword } from "../../../models/changePswd";
import { User } from "../../../models/user";
import { ResponseData } from "../../../models/utils/responseData";
import { ResponseItems } from "../../../models/utils/responseItems";
import { mainApi } from "../api";

export const usersApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<ResponseItems<User[]>, void>({
      query: () => ({
        url: "/api/v1/users",
        method: "GET",
      }),
    }),
    getActiveUsers: builder.query<ResponseData<User[]>, void>({
      query: () => ({
        url: "/api/v1/users",
        method: "GET",
      })
    }),
    getDeletedUsers: builder.query<ResponseData<User[]>, void>({
      query: () => ({
        url: "/api/v1/users",
        method: "GET",
      }),
    }),
    addUser: builder.mutation<ResponseData<User>, User>({
      query: (body) => ({
        url: `/api/v1/users`,
        method: "POST",
        body: JSON.stringify(body)
      })
    }),
    editUser: builder.mutation<ResponseItems<User>, User>({
      query: (body) => ({
        url: `/api/v1/users/${body.id}`,
        method: 'PUT',
        body: JSON.stringify(body)
      })
    }),
    deleteUser: builder.mutation<ResponseData<User>, number>({
      query: (userId) => ({
        url: `/api/v1/users?userId=${userId}`,
        method: 'DELETE',
      })
    }),
    changeMyPassword: builder.mutation<ResponseData<User>, ChangePassword>({
      query: (changedPswd) => ({
        url: `/ap/change-my-password?userId=${changedPswd.userId}&oldPassword=${changedPswd.oldPassword}&newPassword=${changedPswd.newPassword}`,
        method: "POST",
      }),
    }),
    changeUserPassword: builder.mutation<ResponseData<User>, ChangePassword>({
      query: (changedPswd) => ({
        url: `/ap/user-change-password?userId=${changedPswd.userId}&newPassword=${changedPswd.newPassword}`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllUsersQuery,
  useGetActiveUsersQuery,
  useGetDeletedUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
  useAddUserMutation,
  useChangeMyPasswordMutation,
  useChangeUserPasswordMutation
} = usersApi;
