import { combine, createEvent, sample } from 'effector';
import { sessionModel } from 'entities/session';

const mounted = createEvent();

sample({
  clock: [
    mounted,
    sessionModel.effects.terminateFx.done,
    sessionModel.effects.terminateAllFx.done,
  ],
  target: sessionModel.effects.getAllFx,
});

export const $terminating = combine(
  sessionModel.effects.terminateFx.pending,
  sessionModel.effects.terminateAllFx.pending
).map((state) => state.some(Boolean));

export const model = { $terminating, events: { mounted } };
