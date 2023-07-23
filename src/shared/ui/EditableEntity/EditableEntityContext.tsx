import { createContext, PropsWithChildren, useContext } from 'react';
import { ValuesConstraint } from './types';

export type EditableEntityContextType<T extends ValuesConstraint = {}> = {
  initialValues: T;
  values: T;
  onSave: (values: T) => Promise<void>;
  onCancel: () => void;
  onChange: <P extends keyof T>(params: { property: P; value: T[P] }) => void;
  disabled: boolean;
  editing: boolean;
  setEditing: (value: boolean) => void;
};

const Context = createContext(null as unknown as EditableEntityContextType);

export const EditableEntityProvider = <T extends ValuesConstraint>({
  children,
  value,
}: PropsWithChildren<{ value: EditableEntityContextType<T> }>) => (
  <Context.Provider value={value as unknown as EditableEntityContextType}>
    {children}
  </Context.Provider>
);

export const useEditableEntityContext = <T extends ValuesConstraint>() => {
  const context = useContext(Context);

  if (!context)
    throw new Error(
      'EditableEntity compound components must be wrapped withing EditableEntity'
    );

  return context as unknown as EditableEntityContextType<T>;
};
