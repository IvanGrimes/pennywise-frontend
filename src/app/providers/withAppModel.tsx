import { sample } from 'effector';
import { useEvent } from 'effector-react';
import { authModel } from 'entities/auth';
import { ComponentType, useEffect } from 'react';
import { appModel } from 'shared/appModel';

sample({
  clock: appModel.events.mounted,
  target: [authModel.effects.tokenReadFx],
});

export const withAppModel = (Component: ComponentType) => {
  const WrappedComponent = () => {
    const mounted = useEvent(appModel.events.mounted);

    useEffect(() => {
      mounted();
    }, [mounted]);

    return <Component />;
  };

  return WrappedComponent;
};
