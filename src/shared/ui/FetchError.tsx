import { PropsWithChildren } from 'react';
import { IconReload } from 'shared/icons';
import { Flex } from './Flex';
import { Text } from './Text';
import { rem } from './rem';
import { ActionIcon } from './ActionIcon';
import { Button } from './Button';

export type FetchErrorProps = PropsWithChildren<{
  variant?: 'standard' | 'inline';
  onRetry: () => void;
}>;

export const FetchError = ({
  variant = 'standard',
  children,
  onRetry,
}: FetchErrorProps) => {
  if (variant === 'inline') {
    return (
      <Flex align="center">
        <ActionIcon
          size="sm"
          variant="outline"
          color="blue"
          mr={8}
          onClick={onRetry}
        >
          <IconReload size="1rem" />
        </ActionIcon>
        <Text fz="xs" color="dimmed">
          {children}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={rem(16)}>
      <Text>{children}</Text>
      <Button
        sx={{ alignSelf: 'flex-start' }}
        variant="light"
        size="xs"
        onClick={onRetry}
        rightIcon={<IconReload size="1rem" />}
      >
        Retry
      </Button>
    </Flex>
  );
};
