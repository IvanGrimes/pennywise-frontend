import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, type authTypes } from 'shared/api';

enum AuthStatus {
  init,
  auth,
  guest,
}

type AuthState = { status: AuthStatus; accessToken: string | null };

const initialState: AuthState = {
  status: AuthStatus.guest,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (
      state,
      { payload }: PayloadAction<{ accessToken: string | null }>
    ) => {
      state.status = payload.accessToken ? AuthStatus.auth : AuthStatus.guest;
      state.accessToken = payload.accessToken;
    },
    removeToken: (state) => {
      state.status = AuthStatus.guest;
      state.accessToken = null;
    },
  },
});

export const getAccessToken = (state: RootState) => state.auth.accessToken;

export const isInit = (state: RootState) =>
  state.auth.status === AuthStatus.init;
export const isAuth = (state: RootState) =>
  state.auth.status === AuthStatus.auth;
export const isGuest = (state: RootState) =>
  state.auth.status === AuthStatus.guest;

const { reducer, name, actions } = authSlice;
export const { updateToken, removeToken } = actions;

export { reducer, name, authApi as api, type authTypes as types };
