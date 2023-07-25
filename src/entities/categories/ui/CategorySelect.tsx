import { Select } from 'shared/ui';
import { GetCategoriesResponseDto } from '../model';
import {
  CategorySelectItem,
  CategorySelectItemOption,
} from './CategorySelectItem';

export type CategorySelectProps = {
  data: GetCategoriesResponseDto[];
  value: string | null;
  label?: string;
  onChange: (value: string | null) => void;
  onCreate?: (option: string) => void;
  disabled?: boolean;
  creatable?: boolean;
};

export const CategorySelect = ({
  label,
  data,
  onCreate,
  value,
  onChange,
  disabled,
  creatable = true,
}: CategorySelectProps) => {
  const options = data.map<CategorySelectItemOption>((item) => ({
    value: String(item.id),
    label: item.name,
    color: item.color,
  }));

  return (
    <Select
      label={label}
      data={options}
      placeholder="Select category"
      getCreateLabel={(query) => `+ Create ${query}`}
      value={value}
      onChange={onChange}
      onCreate={
        onCreate
          ? (query) => {
              onCreate?.(query);

              return null;
            }
          : undefined
      }
      disabled={disabled}
      creatable={creatable}
      itemComponent={CategorySelectItem}
      withinPortal
      searchable
    />
  );
};
