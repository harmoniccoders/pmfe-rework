import { Box, Radio } from '@chakra-ui/react';
import React from 'react';

function RadioInput({
  value,
  label,
  checked,
}: {
  value: string | number | undefined;
  label: string;
  checked?: boolean;
}) {
  return (
    <Box display="flex" color={'black'} alignItems="center">
      <Radio value={value} className="radio" fontSize=".8rem" defaultChecked>
        {label}
      </Radio>
    </Box>
  );
}

export default RadioInput;
