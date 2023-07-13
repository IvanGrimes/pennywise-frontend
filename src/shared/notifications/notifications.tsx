import { notifications, NotificationProps } from '@mantine/notifications';
import { IconExclamationCircle, IconCircleCheck } from 'shared/icons';

export const showErrorNotification = ({
  autoClose = 5000,
  message,
  ...props
}: Omit<NotificationProps, 'icon' | 'color'>) =>
  notifications.show({
    color: 'red',
    icon: <IconExclamationCircle />,
    autoClose,
    message,
    ...props,
  });

export const showSuccessNotification = ({
  autoClose = 5000,
  message,
  ...props
}: Omit<NotificationProps, 'icon' | 'color'>) =>
  notifications.show({
    color: 'green',
    icon: <IconCircleCheck />,
    autoClose,
    message,
    ...props,
  });
