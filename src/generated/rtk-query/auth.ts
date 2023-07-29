import { api } from "shared/api";
export const addTagTypes = ["auth"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      signUp: build.mutation<SignUpApiResponse, SignUpApiArg>({
        query: (queryArg) => ({
          url: `/auth/sign-up`,
          method: "POST",
          body: queryArg.signUpRequestDto,
        }),
        invalidatesTags: ["auth"],
      }),
      signIn: build.mutation<SignInApiResponse, SignInApiArg>({
        query: (queryArg) => ({
          url: `/auth/sign-in`,
          method: "POST",
          body: queryArg.signInRequestDto,
        }),
        invalidatesTags: ["auth"],
      }),
      refresh: build.mutation<RefreshApiResponse, RefreshApiArg>({
        query: () => ({ url: `/auth/refresh`, method: "POST" }),
        invalidatesTags: ["auth"],
      }),
      signOut: build.mutation<SignOutApiResponse, SignOutApiArg>({
        query: () => ({ url: `/auth/sign-out`, method: "POST" }),
        invalidatesTags: ["auth"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type SignUpApiResponse = /** status 201  */ SignUpResponseDto;
export type SignUpApiArg = {
  signUpRequestDto: SignUpRequestDto;
};
export type SignInApiResponse = /** status 200  */ SignInResponseDto;
export type SignInApiArg = {
  signInRequestDto: SignInRequestDto;
};
export type RefreshApiResponse = /** status 200  */ RefreshTokenResponseDto;
export type RefreshApiArg = void;
export type SignOutApiResponse = /** status 200  */ SignOutResponseDto;
export type SignOutApiArg = void;
export type SignUpResponseDto = {
  accessToken: string;
  refreshToken: string;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type SignUpRequestDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type SignInResponseDto = {
  accessToken: string;
  refreshToken?: string;
};
export type SignInRequestDto = {
  email: string;
  password: string;
  remember: boolean;
};
export type RefreshTokenResponseDto = {
  accessToken: string;
  refreshToken?: string;
};
export type SignOutResponseDto = {
  success: boolean;
};
