
import { ChangePassword } from "../../../models/changePswd";
import { User } from "../../../models/user";
import { ResponseData } from "../../../models/utils/responseData";
import { mainApi } from "../api";

export const usersApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<ResponseData<User[]>, void>({
      query: () => ({
        url: "/ap/user-get-list-all",
        method: "GET",
      }),
    }),
    getActiveUsers: builder.query<ResponseData<User[]>, void>({
      query: () => ({
        url: "/ap/user-get-list-active",
        method: "GET",
      })
    }),
    getDeletedUsers: builder.query<ResponseData<User[]>, void>({
      query: () => ({
        url: "/ap/user-get-list-deleted",
        method: "GET",
      }),
    }),
    addUser: builder.mutation<ResponseData<User>, User>({
      query: (body) => ({
        url: `ap/add-user`,
        method: "POST",
        body: JSON.stringify(body)
      })
    }),
    editUser: builder.mutation<ResponseData<User>, User>({
      query: (body) => ({
        url: `ap/edit-user`,
        method: 'PUT',
        body: JSON.stringify(body)
      })
    }),
    deleteUser: builder.mutation<ResponseData<User>, number>({
      query: (userId) => ({
        url: `ap/delete-user?userId=${userId}`,
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
