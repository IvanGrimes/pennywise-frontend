import { useState } from 'react';
import { useEvent } from 'effector-react';
import { Avatar, viewerModel } from 'entities/viewer';
import { Menu, Text, Group, rem } from 'shared/ui';
import {
  IconChevronDown,
  IconSettings,
  IconLogout,
  IconMail,
} from 'shared/icons';
import { StyledButton } from './ui.styled';

export type DropdownProps = {
  firstName: string;
  lastName: string;
  email: string;
};

const iconSize = rem(16);

export const Dropdown = ({ firstName, lastName, email }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const signOut = useEvent(viewerModel.effects.signOutFx);

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
              <Avatar firstName={firstName} lastName={lastName} />
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
        <Menu.Item icon={<IconLogout size={iconSize} stroke={1.5} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
