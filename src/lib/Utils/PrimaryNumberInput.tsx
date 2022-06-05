import {
  useNumberInput,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  NumberInputField,
  NumberInput,
} from '@chakra-ui/react';

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

export const PrimaryNumberInput = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  label = '',
  register,
  validate = {},
  error,
  disableLabel = false,
  placeholder = '',
  defaultValue,
}: FormInputProps<TFormValues>) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      defaultValue: 0,
      min: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <FormControl mt="5">
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        textAlign="center"
        bg="brand.200"
        zIndex={3}
      >
        {label}
      </FormLabel>
      <HStack spacing="5" justify="space-between">
        <Button bg="blue" rounded="full" w="10px" color="white" {...dec}>
          -
        </Button>

        <Input
          variant="outline"
          textAlign="center"
          {...input}
          placeholder={placeholder}
          {...register(name, { required, ...validate })}
          defaultValue={defaultValue}
          disabled={disableLabel}
          maxW="40"
        />
        <Button bg="blue" w="10px" rounded="full" color="white" {...inc}>
          +
        </Button>
      </HStack>
      <Text fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </Text>
    </FormControl>
  );
};
