import { api } from "shared/api";
export const addTagTypes = ["reset-password"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      reset: build.query<ResetApiResponse, ResetApiArg>({
        query: (queryArg) => ({
          url: `/reset-password/reset`,
          params: { email: queryArg.email },
        }),
        providesTags: ["reset-password"],
      }),
      setPassword: build.mutation<SetPasswordApiResponse, SetPasswordApiArg>({
        query: (queryArg) => ({
          url: `/reset-password/set-password`,
          method: "POST",
          body: queryArg.setPasswordRequestDto,
        }),
        invalidatesTags: ["reset-password"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type ResetApiResponse = /** status 200  */ ResetPasswordResponseDto;
export type ResetApiArg = {
  email: string;
};
export type SetPasswordApiResponse = /** status 200  */ SetPasswordResponseDto;
export type SetPasswordApiArg = {
  setPasswordRequestDto: SetPasswordRequestDto;
};
export type ResetPasswordResponseDto = {
  success: boolean;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type SetPasswordResponseDto = {
  success: boolean;
};
export type SetPasswordRequestDto = {
  token: string;
  password: string;
};
