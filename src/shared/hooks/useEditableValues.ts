import { usePrevious } from '@mantine/hooks';
import { useState } from 'react';

export const useEditableValues = <
  T extends Record<string, unknown>,
  P extends keyof T = keyof T
>(
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);
  const previousValues = usePrevious(values);
  const handleChange = (property: P) => (value: T[P]) =>
    setValues((state) => ({ ...state, [property]: value }));
  const handleCancel = () => {
    if (!previousValues) return;

    setValues(previousValues);
  };

  return { values, handleChange, handleCancel, setValues };
};
