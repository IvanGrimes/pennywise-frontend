import { useAppSelector } from 'shared/model';
import { routes } from 'shared/routes';
import { Header as BaseHeader, HeaderMenuListItem } from 'shared/ui';
import { UserDropdown } from 'entities/viewer';
import { useLocation } from 'react-router-dom';
import { authModel } from 'entities/auth';
import { UserCard } from 'features/user-card';
import { EmailStatus } from 'features/email-status';
import { SessionManager } from 'features/session-manager';
import { SignOut } from 'features/auth/sign-out';
import { useMemo } from 'react';

const menuList: HeaderMenuListItem[] = [
  { href: routes.accounts, label: 'Accounts' },
  { href: routes.transactions, label: 'Transactions' },
  { href: '#', label: 'Analytics' },
];

export const Header = () => {
  const location = useLocation();
  const isAuth = useAppSelector(authModel.isAuth);
  const userDropdown = useMemo(
    () => (
      <UserDropdown
        userCardSlot={({ active }) => <UserCard active={active} />}
        emailSlot={<EmailStatus />}
        sessionsItemSlot={<SessionManager />}
        signOutItemSlot={<SignOut />}
      />
    ),
    []
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
