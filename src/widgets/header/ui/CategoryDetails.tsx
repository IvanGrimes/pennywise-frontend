import { ReactNode } from 'react';
import {
  categoriesModel,
  CategoryColorPicker,
  CategorySwatch,
} from 'entities/categories';
import {
  showErrorNotification,
  showSuccessNotification,
} from 'shared/notifications';
import {
  createStyles,
  getEditableEntity,
  Modal,
  Text,
  TextInput,
} from 'shared/ui';

export type CategoryDetailsProps = {
  category: categoriesModel.GetCategoriesResponseDto;
  opened: boolean;
  onClose: () => void;
  bottomSlot?: ReactNode;
};

type EditableValues = { name: string; color: categoriesModel.CategoryColor };

const { EditableEntity } = getEditableEntity<EditableValues>();

const useStyles = createStyles({
  property: {
    '&&': {
      justifyContent: 'flex-start',
    },
  },
  colorProperty: {
    '&&': {
      display: 'block',
    },
  },
});

export const CategoryDetails = ({
  opened,
  onClose,
  category,
  bottomSlot,
}: CategoryDetailsProps) => {
  const { classes } = useStyles();
  const [updateCategoryMutation, updateCategory] =
    categoriesModel.api.useUpdateCategoryMutation();
  const handleSave = async (values: EditableValues) => {
    const title = 'Categories';

    try {
      await updateCategoryMutation({
        id: category.id,
        updateCategoryRequestDto: values,
      }).unwrap();

      showSuccessNotification({
        title,
        message: 'Category has been updated',
      });
    } catch (e) {
      // @todo: handle error

      showErrorNotification({
        title,
        message: 'Something went wrong',
      });
    }
  };

  return (
    <Modal title="Category details" opened={opened} onClose={onClose}>
      <EditableEntity
        values={category}
        disabled={updateCategory.isLoading}
        onSave={handleSave}
      >
        <EditableEntity.Property
          className={classes.property}
          property="name"
          editableSlot={({ value, onChange, disabled }) => (
            <TextInput
              value={value}
              disabled={disabled}
              onChange={(ev) => onChange(ev.target.value)}
            />
          )}
        >
          {({ values }) => <Text>{values.name}</Text>}
        </EditableEntity.Property>
        <EditableEntity.Property
          className={classes.colorProperty}
          property="color"
          editableSlot={({ onChange, disabled, save, value }) => (
            <CategoryColorPicker
              value={value}
              onChange={(color) => {
                onChange(color);
                save({ color });
              }}
              disabled={disabled}
            />
          )}
          showControl={false}
        >
          {({ values }) => <CategorySwatch color={values.color} />}
        </EditableEntity.Property>
      </EditableEntity>
      {bottomSlot}
    </Modal>
  );
};
