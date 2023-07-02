import { Routes, Route } from 'react-router-dom';
import { routes } from 'shared/routes';
import { lazy } from 'react';

const Main = lazy(() => import('./Main'));

export const Routing = () => (
  <Routes>
    <Route path={routes.main} element={<Main />} />
  </Routes>
);
