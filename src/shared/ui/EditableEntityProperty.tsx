import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box } from './Box';
import { Group } from './Group';
import { ActionIcon } from './ActionIcon';
import { IconEdit, CheckIcon, IconX } from 'shared/icons';
import { createStyles } from './createStyles';
import { useClickOutside } from 'shared/hooks';

export type EditableEntityPropertyProps = PropsWithChildren<{
  editableSlot: ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}>;

const useStyles = createStyles((theme) => ({
  contentContainer: {
    '&:hover > .editIcon': { opacity: 1 },
  },
  editIcon: {
    opacity: 0,
    transition: `opacity 150ms ${theme.transitionTimingFunction}`,
  },
}));

export const EditableEntityProperty = ({
  children,
  editableSlot,
  onSave,
  onCancel,
  disabled,
}: EditableEntityPropertyProps) => {
  const { classes, cx } = useStyles();
  const [edit, setEdit] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const clickOutsideRef = useClickOutside(() => setEdit(false));
  const editableContainerRef = useRef<HTMLDivElement | null>(null);
  const handleSave = () => {
    setEdit(false);
    onSave?.();
  };
  const handleCancel = () => {
    setEdit(false);
    onCancel?.();
  };
  const content = (
    <Group
      sx={{ display: edit ? 'none' : 'flex' }}
      className={classes.contentContainer}
      spacing="xs"
    >
      {children}
      {!disabled && (
        <ActionIcon
          className={cx(classes.editIcon, 'editIcon')}
          color="gray"
          size="sm"
          onClick={() => setEdit(true)}
        >
          <IconEdit size="1.5rem" stroke={1.5} />
        </ActionIcon>
      )}
    </Group>
  );
  const editableContent = (
    <Group
      sx={edit ? {} : { position: 'absolute', opacity: 0, marginTop: -10000 }}
      ref={editableContainerRef}
      spacing="xs"
    >
      {editableSlot}
      <Group spacing="xs">
        <ActionIcon variant="light" color="blue" size="sm" onClick={handleSave}>
          <CheckIcon size="1.5rem" />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="red"
          size="sm"
          onClick={handleCancel}
        >
          <IconX size="1.25rem" />
        </ActionIcon>
      </Group>
    </Group>
  );

  useEffect(() => {
    const editableContainer = editableContainerRef.current;

    if (!editableContainer || containerHeight) return;

    setContainerHeight(editableContainer.clientHeight);
  }, [containerHeight]);

  return (
    <Box sx={{ height: containerHeight }} ref={clickOutsideRef}>
      {content}
      {editableContent}
    </Box>
  );
};
