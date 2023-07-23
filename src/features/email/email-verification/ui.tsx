import {
  EmailVerification as BaseEmailVerification,
  emailVerificationModel,
  EmailVerificationStatus,
} from 'entities/email-verification';
import { useEffect } from 'react';
import { isApiError } from 'shared/api';

export type EmailVerificationProps = {
  token: string;
};

export const EmailVerification = ({ token }: EmailVerificationProps) => {
  const [verify, { error, isLoading, isUninitialized }] =
    emailVerificationModel.api.useVerifyMutation();
  const getStatus = () => {
    if (isLoading) return EmailVerificationStatus.loading;
    if (error) return EmailVerificationStatus.fail;

    return EmailVerificationStatus.success;
  };
  const errorMessage = isApiError(error) ? error.data.message : 'Unknown error';

  useEffect(() => {
    if (!isUninitialized) return;

    verify({ verifyRequestDto: { token } });
  }, [verify, token, isUninitialized]);

  return (
    <BaseEmailVerification status={getStatus()} errorMessage={errorMessage} />
  );
};
