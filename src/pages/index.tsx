import axios from 'axios';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Header from 'lib/components/Header';
import Hero from 'lib/components/home/Hero';
import Service from 'lib/components/home/Service';
import Footer from 'lib/components/Footer';

const services = [
  {
    title: 'Sell your property fast',
    text: 'List your property on PropertyMataaz and get the attention of thousands of propspective buyers with the best offers in the market. ',
    img: '/Sell Illustration.png',
    button: 'List your Property',
  },
  {
    title: 'Buy property with 103% money-back guarantee',
    text: 'Buy property with the assurance of a refund if there is a legal issue with the property',
    img: '/Buy_Illustration.png',
    button: 'Browse Properties',
  },
  {
    title: 'All your rent problems solved property fast',
    text: 'Access vetted tenants,  guaranteed rental income, affordable rent, 0 agency fees, quick rent loans.',
    img: '/Rent_Illustration.png',
    button: 'Get Started',
  },
  {
    title: 'Enjoy top-notch cleaning and janitorial services',
    text: 'Professional cleaning services',
    img: '/Clean_Illustration.png',
    button: 'Schedule a Session',
  },
];
const index = () => (
  <Box>
    <Header />
    <Hero />
    <Flex flexWrap="wrap" justifyContent="center" py={[5, 14]} px="5" gap="8">
      {services.map((service) => (
        <Service key={service.title} {...service} />
      ))}
    </Flex>
    <Stack
      direction={{base: 'column', lg: 'row' }}
      align="center"
      justify="center"
      bg="green.50"
      minH="400px"
      spacing="10"
    >
      <VStack>
        <Heading alignSelf="start">Get the app!</Heading>
        <Text>
          Download our Android or iOS app and take <br /> PropertyMataaz with
          you wherever you go.
        </Text>
      </VStack>
      <Stack direction={['column', 'row']} spacing="5">
        <Image src="/iOS+App+Store+badge-min.png" alt="apple" />
        <Image src="/Google+Play+badge-min.png" alt="google" />
      </Stack>
    </Stack>
    <Footer />
  </Box>
);

export default index;
