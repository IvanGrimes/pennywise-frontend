import { Header as BaseHeader, HeaderMenuListItem } from 'shared/ui';
import { UserDropdown, viewerModel } from 'entities/viewer';
import { useLocation } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';
import { authModel } from 'entities/auth';
import { UserCard } from 'features/user-card';
import { EmailStatus } from 'features/email-status';
import { SessionManager } from 'features/session-manager';
import { SignOut } from 'features/sign-out';
import { useEffect, useMemo } from 'react';

const menuList: HeaderMenuListItem[] = [
  { href: '#', label: 'Accounts' },
  { href: '#', label: 'Transactions' },
  { href: '#', label: 'Analytics' },
];

export const Header = () => {
  const location = useLocation();
  const isAuth = useStore(authModel.$isAuthed);
  const viewer = useStore(viewerModel.$viewer);
  const fetchViewer = useEvent(viewerModel.effects.fetchViewerFx);
  const viewerLoading = useStore(viewerModel.effects.fetchViewerFx.pending);
  const userDropdown = useMemo(
    () => (
      <UserDropdown
        userCardSlot={({ active }) => <UserCard active={active} />}
        emailSlot={<EmailStatus />}
        sessionsItemSlot={<SessionManager />}
        signOutItemSlot={<SignOut />}
        loading={false}
      />
    ),
    []
  );

  useEffect(() => {
    if (!isAuth || viewer || viewerLoading) return;

    void fetchViewer();
  }, [fetchViewer, isAuth, viewer, viewerLoading]);

  return (
    <BaseHeader
      showMenu={isAuth}
      viewerSlot={isAuth ? userDropdown : null}
      menuList={menuList}
      isMenuItemActive={(item) => item.href === location.pathname}
    />
  );
};
