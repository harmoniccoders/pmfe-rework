import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

export const NoData = () => {
  return (
    <Flex justify="center" align="center" h="50vh">
      <Heading fontSize="16px" lineHeight={1.5} textAlign="center">
        Sorry! There's no data to show at this time please check back later
      </Heading>
    </Flex>
  );
};
