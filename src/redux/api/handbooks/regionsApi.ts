import { EntRegionFilter } from "../../../models/filters/regionFilter";
import { Region } from "../../../models/region";
import { ResponseData } from "../../../models/responseData";
import { ResultInfo } from "../../../models/resultInfo";
import { deleteById } from "../../../utils";
import { mainApi } from "../api";



interface IResultRole {
  success: boolean;
  message: string;
  error: string;
  result: Region[] | null;
  time: string;
  ver: string;
}


export class ResGetRegionList extends ResponseData {
  result: Region[] = [];;
}
export class ResGetRegion extends ResponseData {
  result: Region | null = null;
}
class RegionContent extends ResultInfo{
  content: Region[] = [];
}
export class ResGetRegList extends ResponseData{
  result: RegionContent | null = null;
}


export const regionsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegions: builder.query<ResGetRegionList, void>({
      query: () => ({
        url: "/handbook/get-region-list-all",
        method: "GET",
      }),
    }),
    getRegionById: builder.query<ResGetRegion, number>({
      query: (id) => ({
        url: `handbook/region/${id}`,
        method: "GET",
      }),
    }),
    getAllActiveRegions: builder.query<ResGetRegList, EntRegionFilter>({
      query: (filter) => ({
        url: "/handbook/get-region-list-all",
        method: 'POST',
        body: JSON.stringify(filter)
      }),
    }),
    addRegion: builder.mutation<ResGetRegList, Region>({
      query: (body) => ({
        url: `/handbook/add-region`,
        method: "POST",
        body: JSON.stringify(body)
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          // const res = await queryFulfilled;
          // const rol = res.data.result!;
          dispatch(
            regionsApi.util.updateQueryData(
              "getAllRegions",
              undefined,
              (getAllRegions) => {
                getAllRegions.result?.push(user)
              }
            )
          )
        } catch { }
      }
    }),
    editRegion: builder.mutation<ResGetRegion, Region>({
      query: (body) => ({
        url: `handbook/edit-region`,
        method: 'PUT',
        body: JSON.stringify(body),
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        try {
          const res = await queryFulfilled;
          user.id = res.data.result!.id;
          dispatch(
            regionsApi.util.updateQueryData(
              'getAllRegions',
              undefined,
              (getAllRegions) => {
                // editById(getActiveUsers.result, user)
              }
            )
          )
        } catch { }
      }
    }),
    deleteRegion: builder.mutation<ResGetRegion, number>({
      query: (regionId) => ({
        url: `handbook/delete-region?regionId=${regionId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (roleId, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            regionsApi.util.updateQueryData(
              "getAllRegions",
              undefined,
              (getAllRegions: any) => {
                deleteById(getAllRegions.result, roleId);
              }
            )
          )
        } catch { }
      }
    })
  }),
  overrideExisting: false,
});

export const {
  useGetAllRegionsQuery,
  useLazyGetAllRegionsQuery,
  useAddRegionMutation,
  useEditRegionMutation,
  useDeleteRegionMutation,
  useLazyGetAllActiveRegionsQuery,
  useGetRegionByIdQuery
} = regionsApi;
