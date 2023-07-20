import {
  accountsApi,
  type GetAccountsResponseDto,
  type CreateAccountRequestDto,
} from 'shared/api';

export type AccountType = CreateAccountRequestDto['type'];

export type AccountCurrency = CreateAccountRequestDto['currency'];

export type AccountIconName = CreateAccountRequestDto['icon'];

export { accountsApi as api };
export type { GetAccountsResponseDto };
