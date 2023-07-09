import { createStyles } from '../createStyles';
import { rem } from '../rem';

export const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  menuList: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
  menuListItem: {
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
  },
  menuListItemActive: {
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
  },
  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },
}));
