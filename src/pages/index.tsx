import { Routes, Route } from 'react-router-dom';
import { routes } from 'shared/routes';
import { lazy } from 'react';
import { Layout } from 'shared/ui';
import { Header } from 'widgets/header';
import { Sidebar } from 'widgets/sidebar';
import { useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';

const Main = lazy(() => import('./Main'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
const ResetPassword = lazy(() => import('./ResetPassword'));

export const Routing = () => {
  const isAuth = useStore(viewerModel.$isAuthed);

  return (
    <Layout headerSlot={<Header />} sidebarSlot={isAuth ? <Sidebar /> : null}>
      <Routes>
        <Route path={routes.main} element={<Main />} />
        <Route path={routes.signIn} element={<SignIn />} />
        <Route path={routes.signUp} element={<SignUp />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />
      </Routes>
    </Layout>
  );
};
