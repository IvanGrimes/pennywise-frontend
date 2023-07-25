import { PropsWithChildren } from 'react';
import { IconPlus } from 'shared/icons';
import { Button } from './Button';

export type AddEntityButtonProps = PropsWithChildren<{ onClick: () => void }>;

export const AddEntityButton = ({
  onClick,
  children,
}: AddEntityButtonProps) => (
  <Button size="xs" leftIcon={<IconPlus size="1rem" />} onClick={onClick}>
    {children}
  </Button>
);
