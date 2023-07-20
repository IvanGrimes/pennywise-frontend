import { api } from "shared/api";
export const addTagTypes = ["categories"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createCategory: build.mutation<
        CreateCategoryApiResponse,
        CreateCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/categories/create`,
          method: "POST",
          body: queryArg.createCategoryRequestDto,
        }),
        invalidatesTags: ["categories"],
      }),
      getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>(
        {
          query: () => ({ url: `/categories/get` }),
          providesTags: ["categories"],
        }
      ),
      getCategoryById: build.query<
        GetCategoryByIdApiResponse,
        GetCategoryByIdApiArg
      >({
        query: (queryArg) => ({ url: `/categories/${queryArg.id}` }),
        providesTags: ["categories"],
      }),
      updateCategory: build.mutation<
        UpdateCategoryApiResponse,
        UpdateCategoryApiArg
      >({
        query: (queryArg) => ({
          url: `/categories/update/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updateCategoryRequestDto,
        }),
        invalidatesTags: ["categories"],
      }),
      deleteById: build.mutation<DeleteByIdApiResponse, DeleteByIdApiArg>({
        query: (queryArg) => ({
          url: `/categories/delete/${queryArg.id}`,
          method: "DELETE",
          body: queryArg.deleteCategoryRequestDto,
        }),
        invalidatesTags: ["categories"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type CreateCategoryApiResponse =
  /** status 201  */ CreateCategoryResponseDto;
export type CreateCategoryApiArg = {
  createCategoryRequestDto: CreateCategoryRequestDto;
};
export type GetCategoriesApiResponse =
  /** status 200  */ GetCategoriesResponseDto[];
export type GetCategoriesApiArg = void;
export type GetCategoryByIdApiResponse =
  /** status 200  */ GetCategoriesResponseDto;
export type GetCategoryByIdApiArg = {
  id: number;
};
export type UpdateCategoryApiResponse =
  /** status 200  */ UpdateCategoryResponseDto[];
export type UpdateCategoryApiArg = {
  id: number;
  updateCategoryRequestDto: UpdateCategoryRequestDto;
};
export type DeleteByIdApiResponse =
  /** status 200  */ DeleteCategoryResponseDto;
export type DeleteByIdApiArg = {
  id: number;
  deleteCategoryRequestDto: DeleteCategoryRequestDto;
};
export type CreateCategoryResponseDto = {
  success: boolean;
};
export type CreateCategoryRequestDto = {
  name: string;
  color: string;
};
export type GetCategoriesResponseDto = {
  id: number;
  name: string;
  color: string;
};
export type ApiErrorResponseDto = {
  statusCode: number;
  message: string;
  error: string;
  correlationId: string;
  subErrors?: string[] | null;
};
export type UpdateCategoryResponseDto = {
  success: boolean;
};
export type UpdateCategoryRequestDto = {
  name?: string;
  color?: string;
};
export type DeleteCategoryResponseDto = {
  success: boolean;
};
export type DeleteCategoryRequestDto = {
  newCategoryId: number;
};
