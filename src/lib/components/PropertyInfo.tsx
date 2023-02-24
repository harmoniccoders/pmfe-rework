import {
  Heading,
  Box,
  Flex,
  Image,
  VStack,
  Grid,
  GridItem,
  Text,
  AspectRatio,
} from '@chakra-ui/react';
import MapView from 'lib/Utils/MapView';
import React from 'react';
import { PropertyModel } from 'types/api';
import Icons from './Icons';
import parse from 'html-react-parser';
import { SRLWrapper } from 'simple-react-lightbox';

type Props = {
  data: PropertyModel;
};

const iconStyle = {
  color: '#0042ff',
};

const PropertyInfo = ({ data }: Props) => {
  return (
    <>
      <VStack
        pl={['0', '3rem']}
        w={['95%', '90%']}
        spacing={5}
        alignItems="flex-start"
      >
        <Flex w="100%" pos="relative" flexDirection="column">
          <Box w="full" h="250px" pos="relative">
            <>
              {data.mediaFiles && data.mediaFiles?.length > 0 ? (
                <>
                  {data.mediaFiles[0].isImage && (
                    <Image
                      src={data.mediaFiles[0].url as string}
                      alt="propery-image"
                      w="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  )}
                </>
              ) : (
                <Image
                  src="/assets/nb.webp"
                  alt="propery-image"
                  w="100%"
                  height="100%"
                  objectFit="cover"
                />
              )}
            </>

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
        </Flex>
        <Heading fontSize="16px" my="30px">
          {data.name}
        </Heading>

        <Grid w="100%" templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}>
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
          {parse(data?.description as string)}
        </Text>

        <Heading fontSize="14px">Pictures</Heading>

        <>
          {data.mediaFiles && data.mediaFiles?.length > 0 ? (
            <Grid templateColumns="repeat(4,1fr)" gap={4}>
              <>
                {data.mediaFiles?.map((media) => {
                  return (
                    <>
                      {media.isImage && (
                        <SRLWrapper>
                          <Box
                            w="full"
                            h={['70px', '150px']}
                            bgColor="brand.50"
                          >
                            <Image
                              src={media.url as unknown as string}
                              alt="propery-image"
                              w="100%"
                              height="100%"
                              objectFit="cover"
                            />
                          </Box>
                        </SRLWrapper>
                      )}
                    </>
                  );
                })}
              </>
            </Grid>
          ) : (
            'No Images found'
          )}
        </>

        <Heading fontSize="14px">Video Tour</Heading>

        <>
          {data.mediaFiles && data.mediaFiles?.length > 0 ? (
            <Grid templateColumns="repeat(4,1fr)" gap={4}>
              <>
                {data.mediaFiles?.map((media) => {
                  return (
                    <>
                      {media.isVideo && (
                        <video
                          controls
                          style={{
                            objectFit: 'cover',
                            maxWidth: '130px',
                            height: '130px',
                          }}
                        >
                          <source src={media.url as string} />
                        </video>
                      )}
                    </>
                  );
                })}
              </>
            </Grid>
          ) : (
            'No Videos found'
          )}
        </>

        <Heading fontSize="14px">Maps/Street view</Heading>

        <Box w="100%" height={['300px', '400px']} bg="brand.50">
          {/* map */}
          <MapView
            lat={data.latitude as number}
            lng={data.longitude as number}
          />
        </Box>
      </VStack>
    </>
  );
};

export default PropertyInfo;
