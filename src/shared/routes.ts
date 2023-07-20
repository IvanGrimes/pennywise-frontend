export const routes = {
  main: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  resetPassword: '/reset-password',
  setPassword: '/reset-password/set-password',
  transactions: '/transactions',
  transaction: (id?: number) =>
    id ? `/transactions/${id}` : '/transactions/:id',
  accounts: '/accounts',
  account: (id?: number) => (id ? `/accounts/${id}` : '/accounts/:id'),
};
