import {
  EmailVerification as BaseEmailVerification,
  EmailVerificationStatus,
} from 'entities/email-verification';

export const EmailVerification = () => {
  return <BaseEmailVerification status={EmailVerificationStatus.loading} />;
};
