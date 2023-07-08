import { Modal, rem, ScrollArea } from 'shared/ui';
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
  <Modal.Root opened={opened} onClose={onClose}>
    <Modal.Overlay />
    <Modal.Content scrollAreaComponent={ScrollArea.Autosize}>
      <Modal.Header>
        <Modal.Title sx={{ fontSize: rem(20) }}>Sessions</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal.Content>
  </Modal.Root>
);
