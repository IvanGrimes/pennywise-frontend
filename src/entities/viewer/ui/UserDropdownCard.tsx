import {
  Avatar,
  Group,
  rem,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  Menu,
} from 'shared/ui';
import { IconChevronDown } from 'shared/icons';
import { dropdownIconStroke } from './const';
import styled from '@emotion/styled';

export type UserDropdownCardProps = {
  active: boolean;
  firstName: string;
  lastName: string;
};

const StyledButton = styled(UnstyledButton)<
  UnstyledButtonProps & { active: boolean }
>(({ theme, active }) => ({
  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.radius.sm,
  transition: 'background-color 100ms ease',

  '&:hover': {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  ...(active
    ? {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      }
    : {}),
}));

export const UserDropdownCard = ({
  active,
  firstName,
  lastName,
}: UserDropdownCardProps) => (
  <Menu.Target>
    <StyledButton active={active}>
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
        <IconChevronDown size={rem(12)} stroke={dropdownIconStroke} />
      </Group>
    </StyledButton>
  </Menu.Target>
);
