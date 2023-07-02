import { Dropdown } from './ui';
import { useEvent, useStore } from 'effector-react';
import { viewerModel } from 'entities/viewer';
import { useEffect } from 'react';

export const UserDropdown = () => {
  const viewer = useStore(viewerModel.$viewer);
  const fetchViewer = useEvent(viewerModel.effects.fetchViewerFx);

  useEffect(() => {
    void fetchViewer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!viewer) return <>loading</>;

  return <Dropdown {...viewer} />;
};
