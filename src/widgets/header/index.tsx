import { Header as BaseHeader, HeaderMenuListItem } from 'shared/ui';
import { UserDropdown } from 'features/user-dropdown';
import { useLocation } from 'react-router';
import { useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';

const menuList: HeaderMenuListItem[] = [
  { href: '#', label: 'Accounts' },
  { href: '#', label: 'Transactions' },
  { href: '#', label: 'Analytics' },
];

export const Header = () => {
  const location = useLocation();
  const isAuth = useStore(viewerModel.$isAuthed);

  return (
    <BaseHeader
      viewerSlot={isAuth ? <UserDropdown /> : null}
      menuList={menuList}
      isMenuItemActive={(item) => item.href === location.pathname}
    />
  );
};
