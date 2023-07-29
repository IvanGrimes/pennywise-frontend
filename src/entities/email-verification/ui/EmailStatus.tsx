import { IconMail, IconMailOff } from 'shared/icons';
import { Group, rem, Text } from 'shared/ui';
import { ReactNode } from 'react';

export type EmailStatusProps = {
  email: string;
  isVerified: boolean;
  resendButtonSlot: ReactNode;
};

const iconSize = rem(16);

export const EmailStatus = ({
  email,
  isVerified,
  resendButtonSlot,
}: EmailStatusProps) => (
  <Group spacing={10}>
    {isVerified ? (
      <IconMail color="green" size={iconSize} />
    ) : (
      <IconMailOff color="red" size={iconSize} />
    )}
    <Text
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : '#000',
      })}
    >
      {email}
    </Text>
    {!isVerified && resendButtonSlot}
  </Group>
);
