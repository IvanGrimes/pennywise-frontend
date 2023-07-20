import { useInputState as useBaseInputState } from '@mantine/hooks';

export const useInputState = <T>(initialState: T) => {
  const [value, onChange] = useBaseInputState(initialState);

  return { value, onChange };
};
