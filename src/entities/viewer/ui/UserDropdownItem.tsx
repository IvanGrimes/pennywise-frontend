import { ComponentType, PropsWithChildren } from 'react';
import { Menu } from 'shared/ui';
import { dropdownIconSize, dropdownIconStroke } from './const';

export type UserDropdownItemProps = PropsWithChildren<{
  Icon: ComponentType<{ size: string; stroke: number }>;
  onClick: () => void;
  loading?: boolean;
}>;

export const UserDropdownItem = ({
  Icon,
  onClick,
  children,
  loading,
}: UserDropdownItemProps) => (
  <Menu.Item
    icon={<Icon size={dropdownIconSize} stroke={dropdownIconStroke} />}
    onClick={onClick}
    disabled={loading}
  >
    {children}
  </Menu.Item>
);
