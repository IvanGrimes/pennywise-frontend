import { api } from 'shared/api';
import { ApiRequestStatus, createApiRequestModel } from 'shared/model';

const { verifyFx, $verifyLoading, $verifySuccess, $verifyError } =
  createApiRequestModel({
    name: 'verify',
    request: api.emailVerification.verify.bind(api.emailVerification),
    errorMessages: {
      [ApiRequestStatus.BAD_REQUEST]: 'Email verification token is malformed',
      [ApiRequestStatus.NOT_FOUND]: 'User not found',
      [ApiRequestStatus.CONFLICT]: 'Email has been already verified',
      [ApiRequestStatus.GONE]: 'Verification link is expired',
    },
  });

const { resendFx, $resendLoading, $resendSuccess, $resendError } =
  createApiRequestModel({
    name: 'resend',
    request: api.emailVerification.resend.bind(api.emailVerification),
    errorMessages: {
      [ApiRequestStatus.NOT_FOUND]: 'User not found',
      [ApiRequestStatus.CONFLICT]: 'Email has been already verified',
    },
  });

export {
  $verifySuccess,
  $verifyLoading,
  $verifyError,
  $resendLoading,
  $resendSuccess,
  $resendError,
};

export const effects = { verifyFx, resendFx };
