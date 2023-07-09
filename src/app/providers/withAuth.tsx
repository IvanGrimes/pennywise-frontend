import { sample } from 'effector';
import { FunctionComponent, useEffect } from 'react';
import { useMount } from 'shared/hooks';
import { routes } from 'shared/routes';
import { api } from 'shared/api';
import axios from 'axios';
import { useEvent } from 'effector-react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { authModel } from 'entities/auth';
import { viewerModel } from 'entities/viewer';
import { sessionModel } from 'entities/session';

export const withAuth = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tokenRefresh = useEvent(authModel.effects.tokenRefreshFx);
    const signOut = useEvent(authModel.effects.signOutFx);

    useMount(() => {
      [
        viewerModel.$me,
        viewerModel.$meError,
        sessionModel.$sessions,
        sessionModel.$sessionsError,
      ].forEach((store) => store.reset(authModel.effects.signOutFx.doneData));
    });

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
            const token = await tokenRefresh();

            if (e.config) {
              e.config.headers.set('Authorization', `Bearer ${token}`);

              return await axios.request(e.config);
            }
          } catch (e) {
            queueMicrotask(async () => {
              await signOut();

              navigate(routes.signIn);
            });

            throw e;
          }

          throw e;
        }),
      [location.pathname, navigate, signOut, tokenRefresh]
    );

    return <Component />;
  };

  return WrappedComponent;
};
