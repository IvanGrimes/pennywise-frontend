import { FormInputProps } from 'shared/form';
import { Select } from 'shared/ui';
import { AccountIcon, accountIconNames } from './AccountIcon';
import {
  AccountIconSelectItemOption,
  AccountIconSelectItem,
} from './AccountIconSelectItem';

export type AccountIconSelectProps = FormInputProps & {
  disabled?: boolean;
};

const accountIcons = accountIconNames.map<AccountIconSelectItemOption>(
  (name) => ({
    value: name,
    label: name,
    icon: <AccountIcon name={name} />,
  })
);

export const AccountIconSelect = ({
  value,
  ...props
}: AccountIconSelectProps) => (
  <Select
    data={accountIcons}
    itemComponent={AccountIconSelectItem}
    icon={<AccountIcon name={value} />}
    value={value}
    {...props}
  />
);
