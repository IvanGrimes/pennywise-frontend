import { FormEventHandler, ReactNode } from 'react';
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
  <form onSubmit={onSubmit}>
    <Flex direction="column" gap="sm">
      {inputsSlot}
    </Flex>
    <Box mt="lg">{submitButtonSlot}</Box>
  </form>
);
