import { FunctionComponent } from 'react';
import { Notifications } from 'shared/notifications';

export const withNotifications = (Component: FunctionComponent) => {
  const WrappedComponent = () => (
    <>
      <Notifications />
      <Component />
    </>
  );

  return WrappedComponent;
};
