import { FC, PropsWithChildren, useState } from 'react';
import { EditableEntityProvider } from './EditableEntityContext';
import { getEditableEntityProperty } from './EditableEntityProperty';
import { ValuesConstraint } from './types';

export type EditableEntityProps<T extends ValuesConstraint> =
  PropsWithChildren<{
    onSave: (value: T) => Promise<void>;
    onCancel?: (initialValue: T) => void;
    disabled: boolean;
    values: T;
  }>;

type CompoundComponents<T extends ValuesConstraint> = {
  Property: ReturnType<
    typeof getEditableEntityProperty<T>
  >['EditableEntityProperty'];
};

export const getEditableEntity = <T extends ValuesConstraint>() => {
  const { EditableEntityProperty } = getEditableEntityProperty<T>();
  const EditableEntity: FC<EditableEntityProps<T>> & CompoundComponents<T> = ({
    children,
    onSave,
    onCancel,
    disabled,
    values: initialValues,
  }: EditableEntityProps<T>) => {
    const [values, setValues] = useState(initialValues);
    const [editing, setEditing] = useState(false);
    const handleCancel = () => {
      onCancel?.(initialValues);
      setEditing(false);
      setValues(initialValues);
    };

    return (
      <EditableEntityProvider
        value={{
          onChange: ({ property, value }) =>
            setValues((state) => ({ ...state, [property]: value })),
          onCancel: handleCancel,
          onSave,
          values,
          disabled,
          editing,
          setEditing,
          initialValues,
        }}
      >
        {children}
      </EditableEntityProvider>
    );
  };

  EditableEntity.Property = EditableEntityProperty;

  return { EditableEntity };
};
