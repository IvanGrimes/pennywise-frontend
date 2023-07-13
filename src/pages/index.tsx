import { Routes, Route } from 'react-router-dom';
import { routes } from 'shared/routes';
import { lazy } from 'react';
import { Layout } from 'shared/ui';
import { Header } from 'widgets/header';

const Main = lazy(() => import('./Main'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
const EmailVerification = lazy(() => import('./EmailVerification'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const SetPassword = lazy(() => import('./SetPassword'));

export const Routing = () => (
  <Layout headerSlot={<Header />}>
    <Routes>
      <Route path={routes.main} element={<Main />} />
      <Route path={routes.signIn} element={<SignIn />} />
      <Route path={routes.signUp} element={<SignUp />} />
      <Route path={routes.verifyEmail} element={<EmailVerification />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route path={routes.setPassword} element={<SetPassword />} />
    </Routes>
  </Layout>
);
