import { FormEventHandler, ReactNode } from 'react';
import { Paper } from './Paper';
import { Flex } from './Flex';
import { Box } from './Box';

export type AddEntityFormLayoutProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  inputsSlot: ReactNode;
  submitButtonSlot: ReactNode;
};

export const AddEntityFormLayout = ({
  onSubmit,
  inputsSlot,
  submitButtonSlot,
}: AddEntityFormLayoutProps) => (
  <Paper p="md" component="form" onSubmit={onSubmit} withBorder>
    <Flex direction="column" gap="sm">
      {inputsSlot}
    </Flex>
    <Box mt="lg">{submitButtonSlot}</Box>
  </Paper>
);
