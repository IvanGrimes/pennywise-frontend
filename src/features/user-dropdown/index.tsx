import { Dropdown } from './ui';
import { useEvent, useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useEffect } from 'react';

export const UserDropdown = () => {
  const isAuth = useStore(viewerModel.$isAuthed);
  const viewer = useStore(viewerModel.$viewer);
  const fetchViewer = useEvent(viewerModel.effects.fetchViewerFx);

  useEffect(() => {
    if (!isAuth) return;
    if (viewer) return;

    void fetchViewer();
  }, [fetchViewer, isAuth, viewer]);

  if (!isAuth) return null;

  if (!viewer) return <>loading</>;

  return <Dropdown {...viewer} />;
};
