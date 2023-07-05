import { Button, ButtonProps } from 'shared/ui';

export type ResendButtonProps = Pick<
  ButtonProps,
  'className' | 'sx' | 'loading'
> & {
  onClick: () => void;
};

export const ResendButton = (props: ResendButtonProps) => (
  <Button variant="light" color="teal" size="xs" compact {...props}>
    Resend link
  </Button>
);
