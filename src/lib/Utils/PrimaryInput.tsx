import {
  FormControl,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  FieldError,
  UseFormRegister,
  RegisterOptions,
  Path,
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
}

export const PrimaryInput = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  type = 'text',
  label = '',
  register,
  validate = {},
  error,
  disableLabel = false,
  placeholder = '',
  variant = 'outline',
  borderColor = 'gray.300',
  borderRadius = 'md',
  placeholderColor = 'gray.300',
  defaultValue,
  format,
  value,
  icon,
  testId,
  w,
  padding,
  onChange,
}: FormInputProps<TFormValues>) => {
  return (
    <FormControl>
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        pos="relative"
        top={5}
        left={4}
        minW="90px"
        zIndex={3}
        bg="brand.200"
      >
        {label}
      </FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        variant="outline"
        {...register(name, { required, ...validate })}
        defaultValue={defaultValue}
        disabled={disableLabel}
      />
      <Text fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </Text>
    </FormControl>
  );
};
