import { api } from './api';
import { VerifyRequestDto } from './models';

export const verify = (params: VerifyRequestDto) =>
  api.emailVerification.verify(params);

export const resendVerificationLink = () => api.emailVerification.resend();
