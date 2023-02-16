import { Flex, VStack, Heading, Button, Text } from '@chakra-ui/react';
import React from 'react';

function cancelled() {
  function closeTab() {
    window.open('about:blank', '_self');
    window.close();
  }
  return (
    <Flex
      w="full"
      h="80vh"
      align="center"
      justify="center"
      // bgColor="brand.800"
    >
      <VStack>
        <Heading>Transaction Cancelled</Heading>
        <Text>The transaction was canceled, please try again</Text>
        <Button onClick={closeTab}>Go back</Button>
      </VStack>
    </Flex>
  );
}

export default cancelled;
