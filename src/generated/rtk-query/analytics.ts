import { api } from "shared/api";
export const addTagTypes = ["analytics"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getExpensesByCategories: build.query<
        GetExpensesByCategoriesApiResponse,
        GetExpensesByCategoriesApiArg
      >({
        query: () => ({ url: `/analytics/getExpensesByCategories` }),
        providesTags: ["analytics"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetExpensesByCategoriesApiResponse =
  /** status 200  */ GetExpensesByCategoriesResponseDto[];
export type GetExpensesByCategoriesApiArg = void;
export type Category = {
  name: string;
  color: string;
};
export type GetExpensesByCategoriesResponseDto = {
  category: Category;
  amount: number;
  percentage: number;
};
export type ExchangeRatesAreUnavailable = {};
