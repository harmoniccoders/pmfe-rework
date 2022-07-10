import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import WYSIWYGEditor from 'lib/components/Editor';
import { stripHtml } from 'string-strip-html';

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
    <FormControl mt="5" isInvalid={error?.type === 'required'}>
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        pos="relative"
        top={5}
        left={4}
        width="fit-content"
        zIndex={3}
        bg="brand.200"
        // fontSize={fontSize}
      >
        {label}
      </FormLabel>
      <Controller
        render={({ field }) => <WYSIWYGEditor {...field} />}
        name={name}
        control={control}
        rules={{
          validate: {
            required: (v) =>
              (v && stripHtml(v).result.length > 0) || `${label} is required`,
            maxLength: (v) =>
              (v && stripHtml(v).result.length <= 2000) ||
              'Maximum character limit is 2000',
          },
        }}
      />
      <FormErrorMessage fontSize=".7rem">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
