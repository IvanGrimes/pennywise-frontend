import { createEffect, createStore, combine, createEvent } from 'effector';
import { api, SignInRequestDto, SignUpRequestDto } from 'shared/api';
import { UserResponseDto } from '../../../generated/api';

type Token = string | null;

const signUpFx = createEffect((params: SignUpRequestDto) => api.auth.signUp(params));

const signInFx = createEffect((params: SignInRequestDto) => api.auth.signIn(params));

const signOutFx = createEffect(() => api.auth.signOut());

const fetchViewerFx = createEffect(() => api.auth.user());

const setToken = createEvent<Token>();

export const $token = createStore<Token>(null)
  .on([signInFx.doneData, signUpFx.doneData], (_, { accessToken }) => accessToken)
  .on(signOutFx.doneData, (state, { success }) => (success ? null : state))
  .on(setToken, (_, payload) => payload);

export const $error = createStore<string | null>(null)
  .on([signUpFx.pending, signInFx.pending, signOutFx.pending], () => null)
  .on([signUpFx.failData, signInFx.failData, signOutFx.failData], (_, { message }) => message);

export const $viewer = createStore<UserResponseDto | null>(null).on(fetchViewerFx.doneData, (_, payload) => payload);

export const $loading = combine([signUpFx.pending, signInFx.pending, signOutFx.pending], (pendings) =>
  pendings.some(Boolean)
);

export const $isAuth = $token.map((token) => Boolean(token));

export const effects = { signUpFx, signInFx, signOutFx, fetchViewerFx };

export const events = { setToken };
