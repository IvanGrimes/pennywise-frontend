import { GetAccountsResponseDto, currencySymbol } from './model';

export const formatAccountBalance = ({
  balance,
  currency,
}: Pick<GetAccountsResponseDto, 'balance' | 'currency'>) =>
  `${balance} ${currencySymbol[currency]}`;
