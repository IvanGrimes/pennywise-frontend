import { createEvent, sample } from 'effector';
import { authModel } from 'entities/auth';
import { viewerModel } from 'entities/viewer';

const mounted = createEvent();

sample({
  clock: mounted,
  source: authModel.$isAuthed,
  filter: (source) => source,
  target: viewerModel.effects.fetchMeFx,
});

export const model = { events: { mounted } };
