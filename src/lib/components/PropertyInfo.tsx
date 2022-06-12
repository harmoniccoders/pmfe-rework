import {
  Heading,
  Box,
  Flex,
  Image,
  VStack,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { PropertyModel } from 'types/api';
import Icons from './Icons';

type Props = {
  data: PropertyModel;
};

const iconStyle = {
  color: '#0042ff',
};

const PropertyInfo = ({ data }: Props) => {
  return (
    <>
      <VStack pl="2rem" w="100%" spacing={5} alignItems="flex-start">
        <Box w="100%" pos="relative">
          <Box w="100%" h="250px">
            <Image
              src="/assets/property-img.png"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>

          <Flex
            bg="brand.100"
            color="white"
            pos="absolute"
            w="fit-content"
            px="1.5rem"
            h="24px"
            top="15%"
            fontSize="14px"
            align="center"
            justify="center"
            borderRadius="4px 0 0 4px"
            right="0"
            textTransform="capitalize"
          >
            {data.lga}
          </Flex>
        </Box>

        <Heading fontSize="16px" my="30px">
          {data.name}
        </Heading>

        <Grid w="100%" templateColumns="repeat(4, 1fr)">
          <GridItem mb="5px" display="flex" alignItems="center">
            <Icons iconClass="fa-bed" style={iconStyle} />
            <Text fontSize="13px" ml="4px">
              {`${data.numberOfBedrooms} ${
                data.numberOfBedrooms
                  ? data.numberOfBedrooms > 1
                    ? 'Bedrooms'
                    : 'Bedroom'
                  : null
              }`}
            </Text>
          </GridItem>
          <GridItem mb="5px" display="flex" alignItems="center">
            <Icons iconClass="fa-toilet" style={iconStyle} />
            <Text fontSize="13px" ml="4px">
              {`${data.numberOfBathrooms} ${
                data.numberOfBathrooms
                  ? data.numberOfBathrooms > 1
                    ? 'Bathrooms'
                    : 'Bathroom'
                  : null
              }`}
            </Text>
          </GridItem>
          <GridItem mb="5px" display="flex" alignItems="center">
            <Icons iconClass="fa-tags" style={iconStyle} />
            <Text fontSize="13px" ml="4px">
              &#8358;
              {data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </GridItem>
          <GridItem mb="5px" display="flex" alignItems="center">
            <Icons iconClass="fa-award" style={iconStyle} />
            <Text fontSize="13px" ml="4px">
              {data.title}
            </Text>
          </GridItem>
        </Grid>

        <Heading fontSize="14px">Overview</Heading>

        <Text fontSize="14px" lineHeight={1.5}>
          Beautiful And Unique 3 Bedroom, 2.5 Bath Home Has Been Totally
          Transformed With Blends Of Creativity, Taste And Comfort. Bright &amp;
          Open Concept Main Living Area. Lovely Main Floor Master With Ensuite
          And Walk-In Closet. Step Down Patio To Backyard With Gardens. Natural
          Gas Heat And Central Air. A Bonus 20'X25' Insulated Shop With Concrete
          Floor, Hydro And Additional Lean-To For Extra Storage. Be Sure To
          Watch Property Tour On Video.
        </Text>

        <Heading fontSize="14px">Pictures</Heading>

        <Grid templateColumns="repeat(4,1fr)" w="100%" gap={3}>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
          <GridItem bg="brand.50" width="full" height="152px"></GridItem>
        </Grid>

        <Heading fontSize="14px">Video Tour</Heading>

        <Grid templateColumns="repeat(2,1fr)" w="100%" gap={3}>
          <GridItem bg="brand.50" width="full" height="250px"></GridItem>
          <GridItem bg="brand.50" width="full" height="250px"></GridItem>
        </Grid>

        <Heading fontSize="14px">Maps/Street view</Heading>

        <Box w="100%" height="300px" bg="brand.50">
          {/* map */}
        </Box>
      </VStack>
    </>
  );
};

export default PropertyInfo;
