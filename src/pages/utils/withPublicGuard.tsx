import { FunctionComponent, useEffect } from 'react';
import { useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/routes';

export const withPublicGuard = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const isAuthInit = useStore(viewerModel.$isAuthInit);
    const isGuest = useStore(viewerModel.$isGuest);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthInit || isGuest) return;

      navigate(routes.main);
    }, [isAuthInit, isGuest, navigate]);

    if (!isGuest) {
      return null;
    }

    return <Component />;
  };

  return WrappedComponent;
};
