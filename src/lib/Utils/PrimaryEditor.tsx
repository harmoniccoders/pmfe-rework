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
  FormErrorMessage,
} from '@chakra-ui/react';
import WYSIWYGEditor from 'lib/components/Editor';
import { useState } from 'react';

import {
  FieldError,
  UseFormRegister,
  Path,
  Controller,
  Control,
} from 'react-hook-form';

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
  control: Control<TFormValues>;
}

export const PrimaryEditor = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  label = '',
  register,
  validate = {},
  error,
  disableLabel = false,
  placeholder = '',
  defaultValue,
  control,
}: FormInputProps<TFormValues>) => {
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
      <Controller
        render={({ field }) => <WYSIWYGEditor props={field} />}
        name={name}
        control={control}
      />
      <FormErrorMessage fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
