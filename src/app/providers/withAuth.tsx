import { FunctionComponent, useEffect } from 'react';
import { useMount } from 'shared/hooks';
import { routes } from 'shared/routes';
import { api } from 'shared/api';
import axios from 'axios';
import { useStore, useEvent } from 'effector-react';
import { useLocation } from 'react-router';
import { authModel } from 'entities/auth';
import { useNavigate } from 'react-router-dom';
import { viewerModel } from '../../entities/viewer';

export const withAuth = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const token = useStore(authModel.$token);
    const isAuthInit = useStore(authModel.$isAuthInit);
    const setToken = useEvent(authModel.events.setToken);
    const location = useLocation();
    const navigate = useNavigate();

    useMount(() => {
      if (token) return;

      setToken(readAccessToken());
    });

    useEffect(() => {
      if (isAuthInit) return;

      if (token) {
        writeAccessToken(token);
        api.setToken(token);
      } else {
        removeAccessToken();
        api.setToken();
      }
    }, [isAuthInit, token]);

    useEffect(() => {
      viewerModel.$viewer.on(authModel.effects.signOutFx.done, () => null);
    }, []);

    useEffect(
      () =>
        api.setUnauthorizedHandler(async (e) => {
          if (
            location.pathname === routes.signIn ||
            location.pathname === routes.signUp
          ) {
            throw e;
          }

          try {
            const result = await api.auth.refresh();

            writeAccessToken(result.accessToken);
            api.setToken(result.accessToken);

            if (e.config) {
              e.config.headers.set(
                'Authorization',
                `Bearer ${result.accessToken}`
              );

              return await axios.request(e.config);
            }
          } catch (e) {
            await authModel.effects.signOutFx();

            removeAccessToken();
            navigate(routes.signIn);

            throw e;
          }

          throw e;
        }),
      [location.pathname, navigate]
    );

    return <Component />;
  };

  return WrappedComponent;
};

const key = 'ACCESS_TOKEN';

function readAccessToken() {
  return localStorage.getItem(key);
}

function writeAccessToken(value: string) {
  localStorage.setItem(key, value);
}

function removeAccessToken() {
  localStorage.removeItem(key);
}
