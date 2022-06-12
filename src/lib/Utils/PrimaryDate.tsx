import { FormControl, FormLabel, GridItem, Icon, Text } from '@chakra-ui/react';
import {
  Controller,
  UseFormRegister,
  Path,
  FieldError,
  Control,
} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  minDate?: any;
  placeholder?: string;
  fontSize?: string;
  icon?: any;
}

export const PrimaryDate = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  label = '',
  register,
  validate = {},
  error,
  defaultValue,
  control,
  radios,
  icon,
  placeholder,
  fontSize,
  minDate,
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
          fontSize={fontSize}
        >
          {label}
        </FormLabel>
        <Controller
          render={({ field }) => (
            //@ts-ignore
            <DatePicker
              placeholderText="Select date"
              dateFormat="d MMM yyyy"
              minDate={minDate}
              maxDate={new Date(2023, 10, 1)}
              onChange={(date) => field.onChange(date)}
              selected={field.value}
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
