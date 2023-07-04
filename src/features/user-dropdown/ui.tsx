import { useEvent, useStore } from 'effector-react';
import { viewerModel, UserDropdown as BaseUserDropdown } from 'entities/viewer';
import { useEffect } from 'react';
import { authModel } from 'entities/auth';

export const UserDropdown = () => {
  const isAuth = useStore(authModel.$isAuthed);
  const viewer = useStore(viewerModel.$viewer);
  const fetchViewer = useEvent(viewerModel.effects.fetchViewerFx);
  const signOut = useEvent(authModel.effects.signOutFx);

  console.log(viewer, isAuth);

  useEffect(() => {
    if (!isAuth) return;
    if (viewer) return;

    void fetchViewer();
  }, [fetchViewer, isAuth, viewer]);

  if (!isAuth) return null;

  if (!viewer) return <>loading</>;

  return <BaseUserDropdown {...viewer} onSignOut={signOut} />;
};
