import { configureStore } from '@reduxjs/toolkit';
import { authModel } from 'entities/auth';
import { api } from 'shared/api';
import { accessTokenListener } from 'features/auth/access-token';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authModel.name]: authModel.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(accessTokenListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
