import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';

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
  iconClass?: string | undefined;
  changePasswordType?: any;
}

const iconStyle = {
  color: 'rgba(0,0,0,0.5)',
};

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
  defaultValue,
  iconClass,
  changePasswordType,
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

      <InputGroup>
        <Input
          type={type}
          placeholder={placeholder}
          variant="outline"
          {...register(name, { required, ...validate })}
          defaultValue={defaultValue}
          disabled={disableLabel}
        />

        <InputRightElement
          children={<Icons iconClass={iconClass} style={iconStyle} />}
          onClick={changePasswordType}
        />
      </InputGroup>
      <Text fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </Text>
    </FormControl>
  );
};
