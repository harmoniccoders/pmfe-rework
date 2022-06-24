import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

export function ContactInput({
  label,
  type,
  placeholder,
  defaultValue,
  name,
}: any) {
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
          defaultValue={defaultValue}
          name={name}
        />
      </InputGroup>
    </FormControl>
  );
}
export function ContactTextArea({
  label,
  type,
  placeholder,
  defaultValue,
  name,
}: any) {
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
        <Textarea
          name={name}
          placeholder={placeholder}
          variant="outline"
          h="100px"
          resize="none"
        />
      </InputGroup>
    </FormControl>
  );
}
