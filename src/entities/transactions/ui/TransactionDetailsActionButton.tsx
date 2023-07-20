import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { ActionIcon, ActionIconProps } from 'shared/ui';

export type TransactionDetailsActionButtonProps = Pick<
  ActionIconProps,
  'color' | 'loading'
> & {
  icon: ReactNode;
  onClick?: () => void;
};

const Component: ForwardRefRenderFunction<
  HTMLButtonElement,
  TransactionDetailsActionButtonProps
> = ({ icon, ...props }, ref) => (
  <ActionIcon ref={ref} size="md" variant="outline" {...props}>
    {icon}
  </ActionIcon>
);

export const TransactionDetailsActionButton = forwardRef(Component);
