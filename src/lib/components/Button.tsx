import { Box, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
  content: string;
  isValid?: boolean;
  loading?: boolean;
}

const ButtonComponent = ({ content, isValid, loading }: Props) => {
  return (
    <Button
      type="submit"
      w="100%"
      h="50px"
      my="25px"
      variant="solid"
      textTransform="capitalize"
      disabled={isValid ? false : true}
      isLoading={loading}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
