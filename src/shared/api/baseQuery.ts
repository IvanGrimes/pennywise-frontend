import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'shared/config';

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as RootState;

    if (auth.accessToken) {
      headers.set('Authorization', `Bearer ${auth.accessToken}`);
    }

    return headers;
  },
  credentials: 'include',
});
