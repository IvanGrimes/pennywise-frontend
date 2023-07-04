import { createEffect, createStore } from 'effector';
import { api } from 'shared/api';
import { UserResponseDto } from '../../../generated/api';

const fetchViewerFx = createEffect(() => api.auth.user());

export const $viewer = createStore<UserResponseDto | null>(null).on(
  fetchViewerFx.doneData,
  (_, payload) => payload
);

export const effects = { fetchViewerFx };
