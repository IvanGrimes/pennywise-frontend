import { SessionCard, SessionModal, sessionModel } from 'entities/session';
import { useDisclosure } from 'shared/hooks';
import { UserDropdownItem } from 'entities/viewer';
import { IconDeviceDesktop } from 'shared/icons';
import { useEvent, useStore } from 'effector-react';
import { useEffect } from 'react';
import { authModel } from 'entities/auth';

export const SessionManager = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isAuth = useStore(authModel.$isAuthed);
  const sessions = useStore(sessionModel.$sessions);
  const fetchSessions = useEvent(sessionModel.effects.getAllFx);
  const loading = useStore(sessionModel.effects.getAllFx.pending);

  useEffect(() => {
    if (!isAuth || !opened || sessions.length || loading) return;

    void fetchSessions();
  }, [fetchSessions, isAuth, loading, opened, sessions.length]);

  return (
    <>
      <UserDropdownItem Icon={IconDeviceDesktop} onClick={open} loading={false}>
        Sessions
      </UserDropdownItem>
      <SessionModal opened={opened} onClose={close}>
        {sessions.map((session) => (
          <SessionCard key={session.id}>{session.browserName}</SessionCard>
        ))}
      </SessionModal>
    </>
  );
};
