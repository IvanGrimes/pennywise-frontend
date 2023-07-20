import { formatAccountBalance } from '../utils';
import { FormInputProps } from 'shared/form';
import { useInputState } from 'shared/hooks';
import { Select } from 'shared/ui';
import { GetAccountsResponseDto, AccountCurrency } from '../model';
import {
  AccountSelectItem,
  AccountSelectItemOption,
} from './AccountSelectItem';

export type AccountSelectProps = FormInputProps &
  ReturnType<typeof useAccountSelect> & {
    loading?: boolean;
    currentAccountBalance: number;
    currentAccountCurrency: AccountCurrency;
    accounts: GetAccountsResponseDto[];
    disabled?: boolean;
  };

export const useAccountSelect = (initialValue: string) =>
  useInputState(initialValue);

export const AccountSelect = ({
  value,
  onChange,
  loading,
  currentAccountBalance,
  currentAccountCurrency,
  accounts,
  disabled,
  ...props
}: AccountSelectProps) => {
  // @todo: add skeleton
  if (loading) return <>Loading</>;

  return (
    <Select
      sx={(theme) => ({
        position: 'relative',

        '&:before': {
          content: `'${formatAccountBalance({
            balance: currentAccountBalance,
            currency: currentAccountCurrency,
          })}'`,
          position: 'absolute',
          zIndex: 1,
          right: 40,
          top: 'calc(50% + 12px)',
          fontWeight: 500,
          fontSize: theme.fontSizes.sm,
          lineHeight: 1,
          transform: 'translateY(-50%)',
          opacity: disabled ? 0.5 : 1,
        },
      })}
      itemComponent={AccountSelectItem}
      data={accounts.map<AccountSelectItemOption>((item) => ({
        value: String(item.id),
        label: item.name,
        description: formatAccountBalance(item),
      }))}
      label="Account"
      value={value}
      onChange={onChange}
      dropdownPosition="bottom"
      disabled={disabled}
      {...props}
    />
  );
};
