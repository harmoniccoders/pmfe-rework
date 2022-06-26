import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

function NoPage() {
  return (
    <Flex align="center" justifyContent="center" pb="2rem">
      <Box w="full">
        <Box w="50%" mx="auto">
          <Image src="/assets/preview.png" w="full" h="auto" />
        </Box>
        <Text
          fontSize="2rem"
          fontWeight="bold"
          textAlign="center"
          w="60%"
          mx="auto"
          mt="1rem"
        >
          Sorry, this page is missing!
        </Text>
        <Text w="30%" mx="auto" textAlign="center">
          You seem to have lost your way,🤣🤣🤣 Re-trace your step back to where
          you're coming from
        </Text>
        <Box mx="auto" w="fit-content" mt="1.5rem">
          <Button mx="auto" as="a" href="/">
            Go back home
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default NoPage;
