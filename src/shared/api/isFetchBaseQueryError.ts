import { ApiErrorResponseDto } from 'generated/rtk-query/auth';

const isObject = (target: unknown): target is object =>
  typeof target === 'object' && target !== null;

export function isApiError(
  error: unknown
): error is { status: number; data: ApiErrorResponseDto } {
  return (
    isObject(error) &&
    'status' in error &&
    typeof error.status === 'number' &&
    'data' in error &&
    isObject(error.data) &&
    'correlationId' in error.data
  );
}
