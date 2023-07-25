import { PropsWithChildren } from 'react';
import { Modal as BaseModal, ScrollArea } from '@mantine/core';
import { rem } from './rem';

export type ModalProps = PropsWithChildren<{
  title: string;
  opened: boolean;
  onClose: () => void;
}>;

export const Modal = ({ opened, onClose, title, children }: ModalProps) => (
  <BaseModal.Root opened={opened} onClose={onClose}>
    <BaseModal.Overlay />
    <BaseModal.Content scrollAreaComponent={ScrollArea.Autosize}>
      <BaseModal.Header>
        <BaseModal.Title sx={{ fontSize: rem(20) }}>{title}</BaseModal.Title>
        <BaseModal.CloseButton />
      </BaseModal.Header>
      <BaseModal.Body>{children}</BaseModal.Body>
    </BaseModal.Content>
  </BaseModal.Root>
);
