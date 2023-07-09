import {
  EmailStatus as BaseEmailStatus,
  emailVerificationModel,
  ResendButton,
} from 'entities/email-verification';
import { useEvent, useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useEffect } from 'react';
import { showErrorNotification } from 'shared/notifications';

export const EmailStatus = () => {
  const me = useStore(viewerModel.$me);
  const resendVerificationLink = useEvent(
    emailVerificationModel.effects.resendFx
  );
  const resendError = useStore(emailVerificationModel.$resendError);
  const isResendVerificationLinkLoading = useStore(
    emailVerificationModel.effects.resendFx.pending
  );

  useEffect(() => {
    if (isResendVerificationLinkLoading || !resendError) return;

    showErrorNotification({
      title: 'Resend verification link',
      message: resendError,
    });
  }, [isResendVerificationLinkLoading, resendError]);

  if (!me) return null;

  return (
    <>
      <BaseEmailStatus
        email={me.email}
        isVerified={me.isEmailVerified}
        resendButtonSlot={
          <ResendButton
            onClick={resendVerificationLink}
            loading={isResendVerificationLinkLoading}
          />
        }
      />
    </>
  );
};
