import { createStyles } from 'shared/ui';

export const useStyles = createStyles((theme) => ({
  actions: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },

    '& > *': {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  },
}));
