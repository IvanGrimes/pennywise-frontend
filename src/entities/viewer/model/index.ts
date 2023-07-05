import { createEffect, createStore } from 'effector';
import { api, MeResponseDto } from 'shared/api';

const fetchViewerFx = createEffect(api.user.me);

export const $viewer = createStore<MeResponseDto | null>(null).on(
  fetchViewerFx.doneData,
  (_, payload) => payload
);

export const effects = { fetchViewerFx };
