import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Icon,
  Text,
} from '@chakra-ui/react';
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
  defaultValue?: any;
  error: FieldError | undefined;
  control: Control<TFormValues>;
  radios?: any;
  minDate?: any;
  maxDate?: any;
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
  placeholder = 'Select a date',
  fontSize,
  minDate,
  maxDate,
}: FormInputProps<TFormValues>) => {
  return (
    <GridItem>
      <FormControl
        isInvalid={error?.type === 'required' || error?.message !== undefined}
      >
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
              placeholderText={placeholder}
              dateFormat="d MMM yyyy"
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => field.onChange(date)}
              selected={field.value || defaultValue}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              // peekNextMonth
            />
          )}
          name={name}
          control={control}
        />
      </FormControl>
      <FormErrorMessage fontSize=".7rem" textTransform="capitalize">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </GridItem>
  );
};
