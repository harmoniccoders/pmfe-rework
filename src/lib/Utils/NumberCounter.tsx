import {
  Box,
  Button,
  Flex,
  FormLabel,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';

import {
  Controller,
  UseFormRegister,
  Path,
  FieldError,
  Control,
} from 'react-hook-form';
interface CounterProps<TFormValues extends Record<string, unknown>> {
  label: string;
  fontSize?: string;
  name: Path<TFormValues>;
  required?: boolean;
  register: UseFormRegister<TFormValues>;
  defaultValue?: any;
  error: FieldError | undefined;
  control: Control<TFormValues>;
}
const NumberCounter = <TFormValues extends Record<string, any>>({
  label,
  fontSize,
  required,
  register,
  defaultValue,
  error,
  control,
  name,
}: CounterProps<TFormValues>) => {
  return (
    <FormControl
      isInvalid={error?.type === 'required' || error?.message !== undefined}
      my="1.5rem"
    >
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        textAlign="center"
        bg="brand.200"
        zIndex={3}
        fontSize={fontSize}
      >
        {label}
      </FormLabel>

      <Controller
        render={({ field }) => (
          //@ts-ignore

          <NumberInput
            onChange={(value) => field.onChange(value)}
            value={field.value || 0}
            max={50}
            min={0}
            defaultValue={defaultValue}
          >
            <Flex justify="space-between">
              <NumberDecrementStepper
                border="0"
                justifyContent="flex-start"
                _active={{ bgColor: 'none' }}
              >
                <Button
                  bg="brand.100"
                  width="40px"
                  height="40px"
                  variant="solid"
                  borderRadius="50%"
                  color="white"
                >
                  -
                </Button>
              </NumberDecrementStepper>
              <NumberInputField textAlign="center" w="50%" />
              <NumberIncrementStepper
                border="0"
                justifyContent="flex-end"
                _active={{ bgColor: 'none' }}
              >
                <Button
                  bg="brand.100"
                  width="40px"
                  height="40px"
                  variant="solid"
                  borderRadius="50%"
                  color="white"
                >
                  +
                </Button>
              </NumberIncrementStepper>
            </Flex>
          </NumberInput>
        )}
        name={name}
        control={control}
      />
      <FormErrorMessage
        fontSize=".7rem"
        textTransform="capitalize"
        justifyContent="center"
      >
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default NumberCounter;
