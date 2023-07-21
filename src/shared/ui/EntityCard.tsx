import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { createStyles } from './createStyles';
import { Card } from './Card';

export type EntityCardProps = PropsWithChildren<{ href?: string }>;

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    textDecoration: 'none',

    '&&': {
      color: theme.colors.dark[9],

      ':hover': {
        textDecoration: 'none',
      },
    },

    '& + &': {
      marginTop: theme.spacing.lg,
    },
  },
}));

export const EntityCard = ({ href, children }: EntityCardProps) => {
  const { classes } = useStyles();
  const props = {
    className: classes.card,
    p: 'md',
    radius: 'md',
    withBorder: true,
  };

  if (href) {
    return (
      <Card to={href} component={Link} {...props}>
        {children}
      </Card>
    );
  }

  return <Card {...props}>{children}</Card>;
};
