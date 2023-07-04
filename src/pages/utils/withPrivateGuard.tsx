import { FunctionComponent, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/routes';
import { authModel } from 'entities/auth';

export const withPrivateGuard = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const isAuthInit = useStore(authModel.$isAuthInit);
    const isAuthed = useStore(authModel.$isAuthed);
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
