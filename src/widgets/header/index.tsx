import { ToggleThemeSwitch } from 'features/theme/toggle-theme';
import { lazy, useMemo } from 'react';
import { useAppSelector } from 'shared/model';
import { routes } from 'shared/routes';
import { Group, Header as BaseHeader, HeaderMenuListItem } from 'shared/ui';
import { UserDropdown } from 'entities/viewer';
import { useLocation } from 'react-router-dom';
import { authModel } from 'entities/auth';
import { UserCard } from 'features/user-dropdown/user-card';
import { EmailStatus } from 'features/email/email-status';
import { SignOut } from './ui';

const menuList: HeaderMenuListItem[] = [
  { href: routes.accounts, label: 'Accounts' },
  { href: routes.transactions, label: 'Transactions' },
  { href: routes.analytics, label: 'Analytics' },
];

const CategoryList = lazy(() =>
  import('./ui').then((m) => ({ default: m.CategoryList }))
);

const SessionManager = lazy(() =>
  import('./ui').then((m) => ({ default: m.SessionManager }))
);

export const Header = () => {
  const location = useLocation();
  const isAuth = useAppSelector(authModel.isAuth);
  const userDropdown = useMemo(
    () => (
      <UserDropdown
        cardSlot={({ active }) => <UserCard active={active} />}
        topSlot={<EmailStatus />}
      >
        <CategoryList />
        <SessionManager />
        <SignOut />
      </UserDropdown>
    ),
    []
  );

  return (
    <BaseHeader
      showMenu={isAuth}
      rightSlot={
        <Group>
          <ToggleThemeSwitch />
          {isAuth ? userDropdown : null}
        </Group>
      }
      menuList={menuList}
      isMenuItemActive={(item) => item.href === location.pathname}
    />
  );
};
