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
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { SRLWrapper } from 'simple-react-lightbox';
import { PropertyView } from 'types/api';
import parse from 'html-react-parser';
import MapView from 'lib/Utils/MapView';
import naira from '../Generics/Naira';

const iconStyle = {
  color: '#0042ff',
};

type Props = {
  isOpen?: any;
  onClose?: any;
  openModal: () => void;
  item: PropertyView;
};

const ViewListedProperty = ({ isOpen, onClose, item, openModal }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="lg"
      isCentered
      
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="scroll"
        maxH="100vh"
        pos="fixed"
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              onClick={onClose}
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px' }}
              ></span>
              Back
            </Text>

            <Box w="150px" h="40px">
              <Image
                src="/assets/PropertyMataaz.png"
                alt="company-logo"
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box px={5}>
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
                    item.isDraft ||
                    item.status === 'REJECTED' ||
                    item.status === 'SOLD' ||
                    item.status === 'INACTIVE'
                      ? 'white'
                      : 'black'
                  }
                  bgColor={
                    item.isDraft ||
                    item.status === 'SOLD' ||
                    item.status === 'INACTIVE'
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
                      ? 'Property has been rented out'
                      : item.status === 'SOLD'
                      ? 'Property has been sold'
                      : item.status === 'PENDING'
                      ? 'Listing is pending'
                      : item.status === 'REJECTED'
                      ? `Rejected: ${item.rejectionReason}`
                      : 'Listing is live'}
                  </Text>
                  <HStack
                    cursor={'pointer'}
                    display={
                      item.status === 'SOLD' || item.status === 'INACTIVE'
                        ? 'none'
                        : 'flex'
                    }
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
                px="2rem"
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
                mb="5px"
                display="flex"
                alignItems="center"
                bgColor="brand.700"
                borderRadius="4px"
                px="2rem"
                h="3rem"
                border="1px solid #96FFC9"
              >
                <Icons iconClass="fa-receipt" style={{ fontSize: '20px' }} />
                <Text fontSize="14px" mx="2rem" fontWeight="bold">
                  {item.enquiries}
                </Text>
                <Text fontSize="14px" fontWeight="500">
                  Enquires
                </Text>
              </GridItem>
            </Grid>

            <Flex
              px={['2rem', '4rem']}
              h="3rem"
              bg="brand.700"
              align="center"
              justify="space-between"
              borderRadius="4px"
              border="1px solid #96FFC9"
              mb="2rem"
            >
              <Flex align="center" cursor="pointer">
                <Icons iconClass="fa-scroll" style={{ fontSize: '20px' }} />
                <Text fontSize="14px" mx="3rem" fontWeight="bold">
                  Payment
                </Text>
              </Flex>
              <Text fontSize="14px" fontWeight="500">
                {item.status !== 'SOLD' ? ' Pending sale' : 'Sold'}
              </Text>
            </Flex>

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
            <VStack align="flex-start" spacing={5} mt="3rem">
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
                                  <AspectRatio
                                    maxH={['70px', '150px']}
                                    w="full"
                                    ratio={1}
                                  >
                                    <iframe
                                      title="Interactive videp"
                                      src={media.url as string}
                                      allowFullScreen
                                    />
                                  </AspectRatio>
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
                <Box w="100%" height={['300px', '400px']} bg="brand.50">
                  {/* map */}
                  <MapView
                    lat={item.latitude as number}
                    lng={item.longitude as number}
                  />
                </Box>
              </Box>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewListedProperty;
