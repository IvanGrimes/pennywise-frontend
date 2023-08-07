import { api } from "shared/api";
export const addTagTypes = ["user"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      me: build.query<MeApiResponse, MeApiArg>({
        query: () => ({ url: `/user/me` }),
        providesTags: ["user"],
      }),
      updateMe: build.mutation<UpdateMeApiResponse, UpdateMeApiArg>({
        query: (queryArg) => ({
          url: `/user/me`,
          method: "PATCH",
          body: queryArg.updateMeRequestDto,
        }),
        invalidatesTags: ["user"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type MeApiResponse = /** status 200  */ MeResponseDto;
export type MeApiArg = void;
export type UpdateMeApiResponse = /** status 200  */ undefined;
export type UpdateMeApiArg = {
  updateMeRequestDto: UpdateMeRequestDto;
};
export type MeResponseDto = {
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  mainCurrency: "rub" | "usd" | "eur" | "gbp" | "aed";
  startDay:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type UpdateMeRequestDto = {
  firstName?: string;
  lastName?: string;
  mainCurrency?: "rub" | "usd" | "eur" | "gbp" | "aed";
  startDay?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30;
};
