import {
  SessionCard,
  SessionCardSkeleton,
  SessionModal,
  sessionModel,
} from 'entities/session';
import { useDisclosure } from 'shared/hooks';
import { UserDropdownItem } from 'entities/viewer';
import { IconDeviceDesktop } from 'shared/icons';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { showErrorNotification } from 'shared/notifications';
import { usePrevious } from '@mantine/hooks';
import { FetchError } from 'shared/ui';

const showError = () =>
  showErrorNotification({
    title: 'Sessions',
    message: 'Something went wrong',
  });

export const SessionManager = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const previousOpened = usePrevious(opened);
  const sessions = useStore(sessionModel.$sessions);
  const sessionsError = useStore(sessionModel.$sessionsError);
  const fetchSessions = useEvent(sessionModel.effects.getAllFx);
  const sessionsLoading = useStore(sessionModel.effects.getAllFx.pending);
  const terminate = useEvent(sessionModel.effects.terminateFx);
  const terminateAll = useEvent(sessionModel.effects.terminateAllFx);
  const handleTerminate = async (id: number) => {
    try {
      await terminate({ id });

      await fetchSessions();
    } catch (e) {
      showError();
    }
  };
  const handleTerminateAll = async () => {
    try {
      await terminateAll();

      await fetchSessions();
    } catch (e) {
      showError();
    }
  };
  const getContent = () => {
    if (sessionsError) {
      return (
        <FetchError onRetry={fetchSessions}>
          Couldn&apos;t retrieve sessions
        </FetchError>
      );
    }

    if (sessionsLoading && !sessions.length)
      return (
        <div>
          <SessionCardSkeleton />
          <SessionCardSkeleton />
          <SessionCardSkeleton />
        </div>
      );

    return sessions.map((session) => (
      <SessionCard
        key={session.id}
        {...session}
        onTerminate={() => handleTerminate(session.id)}
        onTerminateAll={handleTerminateAll}
        showTerminateButton={sessions.length > 1}
      />
    ));
  };

  useEffect(() => {
    if (!opened || previousOpened || sessionsLoading || sessionsError) return;

    void fetchSessions();
  }, [fetchSessions, sessionsLoading, opened, sessionsError, previousOpened]);

  return (
    <>
      <UserDropdownItem Icon={IconDeviceDesktop} onClick={open} loading={false}>
        Sessions
      </UserDropdownItem>
      <SessionModal opened={opened} onClose={close}>
        {getContent()}
      </SessionModal>
    </>
  );
};
