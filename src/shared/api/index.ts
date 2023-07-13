export { api } from './api';

import type * as authTypes from 'generated/rtk-query/auth';
import type * as emailVerificationTypes from 'generated/rtk-query/email-verification';
import type * as resetPasswordTypes from 'generated/rtk-query/reset-password';
import type * as sessionTypes from 'generated/rtk-query/session';
import type * as userTypes from 'generated/rtk-query/user';

export { enhancedApi as authApi } from 'generated/rtk-query/auth';
export { enhancedApi as emailVerificationApi } from 'generated/rtk-query/email-verification';
export { enhancedApi as resetPasswordApi } from 'generated/rtk-query/reset-password';
export { enhancedApi as sessionApi } from 'generated/rtk-query/session';
export { enhancedApi as userApi } from 'generated/rtk-query/user';
export * from './isFetchBaseQueryError';
export type {
  authTypes,
  sessionTypes,
  userTypes,
  emailVerificationTypes,
  resetPasswordTypes,
};
