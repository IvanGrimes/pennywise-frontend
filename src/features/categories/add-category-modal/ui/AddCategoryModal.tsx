import { categoriesModel, CategoryColorPicker } from 'entities/categories';
import { useEffect } from 'react';
import { useForm } from 'shared/form';
import { useAppDispatch, useAppSelector } from 'shared/model';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'shared/notifications';
import { AddEntityFormLayout, Button, Modal, TextInput } from 'shared/ui';
import {
  selectAddCategoryFormName,
  selectAddCategoryFormOpened,
  close,
  changeName,
} from '../model';

export type AddCategoryModalProps = {
  onClose?: () => void;
};

export const AddCategoryModal = ({ onClose }: AddCategoryModalProps) => {
  const opened = useAppSelector(selectAddCategoryFormOpened);
  const name = useAppSelector(selectAddCategoryFormName);
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      name: '',
      color: categoriesModel.categoryColor.blue,
    },
  });
  const [createCategoryMutation, createCategory] =
    categoriesModel.api.useCreateCategoryMutation();
  const handleClose = () => {
    dispatch(close());
    form.reset();
    onClose?.();
  };
  const handleSubmit = form.onSubmit(async (values) => {
    const title = 'Categories';

    try {
      await createCategoryMutation({
        createCategoryRequestDto: values,
      }).unwrap();

      dispatch(changeName(null));
      form.reset();
      handleClose();

      showSuccessNotification({
        title,
        message: 'Category has been successfully created',
      });
    } catch (e) {
      showErrorNotification({
        title,
        message: 'Something went wrong',
      });
    }
  });

  useEffect(() => {
    if (form.values.name || !name) return;

    form.setValues({ name });
  }, [form, name]);

  return (
    <Modal title="Add category" opened={opened} onClose={handleClose}>
      <AddEntityFormLayout
        onSubmit={handleSubmit}
        inputsSlot={
          <>
            <TextInput
              label="Name"
              disabled={createCategory.isLoading}
              {...form.getInputProps('name')}
            />
            <CategoryColorPicker
              disabled={createCategory.isLoading}
              {...form.getInputProps('color')}
            />
          </>
        }
        submitButtonSlot={
          <Button type="submit" loading={createCategory.isLoading}>
            Add category
          </Button>
        }
      />
    </Modal>
  );
};
