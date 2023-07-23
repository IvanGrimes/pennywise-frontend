import { PropsWithChildren, ReactNode, useState } from 'react';
import { Menu } from 'shared/ui';
import { IconSettings } from 'shared/icons';
import { dropdownIconSize, dropdownIconStroke } from './const';

export type UserDropdownProps = PropsWithChildren<{
  cardSlot: (props: { active: boolean }) => ReactNode;
  topSlot: ReactNode;
}>;

export const UserDropdown = ({
  cardSlot,
  topSlot,
  children,
}: UserDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      keepMounted
    >
      {cardSlot({ active: open })}
      <Menu.Dropdown>
        <Menu.Label>{topSlot}</Menu.Label>
        <Menu.Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          icon={
            <IconSettings size={dropdownIconSize} stroke={dropdownIconStroke} />
          }
        >
          Account settings
        </Menu.Item>
        {children}
      </Menu.Dropdown>
    </Menu>
  );
};
