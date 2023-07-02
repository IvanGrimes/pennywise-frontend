import { useEffect } from 'react';
import { withProviders } from './providers';
import { api } from 'shared/api';
import { readAccessToken, removeAccessToken, writeAccessToken } from './utils/accessToken';
import axios from 'axios';
import { useStore, useEvent } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { Layout } from 'shared/ui';
import { Header } from 'widgets/header';
import { Routing } from 'pages';

const Component = () => {
  const token = useStore(viewerModel.$token);
  const setToken = useEvent(viewerModel.events.setToken);
  const signIn = useEvent(viewerModel.effects.signInFx);

  useEffect(() => {
    void signIn({ email: 'ivangrimesdev@gmail.com', password: 'Obndwp8cfpd!' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) return;

    const accessToken = readAccessToken();

    if (!accessToken) {
      // @todo: redirect to sign-in page
      return;
    }

    setToken(accessToken);
  }, [token, setToken]);

  useEffect(() => {
    if (token) {
      writeAccessToken(token);
      api.setToken(token);
    } else {
      removeAccessToken();
      api.setToken();
    }
  }, [token]);

  useEffect(() => {
    api.setUnauthorizedHandler(async (e) => {
      const result = await api.auth.refresh();

      writeAccessToken(result.accessToken);
      api.setToken(result.accessToken);

      if (e.config) {
        e.config.headers.set('Authorization', `Bearer ${result.accessToken}`);

        return axios.request(e.config);
      }

      throw e;
    });
  }, []);

  return (
    <Layout headerSlot={<Header />}>
      <Routing />
    </Layout>
  );
};

export const App = withProviders(Component);
