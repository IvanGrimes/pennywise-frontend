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
        query: (queryArg) => ({
          url: `/analytics/getExpensesByCategories`,
          method: "POST",
          body: queryArg.getExpensesByCategoriesRequestDto,
        }),
        providesTags: ["analytics"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetExpensesByCategoriesApiResponse =
  /** status 200  */ GetExpensesByCategoriesResponseDto[];
export type GetExpensesByCategoriesApiArg = {
  getExpensesByCategoriesRequestDto: GetExpensesByCategoriesRequestDto;
};
export type Category = {
  id: number;
  name: string;
  color: string;
};
export type GetExpensesByCategoriesResponseDto = {
  category: Category;
  amount: number;
  percentage: number;
};
export type ExchangeRatesAreUnavailable = {};
export type TransactionType = "income" | "outcome" | "transfer";
export type CategoryFilterBehavior = "exclude" | "include";
export type GetExpensesByCategoriesRequestDto = {
  transactionType?: TransactionType;
  dateFrom?: string;
  dateTo?: string;
  accountIds?: number[];
  categoryIds?: number[];
  categoryBehavior?: CategoryFilterBehavior;
};
