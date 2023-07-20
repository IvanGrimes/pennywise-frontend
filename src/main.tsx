import { createRoot } from 'react-dom/client';
import { App } from 'app';

// @todo: replace rtk-query codegen with openapi-codegen
// @todo: migrate from rtk-query to custom api reducers
// @todo: add currency to account

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
