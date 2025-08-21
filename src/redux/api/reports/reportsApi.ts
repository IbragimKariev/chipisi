
import { ResponseData } from "../../../models/responseData";
import { mainApi } from "../api";


// export class ResFinalEcecutionOrdersGov extends ResponseData {
//   result: EntFinalExOrdersGovernment | null = null;
// }
// export class ResFinalEcecutionOrdersEmpl extends ResponseData {
//   result: EntFinalExOrdersEmployee | null = null;
// }
export class FormServicesPeriodReport {
  start: Date = new Date;
  ends: Date = new Date;
  id: number = 0
}
export const reportsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinalEcecutionOrdersGov: builder.query<any, FormServicesPeriodReport>({
      query: (reportInf) => ({
        url: `/report/get-final-on-the-execution-orders-by-government?governmentId=${reportInf.id}&start=${reportInf.start.toISOString()}&ends=${reportInf.ends.toISOString()}`,
        method: "GET",
      }),
    }),
    getFinalEcecutionOrdersEmpl: builder.query<any, void>({
      query: () => ({
        url: `/report/get-final-on-the-execution-orders-by-employee`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
    useGetFinalEcecutionOrdersGovQuery,
    useGetFinalEcecutionOrdersEmplQuery
} = reportsApi;
