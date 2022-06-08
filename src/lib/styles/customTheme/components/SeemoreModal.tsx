import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  Button,
  Text,
  Image,
  Box,
  Badge,
  Heading,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { PropertyView } from 'types/api';

interface Props {
  isOpen?: any;
  onClose?: any;
  item: PropertyView;
}

const iconStyle = {
  color: '#0042ff',
};

const SeemoreModal = ({ isOpen, onClose, item }: Props) => {
  const router = useRouter();

  const [showContactDetails, setShowContactDetails] = useState<boolean>(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflow="hidden"
        maxH="100vh"
        maxW="50%"
        pos="fixed"
        mt="1rem"
        mb="1rem"
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
              <Box w=" 100%" h="250px" bg="brand.50">
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
                top="20px"
                right={0}
                bg="brand.100"
                textTransform="capitalize"
                fontWeight={400}
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="20px"
                color="white"
                w="120px"
                borderRadius="4px 0 0 4px"
              >
                {item.area}
              </Badge>
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
                  &#8358;
                  {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
                onClick={() => setShowContactDetails(!showContactDetails)}
              >
                Contact seller
              </Button>
            ) : (
              <Button
                variant="solid"
                textTransform="capitalize"
                height="40px"
                width="100%"
                onClick={() => router.push('/enquiries')}
              >
                Enquire
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

            <Box w="100%" my="20px">
              <Heading fontSize="14px">Overview</Heading>

              {item.description?.replaceAll(/(<([^>]+)>)/gi, '')}
            </Box>

            <Flex w="100%" flexDirection="column">
              <Heading fontSize="14px">Maps/Street view</Heading>

              <Box w="100%" height="250px" bg="brand.50">
                {/* map */}
              </Box>

              <Box my="30px" bg="blue.50" borderRadius="5px" padding="10px">
                <Heading fontSize="12px" lineHeight={1.5}>
                  Disclaimer
                </Heading>

                <Text fontSize="10px" lineHeight={1.5}>
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
              color="brand.50"
              fontWeight={600}
              textTransform="capitalize"
              mb="25px"
            >
              Report this listing
            </Button>

            <Button
              variant="outline"
              width="100%"
              height="40px"
              color="brand.50"
              fontWeight={600}
              textTransform="capitalize"
              mb="25px"
            >
              share this listing
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SeemoreModal;
