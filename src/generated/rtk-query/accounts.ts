import { api } from "shared/api";
export const addTagTypes = ["accounts"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createAccount: build.mutation<
        CreateAccountApiResponse,
        CreateAccountApiArg
      >({
        query: (queryArg) => ({
          url: `/accounts/create`,
          method: "POST",
          body: queryArg.createAccountRequestDto,
        }),
        invalidatesTags: ["accounts"],
      }),
      getAccounts: build.query<GetAccountsApiResponse, GetAccountsApiArg>({
        query: () => ({ url: `/accounts/get` }),
        providesTags: ["accounts"],
      }),
      getAccountById: build.query<
        GetAccountByIdApiResponse,
        GetAccountByIdApiArg
      >({
        query: (queryArg) => ({ url: `/accounts/${queryArg.id}` }),
        providesTags: ["accounts"],
      }),
      updateAccountById: build.mutation<
        UpdateAccountByIdApiResponse,
        UpdateAccountByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/accounts/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateAccountByIdRequestDto,
        }),
        invalidatesTags: ["accounts"],
      }),
      deleteAccountById: build.mutation<
        DeleteAccountByIdApiResponse,
        DeleteAccountByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/accounts/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["accounts"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type CreateAccountApiResponse =
  /** status 201  */ CreateAccountResponseDto;
export type CreateAccountApiArg = {
  createAccountRequestDto: CreateAccountRequestDto;
};
export type GetAccountsApiResponse =
  /** status 200  */ GetAccountsResponseDto[];
export type GetAccountsApiArg = void;
export type GetAccountByIdApiResponse =
  /** status 200  */ GetAccountsResponseDto;
export type GetAccountByIdApiArg = {
  id: number;
};
export type UpdateAccountByIdApiResponse = /** status 200  */ undefined;
export type UpdateAccountByIdApiArg = {
  id: number;
  updateAccountByIdRequestDto: UpdateAccountByIdRequestDto;
};
export type DeleteAccountByIdApiResponse = /** status 200  */ undefined;
export type DeleteAccountByIdApiArg = {
  id: number;
};
export type CreateAccountResponseDto = {
  success: boolean;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type CreateAccountRequestDto = {
  name: string;
  type:
    | "cash"
    | "saving"
    | "checking"
    | "debit"
    | "credit"
    | "loan"
    | "deposit";
  currency: "rub" | "usd" | "eur" | "gbp" | "aed";
  icon:
    | "savings"
    | "card"
    | "checking"
    | "cash"
    | "coins"
    | "mortgage"
    | "deposit";
  isDefault: boolean;
  balance: number;
};
export type GetAccountsResponseDto = {
  id: number;
  type:
    | "cash"
    | "saving"
    | "checking"
    | "debit"
    | "credit"
    | "loan"
    | "deposit";
  name: string;
  icon:
    | "savings"
    | "card"
    | "checking"
    | "cash"
    | "coins"
    | "mortgage"
    | "deposit";
  balance: number;
  isDefault: boolean;
  currency: "rub" | "usd" | "eur" | "gbp" | "aed";
};
export type UpdateAccountByIdRequestDto = {
  name?: string;
  type?:
    | "cash"
    | "saving"
    | "checking"
    | "debit"
    | "credit"
    | "loan"
    | "deposit";
  icon?:
    | "savings"
    | "card"
    | "checking"
    | "cash"
    | "coins"
    | "mortgage"
    | "deposit";
  isDefault?: boolean;
};
