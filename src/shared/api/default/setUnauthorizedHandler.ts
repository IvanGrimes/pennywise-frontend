import axios, { AxiosError } from 'axios';

let retry = true;

export const setUnauthorizedHandler = (handler: (e: AxiosError) => unknown) => {
  const id = axios.interceptors.response.use(
    (res) => {
      if (res.status === 200) {
        retry = true;
      }

      return res;
    },
    (e) => {
      if (retry && e instanceof AxiosError) {
        if (e.response?.status === 401) {
          if (e.response.config?.url?.includes('auth/refresh')) {
            // @todo: redirect to sign-in

            return Promise.reject(e);
          }

          try {
            return handler(e);
          } catch (error) {
            retry = false;

            return Promise.reject(error);
          }
        }
      }

      return Promise.reject(e);
    }
  );

  return () => axios.interceptors.response.eject(id);
};
