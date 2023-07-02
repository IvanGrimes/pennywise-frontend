import { Api } from 'generated/api';
import { API_URL } from 'shared/config';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const api = new Api({
  BASE: API_URL,
  CREDENTIALS: 'include',
  WITH_CREDENTIALS: true,
});
