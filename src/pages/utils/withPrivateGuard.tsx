import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/routes';
import { authModel } from 'entities/auth';
import { useAppSelector } from 'shared/model';

export const withPrivateGuard = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const isAuthInit = useAppSelector(authModel.isInit);
    const isAuthed = useAppSelector(authModel.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthInit || isAuthed) return;

      navigate(routes.signIn);
    }, [isAuthed, isAuthInit, navigate]);

    if (!isAuthed) return null;

    return <Component />;
  };

  return WrappedComponent;
};
