import { ReactNode, useState } from 'react';
import { Menu } from 'shared/ui';
import { IconSettings } from 'shared/icons';
import { dropdownIconSize, dropdownIconStroke } from './const';

export type UserDropdownProps = {
  userCardSlot: (props: { active: boolean }) => ReactNode;
  emailSlot: ReactNode;
  sessionsItemSlot: ReactNode;
  signOutItemSlot: ReactNode;
};

export const UserDropdown = ({
  userCardSlot,
  emailSlot,
  sessionsItemSlot,
  signOutItemSlot,
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
      {userCardSlot({ active: open })}
      <Menu.Dropdown>
        <Menu.Label>{emailSlot}</Menu.Label>
        <Menu.Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          icon={
            <IconSettings size={dropdownIconSize} stroke={dropdownIconStroke} />
          }
        >
          Account settings
        </Menu.Item>
        {sessionsItemSlot}
        {signOutItemSlot}
      </Menu.Dropdown>
    </Menu>
  );
};
