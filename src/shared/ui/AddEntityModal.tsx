import { PropsWithChildren } from 'react';
import { useDisclosure } from 'shared/hooks';
import { Modal } from './Modal';
import { Button } from './Button';
import { IconPlus } from 'shared/icons';

export type AddEntityModalProps = PropsWithChildren<
  ReturnType<typeof useAddEntityModal> & {
    title: string;
    buttonText: string;
  }
>;

export const useAddEntityModal = () => {
  const [opened, { open, close }] = useDisclosure();

  return { opened, open, close };
};

export const AddEntityModal = ({
  title,
  buttonText,
  children,
  open,
  close,
  opened,
}: AddEntityModalProps) => (
  <>
    <Modal.Root opened={opened} onClose={close}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
    <Button size="xs" leftIcon={<IconPlus size="1rem" />} onClick={open}>
      {buttonText}
    </Button>
  </>
);
