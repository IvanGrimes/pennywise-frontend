import { FunctionComponent, useEffect } from 'react';
import { useMount } from 'shared/hooks';
import { routes } from 'shared/routes';
import { api } from 'shared/api';
import axios from 'axios';
import { useStore, useEvent } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useLocation } from 'react-router';

export const withAuth = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const token = useStore(viewerModel.$token);
    const isAuthInit = useStore(viewerModel.$isAuthInit);
    const setToken = useEvent(viewerModel.events.setToken);
    const location = useLocation();

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

    useEffect(
      () =>
        api.setUnauthorizedHandler(async (e) => {
          if (
            location.pathname === routes.signIn ||
            location.pathname === routes.signUp
          ) {
            throw e;
          }

          const result = await api.auth.refresh();

          writeAccessToken(result.accessToken);
          api.setToken(result.accessToken);

          if (e.config) {
            e.config.headers.set(
              'Authorization',
              `Bearer ${result.accessToken}`
            );

            return axios.request(e.config);
          }

          throw e;
        }),
      [location.pathname]
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
