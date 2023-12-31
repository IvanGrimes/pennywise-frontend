import { api } from "shared/api";
export const addTagTypes = ["transactions"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createTransaction: build.mutation<
        CreateTransactionApiResponse,
        CreateTransactionApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/create`,
          method: "POST",
          body: queryArg.createTransactionRequestDto,
        }),
        invalidatesTags: ["transactions"],
      }),
      getTransactions: build.query<
        GetTransactionsApiResponse,
        GetTransactionsApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/get`,
          method: "POST",
          body: queryArg.getTransactionsRequestDto,
          params: { offset: queryArg.offset, limit: queryArg.limit },
        }),
        providesTags: ["transactions"],
      }),
      getTransactionById: build.query<
        GetTransactionByIdApiResponse,
        GetTransactionByIdApiArg
      >({
        query: (queryArg) => ({ url: `/transactions/${queryArg.id}` }),
        providesTags: ["transactions"],
      }),
      updateTransactionById: build.mutation<
        UpdateTransactionByIdApiResponse,
        UpdateTransactionByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateTransactionByIdRequestDto,
        }),
        invalidatesTags: ["transactions"],
      }),
      deleteTransactionById: build.mutation<
        DeleteTransactionByIdApiResponse,
        DeleteTransactionByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["transactions"],
      }),
      getTransactionsByAccount: build.query<
        GetTransactionsByAccountApiResponse,
        GetTransactionsByAccountApiArg
      >({
        query: (queryArg) => ({
          url: `/transactions/account/${queryArg.id}`,
          params: { offset: queryArg.offset, limit: queryArg.limit },
        }),
        providesTags: ["transactions"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type CreateTransactionApiResponse =
  /** status 201  */ CreateTransactionResponseDto;
export type CreateTransactionApiArg = {
  createTransactionRequestDto: CreateTransactionRequestDto;
};
export type GetTransactionsApiResponse =
  /** status 200  */ GetTransactionsResponseDto;
export type GetTransactionsApiArg = {
  offset: number;
  limit: number;
  getTransactionsRequestDto: GetTransactionsRequestDto;
};
export type GetTransactionByIdApiResponse =
  /** status 200  */ TransactionItemDto;
export type GetTransactionByIdApiArg = {
  id: number;
};
export type UpdateTransactionByIdApiResponse =
  /** status 200  */ UpdateTransactionByIdResponseDto;
export type UpdateTransactionByIdApiArg = {
  id: number;
  updateTransactionByIdRequestDto: UpdateTransactionByIdRequestDto;
};
export type DeleteTransactionByIdApiResponse =
  /** status 200  */ DeleteTransactionByIdResponseDto;
export type DeleteTransactionByIdApiArg = {
  id: number;
};
export type GetTransactionsByAccountApiResponse =
  /** status 200  */ GetTransactionsByAccountResponseDto;
export type GetTransactionsByAccountApiArg = {
  id: number;
  offset: number;
  limit: number;
};
export type CreateTransactionResponseDto = {
  success: boolean;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type TransactionType = "income" | "outcome" | "transfer";
export type CreateTransactionRequestDto = {
  type: TransactionType;
  categoryId: number;
  accountId: number;
  amount: number;
  description: string;
};
export type TransactionItemDto = {
  id: number;
  type: TransactionType;
  amount: number;
  mainCurrencyAmount?: number;
  description?: string;
  accountId: number;
  categoryId: number;
  date: string;
};
export type GetTransactionsResponseDto = {
  list: TransactionItemDto[];
  count: number;
};
export type CategoryFilterBehavior = "exclude" | "include";
export type GetTransactionsRequestDto = {
  transactionType?: TransactionType;
  dateFrom?: string;
  dateTo?: string;
  accountIds?: number[];
  categoryIds?: number[];
  categoryBehavior?: CategoryFilterBehavior;
};
export type UpdateTransactionByIdResponseDto = {
  success: boolean;
};
export type UpdateTransactionByIdRequestDto = {
  type?: TransactionType;
  categoryId?: number;
  accountId?: number;
  amount?: number;
  description?: string;
};
export type DeleteTransactionByIdResponseDto = {
  success: boolean;
};
export type GetTransactionsByAccountResponseDto = {
  list: TransactionItemDto[];
  count: number;
};
