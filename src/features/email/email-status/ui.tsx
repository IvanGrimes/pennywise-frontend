import {
  EmailStatus as BaseEmailStatus,
  emailVerificationModel,
  ResendButton,
} from 'entities/email-verification';
import { viewerModel } from 'entities/viewer';
import { isApiError } from 'shared/api';
import { showErrorNotification } from 'shared/notifications';

export const EmailStatus = () => {
  const me = viewerModel.api.useMeQuery();
  const [resendMutation, resend] =
    emailVerificationModel.api.useResendMutation();
  const handleResend = async () => {
    try {
      await resendMutation().unwrap();
    } catch (e) {
      const message = isApiError(e) ? e.data.message : 'Unknown error';

      showErrorNotification({
        title: 'Resend verification link',
        message,
      });
    }
  };

  if (!me.data) return null;

  return (
    <>
      <BaseEmailStatus
        email={me.data.email}
        isVerified={me.data.isEmailVerified}
        resendButtonSlot={
          <ResendButton onClick={handleResend} loading={resend.isLoading} />
        }
      />
    </>
  );
};
