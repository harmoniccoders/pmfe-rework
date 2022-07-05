import { Checkbox, FormLabel, Select, Text } from '@chakra-ui/react';
import {
  Control,
  Controller,
  FieldError,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  required?: boolean;
  validate?: any;
  error: FieldError | undefined;
  label?: string;
  control: Control<TFormValues>;
}
export const PrimaryCheckbox = <TFormValues extends Record<string, any>>({
  name,
  register,
  required = false,
  validate = {},
  error,
  label = '',
  control,
}: FormInputProps<TFormValues>) => {
  return (
    <>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Checkbox
            {...register(name, { required, ...validate })}
            onChange={onChange}
            textTransform="capitalize"
            isChecked={value}
          >
            {label}
          </Checkbox>
        )}
        name={name}
        control={control}
      />
      <Text fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </Text>
    </>
  );
};
