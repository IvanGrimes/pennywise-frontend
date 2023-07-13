import { createAction } from '@reduxjs/toolkit';

import {
  useSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const appInitEvent = createAction('shared/appInit');

export const refreshTokenSuccess = createAction<{ accessToken: string }>(
  'shared/refresh-token-success'
);

export const refreshTokenFail = createAction('shared/refresh-token-fail');
