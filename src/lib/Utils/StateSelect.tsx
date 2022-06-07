import { FormControl, Text, FormLabel, GridItem } from '@chakra-ui/react';
import {
  Controller,
  UseFormRegister,
  Path,
  FieldError,
  Control,
} from 'react-hook-form';
import dynamic from 'next/dynamic';
//@ts-ignore
const Selectrix = dynamic(() => import('react-selectrix'), { ssr: false });

// import {} from '@chakra-ui/core';

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  required?: boolean;
  disableLabel?: boolean;
  validate?: any;
  label?: string;
  register: UseFormRegister<TFormValues>;
  defaultValue?: string | number | undefined;
  error: FieldError | undefined;
  control: Control<TFormValues>;
  radios?: any;
  options: any;
  placeholder?: string;
  data?: any;
}

export const StateSelect = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  label = '',
  register,
  validate = {},
  error,
  defaultValue,
  control,
  radios,
  options,
  data,
  placeholder,
}: FormInputProps<TFormValues>) => {
  return (
    <GridItem>
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
          render={({ field }) => (
            <Selectrix
              //@ts-ignore
              placeholder={placeholder}
              searchable={false}
              height={150}
              options={options}
              customKeys={{
                key: 'name',
                label: 'capital',
              }}
              onChange={(value: { key: string; label: string }) =>
                field.onChange(value.key)
              }
            />
          )}
          name={name}
          control={control}
        />
      </FormControl>
      <Text fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </Text>
    </GridItem>
  );
};
