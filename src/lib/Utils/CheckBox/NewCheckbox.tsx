import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

interface ICheckbox {
  checked: any;
  onChange: any;
  label?: string;
  mb?: string;
  disabled?: boolean;
}

function NewCheckbox({ checked, onChange, label, mb, disabled }: ICheckbox) {
  return (
    <Flex fontSize=".9rem" fontWeight="500" mb={mb}>
      <label style={{ display: 'flex', cursor: 'pointer' }}>
        <input
          type="checkbox"
          className="formcheck"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          value={checked}
        />
        <Text ml=".5rem" fontSize="1rem">
          {label}
        </Text>
      </label>
    </Flex>
  );
}

export default NewCheckbox;
