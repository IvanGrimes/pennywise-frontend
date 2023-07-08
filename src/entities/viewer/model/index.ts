import { createEffect, createStore } from 'effector';
import { api, MeResponseDto } from 'shared/api';

const fetchMeFx = createEffect(api.user.me);

export const $me = createStore<MeResponseDto | null>(null).on(
  fetchMeFx.doneData,
  (_, payload) => payload
);

export const $meError = createStore<string | null>(null)
  .on(fetchMeFx.pending, (state, payload) => (payload ? null : state))
  .on(fetchMeFx.failData, (_, e) => e.message);

export const effects = { fetchMeFx };
