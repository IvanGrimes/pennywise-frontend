import { UserDropdownItem } from 'entities/viewer';
import { IconLogout } from 'shared/icons';
import { useEvent, useStore } from 'effector-react';
import { authModel } from 'entities/auth';

export const SignOut = () => {
  const signOut = useEvent(authModel.effects.signOutFx);
  const loading = useStore(authModel.effects.signOutFx.pending);

  return (
    <UserDropdownItem
      Icon={IconLogout}
      onClick={() => void signOut}
      loading={loading}
    >
      Sign out
    </UserDropdownItem>
  );
};
