import { UserDropdownItem } from 'entities/viewer';
import { useState } from 'react';
import { IconLogout } from 'shared/icons';
import { useAppDispatch } from 'shared/model';
import { showErrorNotification } from 'shared/notifications';
import { signOutThunk } from './model';

export const SignOut = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);

    try {
      await dispatch(signOutThunk()).unwrap();
    } catch (e) {
      showErrorNotification({ title: 'Sign out', message: 'Unknown error' });
    }

    setLoading(false);
  };

  return (
    <UserDropdownItem
      Icon={IconLogout}
      onClick={handleSignOut}
      loading={loading}
    >
      Sign out
    </UserDropdownItem>
  );
};
