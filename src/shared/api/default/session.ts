import { api } from './api';
import { TerminateRequestDto } from 'generated/api';

export const all = () => api.session.all();

export const terminate = (params: TerminateRequestDto) =>
  api.session.terminate(params);

export const terminateAll = () => api.session.terminateAll();
