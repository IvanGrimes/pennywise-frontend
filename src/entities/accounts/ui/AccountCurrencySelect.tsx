import { NativeSelect } from '@mantine/core';
import { currencySymbols } from '../const';
import { AccountCurrency } from '../model';
import { FormInputProps } from 'shared/form';

export type AccountCurrencySelectProps = FormInputProps & {
  disabled?: boolean;
};

const accountCurrencies: { value: AccountCurrency; label: string }[] = [
  { value: 'rub', label: `Russian Ruble ${currencySymbols.rub}` },
  { value: 'usd', label: `US Dollar ${currencySymbols.usd}` },
  { value: 'eur', label: `Euro ${currencySymbols.eur}` },
  { value: 'aed', label: `Arab Emirates Dirham ${currencySymbols.aed}` },
  { value: 'gbp', label: `Great Britain Pound ${currencySymbols.gbp}` },
];

export const AccountCurrencySelect = (props: AccountCurrencySelectProps) => (
  <NativeSelect label="Currency" data={accountCurrencies} {...props} />
);
