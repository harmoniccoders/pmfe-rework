import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

const rent = () => {
  return (
    <Box w="90%" mx="auto">
      <Heading fontSize={['lg', '2xl']} py="2">
        What do you want to do?
      </Heading>
      <SimpleGrid columns={[1, 2]} mt="5" spacing="5">
        <HStack
          cursor="pointer"
          border="1px solid"
          borderColor="gray.300"
          p="6"
          spacing="4"
          rounded="md"
        >
          <Image w="40px" src="/assets/listProperty.png" alt="listProperty" />
          <VStack align="start" spacing="1">
            <Text fontWeight="600" color="brand.100" fontSize="sm">
              Rent out your property
            </Text>
            <Text fontWeight="100" fontSize="xs">
              Get verified tenants and enjoy hassle-free rent collection
            </Text>
          </VStack>
        </HStack>
        <HStack
          cursor="pointer"
          border="1px solid"
          borderColor="gray.300"
          p="6"
          spacing="4"
          rounded="md"
        >
          <Image w="40px" src="/assets/findProperty.png" alt="findProperty" />
          <VStack align="start" spacing="1">
            <Text fontWeight="600" color="brand.100" fontSize="sm">
              Rent a property
            </Text>
            <Text fontWeight="100" fontSize="xs">
              Find the perfect property from a wide range of options
            </Text>
          </VStack>
        </HStack>
      </SimpleGrid>
    </Box>
  );
};

export default rent;
