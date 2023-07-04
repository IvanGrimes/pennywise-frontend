import { useState } from 'react';
import { Menu, Text, Group, rem, Avatar } from 'shared/ui';
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconMail,
} from 'shared/icons';
import { StyledButton } from './index.styled';

export type UserDropdownProps = {
  firstName: string;
  lastName: string;
  email: string;
  onSignOut: () => unknown;
};

const iconSize = rem(16);

export const UserDropdown = ({
  firstName,
  lastName,
  email,
  onSignOut,
}: UserDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      withinPortal
    >
      <Menu.Target>
        <StyledButton active={open}>
          <Group spacing={4}>
            <Group spacing={10}>
              <Avatar color="grape" radius="xl" size={30}>
                {firstName[0]}
                {lastName[0]}
              </Avatar>
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {firstName} {lastName}
              </Text>
            </Group>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </StyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Group spacing={10}>
            <IconMail size={iconSize} />
            <Text color="black">{email}</Text>
          </Group>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size={iconSize} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size={iconSize} stroke={1.5} />}
          onClick={onSignOut}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
