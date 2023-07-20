import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryRefreshToken } from './baseQueryRefreshToken';

export const api = createApi({
  baseQuery: baseQueryRefreshToken,
  endpoints: () => ({}),
  refetchOnReconnect: true,
  refetchOnFocus: true,
});
