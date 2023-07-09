import { createEvent } from 'effector';

const mounted = createEvent();

export const appModel = { events: { mounted } };
