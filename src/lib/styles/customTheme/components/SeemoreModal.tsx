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
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React from 'react';

type Props = {
  isOpen?: any;
  onClose?: any;
};

const SeemoreModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent top="-50px">
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
          <Box w="100%">
            <Flex w="100%" pos="relative" flexDirection="column">
              <Box w=" 100%" h="250px" bg="brand.50">
                {/* image */}
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
                Lekkii phase one
              </Badge>
            </Flex>

            <Heading fontSize="16px" my="30px">
              Reily towers duplex
            </Heading>

            <Grid
              w="100%"
              templateColumns="repeat(2, 1fr)"
              margin="10px auto 15px"
              columnGap={3}
              padding="10px 0"
            >
              <GridItem mb="5px" display="flex" alignItems="center">
                <Icons iconClass="fa-bed" />
                <Text fontSize="13px" ml="4px">
                  7 Bedrooms
                </Text>
              </GridItem>
              <GridItem mb="5px" display="flex" alignItems="center">
                <Icons iconClass="fa-toilet" />
                <Text fontSize="13px" ml="4px">
                  9 Bathrooms
                </Text>
              </GridItem>
              <GridItem mb="5px" display="flex" alignItems="center">
                <Icons iconClass="fa-tags" />
                <Text fontSize="13px" ml="4px">
                  &#8358;145M
                </Text>
              </GridItem>
              <GridItem mb="5px" display="flex" alignItems="center">
                <Icons iconClass="fa-award" />
                <Text fontSize="13px" ml="4px">
                  Governor's consent
                </Text>
              </GridItem>
            </Grid>

            <Button
              variant="solid"
              textTransform="capitalize"
              height="40px"
              width="100%"
            >
              enquire
            </Button>

            <Box w="100%" my="20px">
              <Heading fontSize="14px">Overview</Heading>

              <Text>some texts</Text>
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
                  Information displayed about this property constitutes a mere
                  advertisement. PropertyMataaz makes no warranty as to the
                  accuracy of the advertisement or any linked or associated
                  information. Information about this property is provided and
                  maintained by undefined. PropertyMataaz shall not in any way
                  be held liable for the actions of any agent and/or property
                  owner/landlord with respect to this property on or off this
                  web application, website or App.
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
