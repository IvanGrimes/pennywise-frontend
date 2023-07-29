import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { CheckIcon, IconEdit, IconX } from 'shared/icons';
import { ActionIcon } from '../ActionIcon';
import { Box } from '../Box';
import { createStyles } from '../createStyles';
import { useEditableEntityContext } from './EditableEntityContext';
import { Group } from '../Group';
import { ValuesConstraint } from './types';

export type EditableEntityPropertyProps<
  T extends ValuesConstraint,
  P extends keyof T
> = {
  className?: string;
  property: P;
  editableSlot: (props: {
    save: (partialValues?: Partial<T>) => void;
    value: T[P];
    onChange: (value: T[P]) => void;
    disabled: boolean;
  }) => ReactNode;
  children: (props: { values: T }) => ReactNode;
  showControl?: boolean;
};

const useStyles = createStyles((theme) => ({
  contentContainer: {
    '&:hover > .editIcon': { opacity: 1 },
  },
  editIcon: {
    opacity: 0,
    transition: `opacity 150ms ${theme.transitionTimingFunction}`,
  },
}));

export const getEditableEntityProperty = <T extends ValuesConstraint>() => {
  const EditableEntityProperty = <P extends keyof T>({
    children,
    editableSlot,
    property,
    className,
    showControl = true,
  }: EditableEntityPropertyProps<T, P>) => {
    const { classes, cx } = useStyles();
    const [edit, setEdit] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);
    const editableContainerRef = useRef<HTMLDivElement | null>(null);
    const {
      onSave,
      onCancel,
      disabled,
      initialValues,
      values,
      onChange,
      editing,
      setEditing,
    } = useEditableEntityContext<T>();
    const handleEdit = () => {
      if (editing) return;

      setEditing(true);
      setEdit(true);
    };
    const handleSave = async (partialValues: Partial<T> = {}) => {
      try {
        await onSave({ ...values, ...partialValues });

        setEdit(false);
        setEditing(false);
      } catch (e) {
        console.log(e);
        // @todo: handle error
      }
    };
    const handleCancel = useCallback(() => {
      setEdit(false);
      setEditing(false);
      onCancel();
    }, [onCancel, setEditing]);
    const hasValueChanged = values[property] !== initialValues[property];
    const content = (
      <Group
        sx={{ display: edit ? 'none' : 'flex' }}
        className={classes.contentContainer}
        spacing="xs"
      >
        {children({ values })}
        {!disabled && !editing && (
          <ActionIcon
            className={cx(classes.editIcon, 'editIcon')}
            color="gray"
            size="sm"
            onClick={handleEdit}
          >
            <IconEdit size="1.5rem" stroke={1.5} />
          </ActionIcon>
        )}
      </Group>
    );
    const editableContent = (
      <Group
        ref={editableContainerRef}
        sx={edit ? {} : { position: 'absolute', opacity: 0, marginTop: -10000 }}
        spacing="xs"
      >
        {editableSlot({
          value: values[property],
          onChange: (value) => onChange({ property, value }),
          disabled,
          save: handleSave,
        })}
        {showControl && (
          <Group spacing="xs">
            {hasValueChanged && (
              <ActionIcon
                variant="light"
                color="blue"
                size="sm"
                onClick={() => handleSave()}
                disabled={disabled}
              >
                <CheckIcon size="1.5rem" />
              </ActionIcon>
            )}
            <ActionIcon
              variant="light"
              color="red"
              size="sm"
              onClick={handleCancel}
              disabled={disabled}
            >
              <IconX size="1.25rem" />
            </ActionIcon>
          </Group>
        )}
      </Group>
    );

    useEffect(() => {
      const editableContainer = editableContainerRef.current;

      if (!editableContainer || containerHeight) return;

      setContainerHeight(editableContainer.clientHeight);
    }, [containerHeight]);

    return (
      <Box
        className={className}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: containerHeight,
        }}
      >
        {content}
        {editableContent}
      </Box>
    );
  };

  return { EditableEntityProperty };
};
