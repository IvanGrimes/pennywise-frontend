import { api } from "shared/api";
export const addTagTypes = ["session"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      all: build.query<AllApiResponse, AllApiArg>({
        query: () => ({ url: `/session/all` }),
        providesTags: ["session"],
      }),
      terminate: build.mutation<TerminateApiResponse, TerminateApiArg>({
        query: (queryArg) => ({
          url: `/session/terminate`,
          method: "POST",
          body: queryArg.terminateRequestDto,
        }),
        invalidatesTags: ["session"],
      }),
      terminateAll: build.mutation<TerminateAllApiResponse, TerminateAllApiArg>(
        {
          query: () => ({ url: `/session/terminate-all`, method: "POST" }),
          invalidatesTags: ["session"],
        }
      ),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type AllApiResponse = /** status 200  */ AllResponseDto[];
export type AllApiArg = void;
export type TerminateApiResponse = /** status 200  */ TerminateResponseDto;
export type TerminateApiArg = {
  terminateRequestDto: TerminateRequestDto;
};
export type TerminateAllApiResponse = /** status 200  */ TerminateResponseDto;
export type TerminateAllApiArg = void;
export type AllResponseDto = {
  id: number;
  browserName?: string;
  browserVersion?: string;
  deviceType?: string;
  deviceBrand?: string;
  deviceOs?: string;
  location?: string;
  ip: string;
  isRevoked: boolean;
  isCurrent: boolean;
  updatedAt: string;
};
export type TerminateResponseDto = {
  success: boolean;
};
export type TerminateRequestDto = {
  id: number;
};
