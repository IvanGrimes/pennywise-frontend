import { AccountCurrency, AccountType } from './model';

export const currencySymbols: Record<AccountCurrency, string> = {
  eur: '€',
  usd: '$',
  gbp: '£',
  rub: '₽',
  aed: 'د.إ',
};

export const accountTypes: Record<AccountType, string> = {
  cash: 'Cash',
  checking: 'Checking',
  credit: 'Credit card',
  debit: 'Debit card',
  deposit: 'Deposit',
  loan: 'Loan',
  saving: 'Saving',
};
