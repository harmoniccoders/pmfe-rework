import {
  Flex,
  Box,
  Button,
  Heading,
  Stack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

const Services = () => {
  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      py={[5, 14]}
      w="90%"
      mx="auto"
      gap="8"
    >
      <Stack
        direction={['column', 'row']}
        spacing="5"
        maxW="550px"
        w="full"
        boxShadow="0 2px 10px 0 rgba(0,0,0,0.16)"
        p="5"
        rounded="md"
      >
        <Box alignSelf="center">
          <Image
            src="/assets/Sell Illustration.png"
            alt="sell"
            maxW="400px"
            w="full"
          />
        </Box>
        <VStack spacing="3" align="start">
          <Heading fontSize={['xl', '2xl']}>
            <Text display="inline" color="blue">
              Sell{' '}
            </Text>{' '}
            your property fast
          </Heading>
          <Text fontSize="sm">
            List your property on PropertyMataaz and get the attention of
            thousands of propspective buyers with the best offers in the market.
          </Text>
          <Link href="sell">
            <Button
              variant="outline"
              fontSize="14"
              w="full"
              colorScheme="gray"
              color="gray"
            >
              List your Property
            </Button>
          </Link>
        </VStack>
      </Stack>
      <Stack
        direction={['column', 'row']}
        spacing="5"
        maxW="550px"
        w="full"
        boxShadow="0 2px 10px 0 rgba(0,0,0,0.16)"
        p="5"
        rounded="md"
      >
        <Box alignSelf="center">
          <Image
            src="/assets/Buy_Illustration.png"
            alt="buy"
            maxW="340px"
            w="full"
          />
        </Box>
        <VStack spacing="3" align="start">
          <Heading fontSize={['xl', '2xl']}>
            <Text display="inline" color="blue">
              Buy
            </Text>{' '}
            property with 103% money-back guarantee
          </Heading>
          <Text fontSize="sm">
            Buy property with the assurance of a refund if there is a legal
            issue with the property
          </Text>
          <Link href="/buy">
            <Button
              variant="outline"
              fontSize="14"
              w="full"
              colorScheme="gray"
              color="gray"
            >
              Browse Properties
            </Button>
          </Link>
        </VStack>
      </Stack>
      <Stack
        direction={['column', 'row']}
        spacing="5"
        maxW="550px"
        w="full"
        boxShadow="0 2px 10px 0 rgba(0,0,0,0.16)"
        p="5"
        rounded="md"
      >
        <Box alignSelf="center">
          <Image
            src="/assets/Rent_Illustration.png"
            alt="rent"
            maxW="340px"
            w="full"
          />
        </Box>
        <VStack spacing="3" align="start">
          <Heading fontSize={['xl', '2xl']}>
            All your{' '}
            <Text display="inline" color="blue">
              rent
            </Text>{' '}
            problems solved property fast
          </Heading>
          <Text fontSize="sm">
            Access vetted tenants, guaranteed rental income, affordable rent, 0
            agency fees, quick rent loans.
          </Text>
          <Link href="/rent">
            <Button
              variant="outline"
              fontSize="14"
              w="full"
              colorScheme="gray"
              color="gray"
            >
              Get Started
            </Button>
          </Link>
        </VStack>
      </Stack>
      <Stack
        direction={['column', 'row']}
        spacing="5"
        maxW="550px"
        w="full"
        boxShadow="0 2px 10px 0 rgba(0,0,0,0.16)"
        p="5"
        rounded="md"
      >
        <Box alignSelf="center">
          <Image
            src="/assets/Clean_Illustration.png"
            alt="clean"
            maxW="340px"
            w="full"
          />
        </Box>
        <VStack spacing="3" align="start">
          <Heading fontSize={['xl', '2xl']}>
            Enjoy top-notch{' '}
            <Text display="inline" color="blue">
              cleaning
            </Text>{' '}
            and janitorial services
          </Heading>
          <Text fontSize="sm">Professional cleaning services</Text>
          <Link href="clean">
            <Button
              variant="outline"
              fontSize="14"
              w="full"
              colorScheme="gray"
              color="gray"
            >
              Schedule a Session
            </Button>
          </Link>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default Services;
