// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { attachLogger } from 'effector-logger';

import { createRoot } from 'react-dom/client';
import { App } from 'app';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
attachLogger();

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
