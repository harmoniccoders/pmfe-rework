import {
  Flex,
  Box,
  Image,
  Badge,
  VStack,
  Text,
  Icon,
  Grid,
  GridItem,
  Divider,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import React from 'react';
import { MdVerified } from 'react-icons/md';
import { FaBed, FaToilet } from 'react-icons/fa';
import { BsTags } from 'react-icons/bs';
import { IoIosRibbon } from 'react-icons/io';
import Icons from './Icons';

type Props = {
  location: string;
  description: string;
  bedroom: string;
  bathroom: string;
  price: string;
};

const PropertyCard = ({
  location,
  description,
  bedroom,
  bathroom,
  price,
}: Props) => {
  return (
    <Box
      boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)"
      w="full"
      // w="100%"
      minH="350px"
      borderRadius="8px"
      mx="auto"
      pb="10px"
    >
      <Flex direction="column" pos="relative" w="100%">
        <Box
          w="100%"
          h="140px"
          bg="brand.50"
          borderRadius="5px 5px 0 0"
          overflow="hidden"
        >
          <Image
            src="/assets/property-img.png"
            alt="propery-image"
            w="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>

        <Badge
          pos="absolute"
          right="0px"
          bg="brand.100"
          color="white"
          w="40%"
          top="8%"
          h="24px"
          fontSize="14px"
          borderRadius="4px 0 0 4px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight={400}
        >
          {location}
        </Badge>

        <VStack pt="5px" w="100%" mt="10px">
          <Flex w="90%" mx="auto" alignItems="flex-start">
            <Text fontWeight={600} fontSize="17px">
              {description}
            </Text>

            <Icon as={MdVerified} w="20px" h="20px" color="brand.100" />
          </Flex>

          <Grid
            w="90%"
            templateColumns="repeat(2, 1fr)"
            margin="10px auto 5px"
            columnGap={3}
            padding="10px 0"
          >
            <GridItem mb="5px" display="flex" alignItems="center">
              <Icons iconClass="fa-bed" />
              <Text fontSize="13px" ml="4px">
                {bedroom}
              </Text>
            </GridItem>
            <GridItem mb="5px" display="flex" alignItems="center">
              <Icons iconClass="fa-toilet" />
              <Text fontSize="13px" ml="4px">
                {bathroom}
              </Text>
            </GridItem>
            <GridItem mb="5px" display="flex" alignItems="center">
              <Icons iconClass="fa-tags" />
              <Text fontSize="13px" ml="4px">
                &#8358;{price}
              </Text>
            </GridItem>
            <GridItem mb="5px" display="flex" alignItems="center">
              <Icons iconClass="fa-award" />
              <Text fontSize="13px" ml="4px">
                Governor's consent
              </Text>
            </GridItem>
          </Grid>

          <Divider orientation="horizontal" borderColor="brand.50" />

          <Box mb="20px" w="90%" mx="auto" pt="5px">
            <ButtonGroup w="100%">
              <Button variant="outline" height="40px" color="rgb(37,36,39)">
                See more
              </Button>
              <Button variant="solid" height="40px">
                Enquire
              </Button>
            </ButtonGroup>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default PropertyCard;
