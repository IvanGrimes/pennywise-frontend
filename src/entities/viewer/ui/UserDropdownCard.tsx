import {
  Avatar,
  Group,
  rem,
  Text,
  UnstyledButton,
  Menu,
  Skeleton,
  Flex,
  createStyles,
} from 'shared/ui';
import { IconChevronDown } from 'shared/icons';
import { dropdownIconStroke } from './const';

export type UserDropdownCardProps = {
  active: boolean;
  firstName: string;
  lastName: string;
};

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },
  buttonActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

export const UserDropdownCardSkeleton = () => (
  <Flex align="center" gap={12}>
    <Skeleton height={30} circle />
    <Skeleton height={18} width={108} />
  </Flex>
);

export const UserDropdownCard = ({
  active,
  firstName,
  lastName,
}: UserDropdownCardProps) => {
  const { classes, cx } = useStyles();

  return (
    <Menu.Target>
      <UnstyledButton
        className={cx(classes.button, active && classes.buttonActive)}
      >
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
      </UnstyledButton>
    </Menu.Target>
  );
};
