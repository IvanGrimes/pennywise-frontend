import { api } from "shared/api";
export const addTagTypes = ["email-verification"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      verify: build.mutation<VerifyApiResponse, VerifyApiArg>({
        query: (queryArg) => ({
          url: `/email-verification/verify`,
          method: "POST",
          body: queryArg.verifyRequestDto,
        }),
        invalidatesTags: ["email-verification"],
      }),
      resend: build.mutation<ResendApiResponse, ResendApiArg>({
        query: () => ({ url: `/email-verification/resend`, method: "POST" }),
        invalidatesTags: ["email-verification"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type VerifyApiResponse = /** status 200  */ VerifyResponseDto;
export type VerifyApiArg = {
  verifyRequestDto: VerifyRequestDto;
};
export type ResendApiResponse = unknown;
export type ResendApiArg = void;
export type VerifyResponseDto = {
  success: boolean;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type VerifyRequestDto = {
  token: string;
};
