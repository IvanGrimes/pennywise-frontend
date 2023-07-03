import { Burger } from '@mantine/core';
import { Container } from '../Container';
import { Group } from '../Group';
import styled from '@emotion/styled';
import { rem } from '../rem';

export const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
});

export const StyledMenuList = styled(Group)(({ theme }) => ({
  [theme.fn.smallerThan('xs')]: {
    display: 'none',
  },
}));

export const StyledMenuListItem = styled.li<{ active: boolean }>(
  ({ theme, active }) => ({
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&& > a': {
      textDecoration: 'none',
      color: 'inherit',
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
    },

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    ...(active
      ? {
          '&, &:hover': {
            backgroundColor: theme.fn.variant({
              variant: 'light',
              color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
              variant: 'light',
              color: theme.primaryColor,
            }).color,
          },
        }
      : {}),
  })
);

export const StyledBurger = styled(Burger)(({ theme }) => ({
  [theme.fn.largerThan('xs')]: {
    display: 'none',
  },
}));
