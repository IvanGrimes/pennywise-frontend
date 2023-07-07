import { api } from 'shared/api';
import { createEffect, createStore } from 'effector';
import { AllResponseDto } from 'generated/api';

const getAllFx = createEffect(api.session.all);

const terminateFx = createEffect(api.session.terminate);

const terminateAllFx = createEffect(api.session.terminateAll);

export const $sessions = createStore<AllResponseDto[]>([]).on(
  getAllFx.doneData,
  (_, payload) => payload
);

export const effects = { getAllFx, terminateFx, terminateAllFx };
