import { createEffect, createStore, createEvent } from 'effector';
import { api, ApiError, SignInRequestDto, SignUpRequestDto } from 'shared/api';
import { UserResponseDto } from '../../../generated/api';

enum AuthEnum {
  init,
  authed,
  guest,
}

type Token = string | null;

const resetError = createEvent();

const signUpFx = createEffect((params: SignUpRequestDto) => {
  resetError();

  return api.auth.signUp(params);
});

const signInFx = createEffect((params: SignInRequestDto) => {
  resetError();

  return api.auth.signIn(params);
});

const signOutFx = createEffect(() => {
  resetError();

  return api.auth.signOut();
});

const fetchViewerFx = createEffect(() => api.auth.user());

const setToken = createEvent<Token>();

export const $token = createStore<Token>('')
  .on(
    [signInFx.doneData, signUpFx.doneData],
    (_, { accessToken }) => accessToken
  )
  .on(signOutFx.doneData, (state, { success }) => (success ? null : state))
  .on(setToken, (_, payload) => payload);

export const $error = createStore<Record<string, string>>({})
  .on(
    [signUpFx.failData, signInFx.failData, signOutFx.failData],
    (_, error) => (error as ApiError).body as Record<string, string>
  )
  .on(resetError, () => ({}));

export const $viewer = createStore<UserResponseDto | null>(null).on(
  fetchViewerFx.doneData,
  (_, payload) => payload
);

export const $auth = createStore(AuthEnum.init).on($token, (_, payload) =>
  payload ? AuthEnum.authed : AuthEnum.guest
);

export const $isAuthInit = $auth.map((auth) => auth === AuthEnum.init);

export const $isAuthed = $auth.map((auth) => auth === AuthEnum.authed);

export const $isGuest = $auth.map((auth) => auth === AuthEnum.guest);

export const effects = { signUpFx, signInFx, signOutFx, fetchViewerFx };

export const events = { setToken };
