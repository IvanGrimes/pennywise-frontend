import { PropsWithChildren, ReactNode, useState } from 'react';
import { Menu } from 'shared/ui';

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
        {children}
      </Menu.Dropdown>
    </Menu>
  );
};
