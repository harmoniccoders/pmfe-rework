import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  content: string;
  isValid: boolean;
  loading: boolean;
}

const ButtonComponent = ({ content, isValid, loading }: Props) => {
  return (
    <Box w="100%" h="50px" mt="25px" mb="25px">
      <Button
        type="submit"
        w="100%"
        h="100%"
        variant="solid"
        textTransform="capitalize"
        disabled={isValid ? false : true}
        isLoading={loading}
      >
        {content}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
