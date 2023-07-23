import { ReactNode, useState } from 'react';
import { IconTrash } from 'shared/icons';
import { ActionIcon } from './ActionIcon';
import { Button } from './Button';
import { Flex } from './Flex';
import { Popover } from './Popover';
import { Text } from './Text';

export type DeleteEntityButtonProps = {
  confirmText: ReactNode;
  onConfirm: () => void;
  loading?: boolean;
};

export const DeleteEntityButton = ({
  confirmText,
  loading,
  onConfirm,
}: DeleteEntityButtonProps) => {
  const [opened, setOpened] = useState(false);
  const handleConfirm = () => {
    setOpened(false);
    onConfirm();
  };

  return (
    <Popover
      arrowSize={12}
      opened={opened}
      onChange={setOpened}
      shadow="sm"
      withArrow
      trapFocus
    >
      <Popover.Target>
        <ActionIcon
          size="md"
          variant="outline"
          color="red"
          loading={loading}
          onClick={() => setOpened(true)}
        >
          <IconTrash />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column">
          <Text fz="sm">{confirmText}</Text>
          <Button
            variant="outline"
            mt={4}
            color="red"
            size="xs"
            sx={{ alignSelf: 'flex-start' }}
            onClick={handleConfirm}
            disabled={loading}
            data-autofocus
          >
            Delete
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
