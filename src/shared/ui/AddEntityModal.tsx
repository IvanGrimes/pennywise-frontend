import { PropsWithChildren } from 'react';
import { useModal } from 'shared/hooks';
import { Modal } from './Modal';
import { AddEntityButton } from './AddEntityButton';

export type AddEntityModalProps = PropsWithChildren<
  ReturnType<typeof useModal> & {
    title: string;
    buttonText: string;
  }
>;

export const AddEntityModal = ({
  title,
  buttonText,
  children,
  open,
  close,
  opened,
}: AddEntityModalProps) => (
  <>
    <Modal opened={opened} onClose={close} title={title}>
      {children}
    </Modal>
    <AddEntityButton onClick={open}>{buttonText}</AddEntityButton>
  </>
);
