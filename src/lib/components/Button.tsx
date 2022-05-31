import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  content: string;
  isValid: boolean;
}

const ButtonComponent = ({ content, isValid }: Props) => {
  return (
    <Box w="100%" h="50px" mt="25px" mb="25px">
      <Button
        type="submit"
        w="100%"
        h="100%"
        variant="solid"
        textTransform="capitalize"
        disabled={isValid ? false : true}
      >
        {content}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
