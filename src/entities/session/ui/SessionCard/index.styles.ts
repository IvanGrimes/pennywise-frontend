import { createStyles, rem } from 'shared/ui';

export const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'column',

    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },
}));
