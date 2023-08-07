export const routes = {
  main: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  resetPassword: '/reset-password',
  setPassword: '/reset-password/set-password',
  transactions: '/transactions',
  transactionsPage: (page?: number) =>
    page ? `/transactions/page/${page}` : `/transactions/page/:page`,
  transaction: (id?: number) =>
    id ? `/transactions/${id}` : '/transactions/:id',
  accounts: '/accounts',
  account: (id?: number) => (id ? `/accounts/${id}` : '/accounts/:id'),
  accountPage: ({ id, page }: { id?: number; page?: number } = {}) =>
    id ? `/accounts/${id}/${page}` : '/accounts/:id/:page',
  analytics: '/analytics',
};
