import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Text,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  required?: boolean;
  validate?: any;
  error: FieldError | undefined;
  label?: string;
  fontSize?: string;
  options: any;
  defaultValue?: any;
  disabled?: boolean;
  borderColor?: string;
}
export const PrimarySelect = <TFormValues extends Record<string, any>>({
  name,
  placeholder,
  register,
  required = false,
  validate = {},
  error,
  label = '',
  fontSize = '1rem',
  options,
  defaultValue,
  disabled,
  borderColor = 'grey',
}: FormInputProps<TFormValues>) => {
  return (
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
      <Select
        {...register(name, { required, ...validate })}
        w="full"
        border="1px solid"
        borderRadius="0"
        borderColor={borderColor}
        height="3rem"
        fontSize=".9rem"
        textTransform="capitalize"
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        // isReadOnly
        icon={<Icons iconClass="fa-angle-right" />}
      >
        {/* <option disabled>{placeholder}</option> */}
        {options}
      </Select>
      <FormErrorMessage fontSize=".7rem" textTransform="capitalize">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
