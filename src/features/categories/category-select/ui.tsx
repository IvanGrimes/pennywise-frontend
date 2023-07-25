import {
  categoriesModel,
  CategorySelect as BaseCategorySelect,
} from 'entities/categories';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { changeCategoryId, selectCategoryId } from './model';

export type CategorySelectProps = {
  disabled?: boolean;
  onChange?: (value: number | null) => void;
  initialCategoryId: number | undefined;
  onCreate?: (name: string) => void;
};

export const CategorySelect = ({
  disabled,
  onChange,
  initialCategoryId,
  onCreate,
}: CategorySelectProps) => {
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const categoryId = useAppSelector(selectCategoryId);
  const dispatch = useAppDispatch();
  const handleChangeCategoryId = useCallback(
    (id: number | null) => dispatch(changeCategoryId(id)),
    [dispatch]
  );
  const handleChange = (value: string | null) => {
    const nextCategoryId = value ? Number(value) : null;

    onChange?.(nextCategoryId);
    handleChangeCategoryId(nextCategoryId);
  };

  useEffect(() => {
    if (categoryId || !initialCategoryId) return;

    handleChangeCategoryId(initialCategoryId);
  }, [categoryId, handleChangeCategoryId, initialCategoryId]);

  useEffect(
    () => () => {
      handleChangeCategoryId(null);
    },
    [handleChangeCategoryId]
  );

  if (
    !categories.currentData ||
    (!categories.currentData && categories.isFetching)
  )
    // @todo: add loader
    return null;

  return (
    <BaseCategorySelect
      label="Category"
      data={categories.currentData}
      value={String(categoryId ?? initialCategoryId)}
      onChange={handleChange}
      onCreate={onCreate}
      creatable={!!onCreate}
      disabled={categories.isLoading || disabled}
    />
  );
};
