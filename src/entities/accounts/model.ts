import {
  accountsApi,
  type GetAccountsResponseDto,
  type CreateAccountRequestDto,
  type UpdateAccountByIdRequestDto,
} from 'shared/api';

export type AccountType = CreateAccountRequestDto['type'];

export type AccountCurrency = CreateAccountRequestDto['currency'];

export type AccountIconName = CreateAccountRequestDto['icon'];

export const currencySymbol: Record<AccountCurrency, string> = {
  eur: '€',
  usd: '$',
  gbp: '£',
  rub: '₽',
  aed: 'د.إ',
};

export const accountType: Record<AccountType, string> = {
  cash: 'Cash',
  checking: 'Checking',
  credit: 'Credit card',
  debit: 'Debit card',
  deposit: 'Deposit',
  loan: 'Loan',
  saving: 'Saving',
};

export {
  accountsApi as api,
  GetAccountsResponseDto,
  UpdateAccountByIdRequestDto,
};
