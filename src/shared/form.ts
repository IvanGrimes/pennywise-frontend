import { GetInputProps as BaseGetInputProps } from '@mantine/form/lib/types';

export type FormInputProps = ReturnType<BaseGetInputProps<unknown>>;

export { useForm } from '@mantine/form';
