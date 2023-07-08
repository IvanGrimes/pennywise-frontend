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
  button: {
    alignSelf: 'flex-start',
    height: '1.5rem',
    fontSize: '0.75rem',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',

    '& .mantine-Button-leftIcon': {
      marginRight: '0.25rem',
    },
  },
}));
