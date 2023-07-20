import {
  TransactionDetailsActionButton,
  transactionsModel,
} from 'entities/transactions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isApiError } from 'shared/api';
import { IconTrash } from 'shared/icons';
import { showErrorNotification } from 'shared/notifications';
import { routes } from 'shared/routes.ts';
import { Button, Flex, Popover, Text } from 'shared/ui';

export type TransactionDeleteButtonProps = { id: number };

export const TransactionDeleteButton = ({
  id,
}: TransactionDeleteButtonProps) => {
  const [deleteTransactionMutation, deleteTransaction] =
    transactionsModel.api.useDeleteTransactionByIdMutation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const handleDelete = async () => {
    try {
      setOpened(false);

      await deleteTransactionMutation({ id }).unwrap();

      navigate(routes.transactions);
    } catch (e) {
      const title = 'Transaction delete';
      if (isApiError(e)) {
        showErrorNotification({
          title,
          message: e.data.message,
        });
      }

      showErrorNotification({
        title,
        message: 'Unknown error',
      });
    }
  };

  return (
    <Popover
      arrowSize={12}
      opened={opened}
      onChange={setOpened}
      withArrow
      trapFocus
    >
      <Popover.Target>
        <TransactionDetailsActionButton
          icon={<IconTrash />}
          color="red"
          loading={deleteTransaction.isLoading}
          onClick={() => setOpened(true)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column">
          <Text w={160} fz="sm">
            Are you sure you want to delete a transaction?
          </Text>
          <Button
            variant="outline"
            mt={4}
            color="red"
            size="xs"
            sx={{ alignSelf: 'flex-start' }}
            onClick={handleDelete}
            disabled={deleteTransaction.isLoading}
          >
            Delete
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};
