import { isAxiosError } from 'axios';
import { createEffect, createStore, EffectByHandler, Store } from 'effector';
import { CancelablePromise } from 'generated/api';

export enum ApiRequestStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
}

type ApiRequestModel<
  N extends string,
  R extends (params: any) => CancelablePromise<any>,
  L = `$${N}Loading`,
  S = `$${N}Success`,
  E = `$${N}Error`,
  F = `${N}Fx`
> = L extends string
  ? S extends string
    ? E extends string
      ? F extends string
        ? {
            [key in L]: Store<boolean>;
          } & {
            [key in S]: Store<boolean>;
          } & {
            [key in E]: Store<string | null>;
          } & {
            [key in F]: EffectByHandler<R, Error>;
          }
        : never
      : never
    : never
  : never;

export const createApiRequestModel = <
  N extends string,
  R extends (params: any) => CancelablePromise<any>
>({
  name,
  request,
  errorMessages,
}: {
  name: N;
  request: R;
  errorMessages: Partial<Record<ApiRequestStatus, string>>;
}): ApiRequestModel<N, R> => {
  const fx = createEffect(request);
  const $success = createStore(false)
    .on(fx.done, () => true)
    .reset(fx.pending);
  const $error = createStore<string | null>(null).on(
    fx.failData,
    (_, payload) => {
      if (isAxiosError(payload)) {
        const message = errorMessages[payload.status as ApiRequestStatus];

        if (message) return message;
      }

      return 'Something went wrong, try again later';
    }
  );
  const $loading = createStore(fx.pending);

  return {
    [`$${name}Success`]: $success,
    [`$${name}Error`]: $error,
    [`$${name}Loading`]: $loading,
    [`${name}Fx`]: fx,
  } as ApiRequestModel<N, R>;
};
