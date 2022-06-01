import axios from 'axios';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Header from 'lib/components/Header';
import Hero from 'lib/components/home/Hero';
import Service from 'lib/components/home/Service';

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
    <SimpleGrid columns={[1, 2]} px={[5, 20]} py={[5, 14]} gap="8">
      {services.map((service) => (
        <Service key={service.title} {...service} />
      ))}
    </SimpleGrid>
  </Box>
);

export default index;
