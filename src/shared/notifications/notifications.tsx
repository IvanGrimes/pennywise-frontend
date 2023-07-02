import { notifications, NotificationProps } from '@mantine/notifications';
import { IconExclamationCircle } from 'shared/icons';

export const showErrorNotification = ({
  autoClose = 5000,
  ...props
}: Omit<NotificationProps, 'icon' | 'color'>) =>
  notifications.show({
    color: 'red',
    icon: <IconExclamationCircle />,
    autoClose,
    ...props,
  });
