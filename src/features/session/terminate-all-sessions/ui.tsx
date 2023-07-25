import { sessionModel, TerminateButton } from 'entities/session';
import { showErrorNotification } from 'shared/notifications';

export const TerminateAllSessionsButton = () => {
  const [terminateAll, { isLoading }] =
    sessionModel.api.useTerminateAllMutation();
  const handleTerminate = async () => {
    try {
      await terminateAll().unwrap();
    } catch (e) {
      showErrorNotification({
        title: 'Sessions',
        message: 'Something went wrong',
      });
    }
  };

  return (
    <TerminateButton onClick={handleTerminate} disabled={isLoading}>
      Terminate all sessions
    </TerminateButton>
  );
};
