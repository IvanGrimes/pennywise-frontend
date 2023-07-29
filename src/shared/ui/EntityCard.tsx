import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { createStyles } from './createStyles';
import { Card } from './Card';

export type EntityCardProps = PropsWithChildren<{ href?: string }>;

const useStyles = createStyles((theme) => ({
  link: {
    display: 'block',
    textDecoration: 'none',

    '&&': {
      ':hover': {
        textDecoration: 'none',
      },
    },

    '& + &': {
      marginTop: theme.spacing.lg,
    },
  },
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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
      <Link className={classes.link} to={href}>
        <Card {...props}>{children}</Card>
      </Link>
    );
  }

  return <Card {...props}>{children}</Card>;
};
