import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'shared/model';
import { routes } from 'shared/routes';
import { authModel } from 'entities/auth';

export const withPublicGuard = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const isAuthInit = useAppSelector(authModel.isInit);
    const isGuest = useAppSelector(authModel.isGuest);
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
