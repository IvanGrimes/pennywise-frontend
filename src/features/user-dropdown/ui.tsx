import { useEvent, useStore } from 'effector-react';
import { viewerModel, UserDropdown as BaseUserDropdown } from 'entities/viewer';
import { useEffect } from 'react';
import { authModel } from 'entities/auth';
import {
  EmailStatus,
  emailVerificationModel,
  ResendButton,
} from 'entities/email-verification';

export const UserDropdown = () => {
  const isAuth = useStore(authModel.$isAuthed);
  const viewer = useStore(viewerModel.$viewer);
  const fetchViewer = useEvent(viewerModel.effects.fetchViewerFx);
  const signOut = useEvent(authModel.effects.signOutFx);
  const resendVerificationLink = useEvent(
    emailVerificationModel.effects.resendFx
  );
  const isResendVerificationLinkLoading = useStore(
    emailVerificationModel.effects.resendFx.pending
  );

  useEffect(() => {
    if (!isAuth) return;
    if (viewer) return;

    void fetchViewer();
  }, [fetchViewer, isAuth, viewer]);

  if (!isAuth) return null;

  if (!viewer) return <>loading</>;

  return (
    <BaseUserDropdown
      {...viewer}
      loading={isResendVerificationLinkLoading}
      emailSlot={
        <>
          <EmailStatus
            email={viewer.email}
            isVerified={viewer.isEmailVerified}
            resendButtonSlot={
              <ResendButton
                onClick={resendVerificationLink}
                loading={isResendVerificationLinkLoading}
              />
            }
          />
        </>
      }
      onSignOut={signOut}
    />
  );
};
