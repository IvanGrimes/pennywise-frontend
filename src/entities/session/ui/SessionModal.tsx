import { Modal } from 'shared/ui';
import { PropsWithChildren } from 'react';

export type SessionModalProps = PropsWithChildren<{
  opened: boolean;
  onClose: () => void;
}>;

export const SessionModal = ({
  opened,
  onClose,
  children,
}: SessionModalProps) => (
    <Modal title="Sessions" opened={opened} onClose={onClose}>{children}</Modal>
);
