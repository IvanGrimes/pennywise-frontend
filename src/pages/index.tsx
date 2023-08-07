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
const Transactions = lazy(() => import('./Transactions'));
const Transaction = lazy(() => import('./Transaction'));
const Accounts = lazy(() => import('./Accounts'));
const Account = lazy(() => import('./Account'));
const Analytics = lazy(() => import('./Analytics'));

export const Routing = () => (
  <Layout headerSlot={<Header />}>
    <Routes>
      <Route path={routes.main} element={<Main />} />
      <Route path={routes.signIn} element={<SignIn />} />
      <Route path={routes.signUp} element={<SignUp />} />
      <Route path={routes.verifyEmail} element={<EmailVerification />} />
      <Route path={routes.resetPassword} element={<ResetPassword />} />
      <Route path={routes.setPassword} element={<SetPassword />} />
      <Route path={routes.transactions} element={<Transactions />} />
      <Route path={routes.transactionsPage()} element={<Transactions />} />
      <Route path={routes.transaction()} element={<Transaction />} />
      <Route path={routes.accounts} element={<Accounts />} />
      <Route path={routes.account()} element={<Account />} />
      <Route path={routes.accountPage()} element={<Account />} />
      <Route path={routes.analytics} element={<Analytics />} />
    </Routes>
  </Layout>
);
