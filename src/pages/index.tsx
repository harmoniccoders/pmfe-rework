import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  VStack,
} from '@chakra-ui/react';
import Hero from 'lib/components/Hero';
import Services from 'lib/components/Services';

const index = () => (
  <Box>
    <Hero />
    <Services />
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align="center"
      justify="center"
      bg="green.50"
      minH="400px"
      spacing="10"
    >
      <VStack>
        <Heading alignSelf={['center', 'start']}>Get the app!</Heading>
        <Text>
          Download our Android or iOS app and take <br /> PropertyMataaz with
          you wherever you go.
        </Text>
      </VStack>
      <Stack
        direction={['column', 'row']}
        spacing="5"
        align={['center', 'unset']}
      >
        <Link href="/">
          <Image
            cursor="pointer"
            src="/assets/iOS+App+Store+badge-min.png"
            alt="apple"
          />
        </Link>
        <Link href="/">
          <Image
            cursor="pointer"
            src="/assets/Google+Play+badge-min.png"
            alt="google"
          />
        </Link>
      </Stack>
    </Stack>
  </Box>
);

export default index;
