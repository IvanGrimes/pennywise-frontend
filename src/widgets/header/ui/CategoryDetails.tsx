import { ReactNode } from 'react';
import {
  categoriesModel,
  CategoryColorPicker,
  CategorySwatch,
} from 'entities/categories';
import { getEditableEntity, Modal, Text, TextInput } from 'shared/ui';

export type CategoryDetailsProps = {
  category: categoriesModel.GetCategoriesResponseDto;
  opened: boolean;
  onClose: () => void;
  bottomSlot?: ReactNode;
};

type EditableValues = { name: string; color: categoriesModel.CategoryColor };

const { EditableEntity } = getEditableEntity<EditableValues>();

export const CategoryDetails = ({
  opened,
  onClose,
  category,
  bottomSlot,
}: CategoryDetailsProps) => (
  <Modal title="Category details" opened={opened} onClose={onClose}>
    <EditableEntity
      values={category}
      disabled={false}
      onSave={() => Promise.resolve()}
    >
      <EditableEntity.Property
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
        property="color"
        editableSlot={(props) => <CategoryColorPicker {...props} />}
      >
        {({ values }) => <CategorySwatch color={values.color} />}
      </EditableEntity.Property>
    </EditableEntity>
    {bottomSlot}
  </Modal>
);
