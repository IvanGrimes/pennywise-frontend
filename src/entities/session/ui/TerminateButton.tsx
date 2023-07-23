import { PropsWithChildren } from 'react';
import { IconHandStop } from 'shared/icons';
import { Button, createStyles } from 'shared/ui';

const useStyles = createStyles({
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
});

export type TerminateButtonProps = PropsWithChildren<{
  onClick: () => void;
  disabled?: boolean;
}>;

export const TerminateButton = ({
  onClick,
  disabled,
  children,
}: TerminateButtonProps) => {
  const { classes } = useStyles();

  return (
    <Button
      className={classes.button}
      variant="outline"
      color="red"
      size="xs"
      mt={8}
      leftIcon={<IconHandStop size="0.75rem" />}
      fullWidth={false}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
