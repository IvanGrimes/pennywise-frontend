import { Select } from '@mantine/core';
import { useState, ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';
import { IconTrash } from 'shared/icons';
import { ActionIcon } from 'shared/ui';

export type CategorySelectProps<T extends CategoryOptionConstraint> =
  ReturnType<typeof useCategorySelect> & {
    options: T[];
    onCreate?: (option: T) => void;
    disabled?: boolean;
    onDelete?: (label: T['id']) => void;
    creatable?: boolean;
  };

export type CategoryOptionConstraint = {
  id: number;
  value: string;
  label: string;
};

export const useCategorySelect = (initialValue: string | null = null) => {
  const [value, setValue] = useState<string | null>(initialValue);

  return { value, onChange: (nextValue: string | null) => setValue(nextValue) };
};

type CategorySelectItemProps = ComponentPropsWithoutRef<'div'> & {
  label: string;
  onClick: () => void;
};

// eslint-disable-next-line react/display-name
const CategorySelectItem = forwardRef<HTMLDivElement, CategorySelectItemProps>(
  ({ label, onClick, ...props }, ref) => (
    <div ref={ref} {...props}>
      <ActionIcon
        sx={{ zIndex: 55, position: 'relative' }}
        onMouseDown={onClick}
      >
        <IconTrash />
      </ActionIcon>
      {label}
    </div>
  )
);

export const CategorySelect = <T extends CategoryOptionConstraint>({
  options,
  onCreate,
  value,
  onChange,
  disabled,
  onDelete,
  creatable = true,
}: CategorySelectProps<T>) => {
  const data = useMemo(
    () =>
      onDelete
        ? options.map((item) => ({
            ...item,
            onClick: () => onDelete(item.id),
          }))
        : options,
    [onDelete, options]
  );

  return (
    <Select
      label="Category"
      data={data}
      placeholder="Select category"
      getCreateLabel={(query) => `+ Create ${query}`}
      value={value}
      itemComponent={onDelete ? CategorySelectItem : undefined}
      onChange={onChange}
      onCreate={
        onCreate
          ? (query) => {
              const option = { label: query, value: query, id: 0 } as T;

              try {
                onCreate(option);

                return option;
              } catch (e) {
                return null;
              }
            }
          : undefined
      }
      disabled={disabled}
      creatable={creatable}
      searchable
    />
  );
};
