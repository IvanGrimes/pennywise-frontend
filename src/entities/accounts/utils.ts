import { currencySymbols } from './const';
import { GetAccountsResponseDto } from './model';

export const formatAccountBalance = ({
  balance,
  currency,
}: Pick<GetAccountsResponseDto, 'balance' | 'currency'>) =>
  `${balance} ${currencySymbols[currency]}`;
