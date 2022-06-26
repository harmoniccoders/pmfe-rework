import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Button,
  Text,
  Image,
  Box,
  Heading,
  Grid,
  GridItem,
  VStack,
  AspectRatio,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React, { useState } from 'react';
import ShareListingsModal from './ShareListingsModal';
import { useRouter } from 'next/router';
import { PropertyView } from 'types/api';
import ReportListingModal from './ReportListingModal';
import parse from 'html-react-parser';
import Cookies from 'js-cookie';
import MapView from 'lib/Utils/MapView';
import { SRLWrapper } from 'simple-react-lightbox';
import naira from '../Generics/Naira';

interface Props {
  isOpen?: any;
  onClose?: any;
  openReliefModal?: any;
  AddEnquireView: any;
  item: PropertyView;
}
const iconStyle = {
  color: '#0042ff',
};

const SeemoreModal = ({
  isOpen,
  onClose,
  item,
  AddEnquireView,
  openReliefModal,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const openModal = () => {
    setShowModal(true);
    onClose();
  };
  const reportModal = () => {
    setShowReport(true);
    onClose();
  };

  const users = Cookies.get('user') as unknown as string;
  let user;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  const router = useRouter();
  const [showContactDetails, setShowContactDetails] = useState<boolean>(false);
  const relief = router.asPath == '/rent/rent-relief';

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
        size="lg"
        trapFocus={false}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

        <ModalContent
          py={5}
          borderRadius="0"
          overflow="hidden"
          maxH="100vh"
          h="100%"
          pos="fixed"
          mt="0rem"
          mb="0rem"
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
            <Box maxH="77vh" overflowY="auto" px={5}>
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
                    {item.area}
                  </Flex>
                </Box>
              </Flex>
              <Heading fontSize="16px" my="30px">
                {item.name}
              </Heading>

              <Grid
                w="100%"
                templateColumns="repeat(2, 1fr)"
                margin="10px auto 15px"
                columnGap={3}
                padding="10px 0"
              >
                <GridItem mb="5px" display="flex" alignItems="center">
                  <Icons iconClass="fa-bed" style={iconStyle} />
                  <Text fontSize="13px" ml="4px">
                    {`${item.numberOfBedrooms} ${
                      item.numberOfBedrooms
                        ? item.numberOfBedrooms > 1
                          ? 'Bedrooms'
                          : 'Bedroom'
                        : null
                    }`}
                  </Text>
                </GridItem>
                <GridItem mb="5px" display="flex" alignItems="center">
                  <Icons iconClass="fa-toilet" style={iconStyle} />
                  <Text fontSize="13px" ml="4px">
                    {`${item.numberOfBathrooms} ${
                      item.numberOfBathrooms
                        ? item.numberOfBathrooms > 1
                          ? 'Bathrooms'
                          : 'Bathroom'
                        : null
                    }`}
                  </Text>
                </GridItem>
                <GridItem mb="5px" display="flex" alignItems="center">
                  <Icons iconClass="fa-tags" style={iconStyle} />
                  <Text fontSize="13px" ml="4px">
                    {naira(item.price as unknown as number)}
                  </Text>
                </GridItem>
                <GridItem mb="5px" display="flex" alignItems="center">
                  <Icons iconClass="fa-award" style={iconStyle} />
                  <Text fontSize="13px" ml="4px">
                    {item.title}
                  </Text>
                </GridItem>
              </Grid>

              {item.sellMyself ? (
                <Button
                  variant="solid"
                  textTransform="capitalize"
                  height="40px"
                  width="100%"
                  disabled={item.createdByUser?.id == user?.id}
                  onClick={() => setShowContactDetails(!showContactDetails)}
                >
                  {item.createdByUser?.id == user?.id
                    ? 'Cannot contact self on owned property'
                    : (item.isForSale && 'Contact seller') ||
                      (item.isForRent && 'Contact landlord')}
                </Button>
              ) : (
                <Button
                  variant="solid"
                  textTransform="capitalize"
                  height="40px"
                  width="100%"
                  disabled={item.createdByUser?.id == user?.id}
                  onClick={
                    relief ? () => openReliefModal() : () => AddEnquireView()
                  }
                >
                  {item.createdByUser?.id == user?.id
                    ? 'You cannot enquire on owned property'
                    : relief
                    ? 'Get relief'
                    : 'Enqiure'}
                </Button>
              )}

              {showContactDetails && (
                <VStack align="flex-start" mt="15px">
                  <Text fontWeight={600}> {item.createdByUser?.fullName} </Text>
                  <Text
                    as="a"
                    fontSize=".8rem"
                    color="brand.100"
                    href={`tel:${item.createdByUser?.phoneNumber}`}
                  >
                    {item.createdByUser?.phoneNumber}
                  </Text>
                  <Text
                    fontSize=".8rem"
                    color="brand.100"
                    as="a"
                    href={`mailto:${item.createdByUser?.email}`}
                  >
                    {item.createdByUser?.email}
                  </Text>
                </VStack>
              )}

              <VStack align="flex-start" spacing={5} mt="3rem">
                <Box w="100%">
                  <Heading fontSize="14px">Overview</Heading>

                  {parse(item.description as string)}
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

                <Flex w="100%" flexDirection="column">
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

                  <Box my="30px" bg="blue.50" borderRadius="5px" p="1rem">
                    <Heading fontSize="13px" lineHeight={1.5}>
                      Disclaimer
                    </Heading>

                    <Text fontSize="13px" lineHeight={1.5} textAlign="justify">
                      {` Information displayed about this property constitutes a mere
                  advertisement. PropertyMataaz makes no warranty as to the
                  accuracy of the advertisement or any linked or associated
                  information. Information about this property is provided and
                  maintained by ${item.createdByUser?.fullName}. PropertyMataaz shall not in any way
                  be held liable for the actions of any agent and/or property
                  owner/landlord with respect to this property on or off this
                  web application, website or App.`}
                    </Text>
                  </Box>
                </Flex>

                <Button
                  variant="outline"
                  width="100%"
                  height="40px"
                  fontWeight={600}
                  textTransform="capitalize"
                  onClick={reportModal}
                >
                  Report this listing
                </Button>

                <Button
                  variant="outline"
                  width="100%"
                  height="40px"
                  fontWeight={600}
                  textTransform="capitalize"
                  onClick={openModal}
                >
                  share this listing
                </Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ShareListingsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        id={item.id as number}
      />
      <ReportListingModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        item={item}
      />
    </>
  );
};

export default SeemoreModal;
