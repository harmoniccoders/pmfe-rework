import { FormControl, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import { FieldError, UseFormRegister, Path, Controller } from 'react-hook-form';

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<TFormValues>;
  error: FieldError | undefined;
  type?: string;
  required?: boolean;
  disableLabel?: boolean;
  validate?: any;
  icon?: any;
  variant?: string;
  borderColor?: string;
  borderRadius?: string;
  placeholderColor?: string;
  defaultValue: string | number | undefined;
  format?: string;
  value?: string | number | undefined;
  testId?: string;
  w?: string;
  padding?: string;
  onChange?: any;
  result?: any;
}

export const PrimarySelect = <TFormValues extends Record<string, any>>({
  name,
  result,
  required = false,
  type = 'text',
  label = '',
  register,
  validate = {},
  error,
  disableLabel = false,
  placeholder = '',
  defaultValue,
}: FormInputProps<TFormValues>) => {
  return (
    <FormControl>
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        pos="relative"
        top={5}
        left={4}
        width="fit-content"
        zIndex={3}
        bg="brand.200"
      >
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select placeholder={placeholder} {...field}>
            {result.map((options: any) => {
              return <option value={options.name}>{options.name}</option>;
            })}
          </Select>
        )}
      />

      {/* <Input
        type={type}
        placeholder={placeholder}
        variant="outline"
        {...register(name, { required, ...validate })}
        defaultValue={defaultValue}
        disabled={disableLabel}
      /> */}

      <Text fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </Text>
    </FormControl>
  );
};
