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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type MeApiResponse = /** status 200  */ MeResponseDto;
export type MeApiArg = void;
export type MeResponseDto = {
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  mainCurrency: "rub" | "usd" | "eur" | "gbp" | "aed";
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
