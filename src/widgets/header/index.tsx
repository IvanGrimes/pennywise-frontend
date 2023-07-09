import { Header as BaseHeader, HeaderMenuListItem } from 'shared/ui';
import { UserDropdown } from 'entities/viewer';
import { useLocation } from 'react-router-dom';
import { useEvent, useStore } from 'effector-react';
import { authModel } from 'entities/auth';
import { UserCard } from 'features/user-card';
import { EmailStatus } from 'features/email-status';
import { SessionManager } from 'features/session-manager';
import { SignOut } from 'features/sign-out';
import { useMemo } from 'react';
import { model } from './model';

const menuList: HeaderMenuListItem[] = [
  { href: '#', label: 'Accounts' },
  { href: '#', label: 'Transactions' },
  { href: '#', label: 'Analytics' },
];

export const Header = () => {
  const location = useLocation();
  const mounted = useEvent(model.events.mounted);
  const isAuth = useStore(authModel.$isAuthed);
  const userDropdown = useMemo(
    () => (
      <UserDropdown
        userCardSlot={({ active }) => <UserCard active={active} />}
        emailSlot={<EmailStatus />}
        sessionsItemSlot={<SessionManager />}
        signOutItemSlot={<SignOut />}
        onMount={mounted}
      />
    ),
    [mounted]
  );

  return (
    <BaseHeader
      showMenu={isAuth}
      viewerSlot={isAuth ? userDropdown : null}
      menuList={menuList}
      isMenuItemActive={(item) => item.href === location.pathname}
    />
  );
};
