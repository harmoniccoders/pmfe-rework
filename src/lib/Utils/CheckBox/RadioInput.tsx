import { Box, Radio } from '@chakra-ui/react';
import React from 'react';

function RadioInput({
  value,
  label,
}: {
  value: string | number | undefined;
  label: string;
}) {
  return (
    <Box display="flex" color={'black'} alignItems="center">
      <Radio value={value} className="radio" fontSize=".8rem">
        {label}
      </Radio>
    </Box>
  );
}

export default RadioInput;
