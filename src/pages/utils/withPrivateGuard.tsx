import { FunctionComponent, useEffect } from 'react';
import { useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useNavigate } from 'react-router-dom';
import { routes } from 'shared/routes';

export const withPrivateGuard = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const isAuthInit = useStore(viewerModel.$isAuthInit);
    const isAuthed = useStore(viewerModel.$isAuthed);
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
