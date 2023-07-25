import { useDisclosure } from '@mantine/hooks';

export const useModal = () => {
  const [opened, { open, close }] = useDisclosure();

  return { opened, open, close };
};
