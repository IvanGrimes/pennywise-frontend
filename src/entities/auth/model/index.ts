import { createEffect, createStore, Effect } from 'effector';
import { api, SignUpRequestDto, ApiError, SignInRequestDto } from 'shared/api';

enum AuthEnum {
  init,
  authed,
  guest,
}

type Token = string | null;

const key = 'ACCESS_TOKEN';

const readAccessToken = (): Token => localStorage.getItem(key);

const writeAccessToken = (value: string) => localStorage.setItem(key, value);

const removeAccessToken = () => localStorage.removeItem(key);

const tokenReadFx = createEffect(readAccessToken);

const tokenSetFx = createEffect((token: string) => {
  writeAccessToken(token);

  return token;
});

const tokenRemoveFx = createEffect(() => {
  removeAccessToken();

  return null;
});

const signUpFx = createEffect(async (params: SignUpRequestDto) => {
  const result = await api.auth.signUp(params);

  await tokenSetFx(result.accessToken);

  return result;
});

const signInFx = createEffect(async (params: SignInRequestDto) => {
  const result = await api.auth.signIn(params);

  await tokenSetFx(result.accessToken);

  return result;
});

const signOutFx = createEffect(async () => {
  await api.auth.signOut();

  await tokenRemoveFx();
});

const tokenRefreshFx = createEffect(async () => {
  const { accessToken } = await api.auth.refresh();

  api.setToken(accessToken);

  await tokenSetFx(accessToken);

  return accessToken;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorStore = <T extends Effect<any, any, Error>>(effect: T) =>
  createStore<Record<string, string>>({}).on(
    [effect.failData],
    (_, error) => (error as ApiError).body as Record<string, string>
  );

export const $signUpError = getErrorStore(signUpFx);

export const $signInError = getErrorStore(signInFx);

export const $signOutError = getErrorStore(signOutFx);

export const $token = createStore<Token>('').on(
  [
    tokenReadFx.doneData,
    tokenSetFx.doneData,
    tokenRemoveFx.doneData,
    tokenRefreshFx.doneData,
  ],
  (_, payload) => payload ?? null
);

$token.watch((token) => api.setToken(token ?? ''));

export const $auth = createStore(AuthEnum.init).on($token, (_, payload) =>
  payload ? AuthEnum.authed : AuthEnum.guest
);

export const $isAuthInit = $auth.map((auth) => auth === AuthEnum.init);

export const $isAuthed = $auth.map((auth) => auth === AuthEnum.authed);

export const $isGuest = $auth.map((auth) => auth === AuthEnum.guest);

export const effects = {
  signUpFx,
  signInFx,
  signOutFx,
  tokenReadFx,
  tokenSetFx,
  tokenRefreshFx,
};
