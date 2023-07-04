import { createEffect, createEvent, createStore, Effect } from 'effector';
import { ApiError, SignInRequestDto, SignUpRequestDto } from 'generated/api';
import { api } from 'shared/api';

enum AuthEnum {
  init,
  authed,
  guest,
}

type Token = string | null;

const signUpFx = createEffect((params: SignUpRequestDto) =>
  api.auth.signUp(params)
);

const signInFx = createEffect((params: SignInRequestDto) =>
  api.auth.signIn(params)
);

const signOutFx = createEffect(() => api.auth.signOut());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorStore = <T extends Effect<any, any, Error>>(effect: T) =>
  createStore<Record<string, string>>({}).on(
    [effect.failData],
    (_, error) => (error as ApiError).body as Record<string, string>
  );

export const $signUpError = getErrorStore(signUpFx);

export const $signInError = getErrorStore(signUpFx);

export const $signOutError = getErrorStore(signUpFx);

const setToken = createEvent<Token>();

export const $token = createStore<Token>('')
  .on(
    [signInFx.doneData, signUpFx.doneData],
    (_, { accessToken }) => accessToken
  )
  .on(signOutFx.doneData, (state, { success }) => (success ? null : state))
  .on(setToken, (_, payload) => payload);

export const $auth = createStore(AuthEnum.init).on($token, (_, payload) =>
  payload ? AuthEnum.authed : AuthEnum.guest
);

export const $isAuthInit = $auth.map((auth) => auth === AuthEnum.init);

export const $isAuthed = $auth.map((auth) => auth === AuthEnum.authed);

export const $isGuest = $auth.map((auth) => auth === AuthEnum.guest);

export const events = { setToken };

export const effects = { signUpFx, signInFx, signOutFx };
