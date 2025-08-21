import { EntDirectoryInfo } from '../../../models/directoryInfo';
import { DistrictFilter } from '../../../models/filters/districtFilter';
import { ResponseData } from '../../../models/responseData';
import { ResultInfo } from '../../../models/resultInfo';
import { mainApi } from '../api';

class Districts extends ResultInfo {
    content: any[] = [];
}
export class ResGetDistrictsList extends ResponseData {
    result: Districts | null = null;
}

class ResGetDistrict extends ResponseData {
    result: any | null = null;
}

export const districtsApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        getDistricts: builder.query<ResGetDistrictsList, DistrictFilter>({
            query: (filter) => ({
                url: '/handbook/get-district-all',
                method: 'POST',
                body: JSON.stringify(filter),
            }),
        }),
        getDistrictById: builder.query<ResGetDistrict, number>({
            query: (id) => ({
                url: `/handbook/districts/${id}`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetDistrictsQuery,
    useLazyGetDistrictsQuery,
    useGetDistrictByIdQuery,
    useLazyGetDistrictByIdQuery,
} = districtsApi;
