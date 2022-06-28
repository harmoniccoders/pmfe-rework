import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Image,
  Box,
  Heading,
  Grid,
  GridItem,
  HStack,
  VStack,
  AspectRatio,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { SRLWrapper } from 'simple-react-lightbox';
import { PropertyView } from 'types/api';
import parse from 'html-react-parser';
import MapView from 'lib/Utils/MapView';
import naira from '../Generics/Naira';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { DataAccess } from 'lib/Utils/Api';
import Modals from 'lib/Utils/Modals';

const iconStyle = {
  color: '#0042ff',
};

type Props = {
  isOpen?: any;
  onClose?: any;
  openModal: () => void;
  item: PropertyView;
};

const ViewListedRentProperty = ({
  isOpen,
  onClose,
  item,

  openModal,
}: Props) => {
  const router = useRouter();
  const [applications, setApplications] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const bearer = `Bearer ${Cookies.get('token')}`;
      const _dataAccess = new DataAccess(bearer);

      try {
        const result = (
          await _dataAccess.get(`/api/Application/list/${item.id}`)
        ).data;

        setApplications(result.value?.length);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
          <Flex w="100%" pos="relative" flexDirection="column">
            <Box w="full" h="250px" pos="relative">
              <>
                {item.mediaFiles && item.mediaFiles?.length > 0 ? (
                  <>
                    {item.mediaFiles[0].isImage && (
                      <Image
                        src={item.mediaFiles[0].url as string}
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
                fontSize=".8rem"
                fontWeight="600"
                justify="space-between"
                color={
                  item.isDraft || item.status === 'REJECTED' ? 'white' : 'black'
                }
                bgColor={
                  item.isDraft
                    ? 'rgba(108,117,125,.9)'
                    : item.status === 'PENDING'
                    ? 'brand.600'
                    : item.status === 'REJECTED'
                    ? 'brand.800'
                    : '#96FFC9'
                }
                pos="absolute"
                bottom="0"
                h="2rem"
                align="center"
                w="full"
                px="1rem"
              >
                <Text textTransform="capitalize">
                  {item.isDraft
                    ? 'Only visible to you'
                    : item.status === 'INACTIVE'
                    ? (item.isForSale && 'Property Has Been Sold') ||
                      (item.isForRent && 'Property Has Been Rented Out')
                    : item.status === 'PENDING'
                    ? 'Listing is pending'
                    : item.status === 'REJECTED'
                    ? `Rejected: ${item.rejectionReason}`
                    : 'Listing is live'}
                </Text>
                <HStack
                  display={item.status === 'INACTIVE' ? 'none' : 'flex'}
                  cursor="pointer"
                  onClick={() => openModal()}
                >
                  <Text>Edit</Text>
                  <FaPen />
                </HStack>
              </Flex>
              <Flex
                bg="brand.100"
                color="white"
                pos="absolute"
                w="fit-content"
                px="1.5rem"
                h="24px"
                top="18%"
                fontSize="14px"
                align="center"
                justify="center"
                borderRadius="4px 0 0 4px"
                right="0"
                textTransform="capitalize"
              >
                {item.lga}
              </Flex>
              <Flex
                bg="brand.100"
                color="white"
                pos="absolute"
                w="fit-content"
                px="1.5rem"
                h="24px"
                top="18%"
                fontSize="14px"
                align="center"
                justify="center"
                borderRadius="4px 0 0 4px"
                right="0"
                textTransform="capitalize"
              >
                {item.lga}
              </Flex>
            </Box>
          </Flex>

          <Heading fontSize="18px" my="30px" textTransform="capitalize">
            {item.name}
          </Heading>

          <Grid
            w="100%"
            templateColumns={[
              'repeat(1,1fr)',
              'repeat(1,1fr)',
              'repeat(2, 1fr)',
            ]}
            margin={['0', '10px auto 5px']}
            columnGap={[16, 8]}
            padding={['0', '10px 0']}
          >
            <GridItem
              mb={['16px', '5px']}
              display="flex"
              alignItems="center"
              bgColor="brand.700"
              borderRadius="4px"
              px="1rem"
              h="3rem"
              border="1px solid #96FFC9"
            >
              <Icons iconClass="fa-eye" style={{ fontSize: '20px' }} />
              <Text fontSize="14px" mx="2rem" fontWeight="bold">
                {item.views}
              </Text>
              <Text fontSize="14px" fontWeight="500">
                Views
              </Text>
            </GridItem>
            <GridItem
              onClick={
                applications > 0
                  ? () => router.push(`/my-rent/applications/${item.id}`)
                  : undefined
              }
              cursor={applications > 0 ? 'pointer' : 'not-allowed'}
              mb="5px"
              display="flex"
              alignItems="center"
              bgColor="brand.700"
              borderRadius="4px"
              px="1rem"
              h="3rem"
              border="1px solid #96FFC9"
            >
              <Icons iconClass="fa-comments" style={{ fontSize: '20px' }} />
              <Text fontSize="14px" mx="2rem" fontWeight="bold">
                {applications || 0}
              </Text>
              <Text fontSize="14px" fontWeight="500">
                Applications
              </Text>
            </GridItem>
          </Grid>

          <Box>
            <Heading fontSize="14px" mt="6" mb=".5rem">
              Property Details
            </Heading>
            <Grid w="full" templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Flex alignItems="center">
                  <Icons iconClass="fa-bed" style={iconStyle} />
                  <Text
                    fontSize="13px"
                    ml="4px"
                    w="150px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {`${item.numberOfBedrooms} ${
                      item.numberOfBedrooms
                        ? item.numberOfBedrooms > 1
                          ? 'Bedrooms'
                          : 'Bedroom'
                        : null
                    }`}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex alignItems="center">
                  <Icons iconClass="fa-toilet" style={iconStyle} />
                  <Text
                    fontSize="13px"
                    ml="4px"
                    w={{ base: '100px', lg: '50px', xl: '100px' }}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {`${item.numberOfBathrooms} ${
                      item.numberOfBathrooms
                        ? item.numberOfBathrooms > 1
                          ? 'Bathrooms'
                          : 'Bathroom'
                        : null
                    }`}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex alignItems="center">
                  <Icons iconClass="fa-tags" style={iconStyle} />
                  <Text fontSize="13px" ml="4px">
                    {naira(item.price as unknown as number)}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex alignItems="center">
                  <Icons iconClass="fa-award" style={iconStyle} />
                  <Text
                    fontSize="13px"
                    ml="4px"
                    w={{ base: '100px', lg: '50px', xl: '100px' }}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {item.title}
                  </Text>
                </Flex>
              </GridItem>
            </Grid>
            <VStack align="flex-start" spacing={5} mt="2rem">
              <Box w="100%">
                <Heading fontSize="14px">Overview</Heading>
                <Text>{parse(item.description as string)}</Text>
              </Box>

              <Box w="100%">
                <Heading fontSize="14px">Pictures</Heading>
                <>
                  {item.mediaFiles && item.mediaFiles?.length > 0 ? (
                    <Grid templateColumns="repeat(4,1fr)" gap={4}>
                      <>
                        {item.mediaFiles?.map((media) => {
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
              </Box>

              <Box w="100%">
                <Heading fontSize="14px">Video Tour</Heading>
                <>
                  {item.mediaFiles && item.mediaFiles?.length > 0 ? (
                    <Grid templateColumns="repeat(4,1fr)" gap={4}>
                      <>
                        {item.mediaFiles?.map((media) => {
                          return (
                            <>
                              {media.isVideo && (
                                <SRLWrapper>
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
                                </SRLWrapper>
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
              </Box>
              <Box w="100%">
                <Heading fontSize="14px" mb=".5rem">
                  Maps/Street view
                </Heading>
                <Box w="100%" height={['300px', '400px']} bg="brand.50" mb="2">
                  {/* map */}
                  <MapView
                    lat={item.latitude as number}
                    lng={item.longitude as number}
                  />
                </Box>
              </Box>
            </VStack>
          </Box>
        </>
      }
    />
  );
};

export default ViewListedRentProperty;
