import { ComponentType } from 'react';
import {
  IconPigMoney,
  IconCreditCard,
  IconBuildingBank,
  IconCash,
  IconCoins,
  IconHomeDollar,
  IconDiscount,
  IconProps,
} from 'shared/icons';
import { AccountIconName } from '../model';

export type AccountIconProps = IconProps & {
  name: AccountIconName;
};

const icons: Record<AccountIconName, ComponentType> = {
  savings: IconPigMoney,
  card: IconCreditCard,
  checking: IconBuildingBank,
  cash: IconCash,
  coins: IconCoins,
  mortgage: IconHomeDollar,
  deposit: IconDiscount,
} as const;

export const accountIconNames = Object.keys(icons) as AccountIconName[];

export const AccountIcon = ({ name, ...props }: AccountIconProps) => {
  const Icon = icons[name];

  if (!Icon) return null;

  return <Icon {...props} />;
};
