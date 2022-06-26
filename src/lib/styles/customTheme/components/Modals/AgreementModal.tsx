import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Image,
  Text,
  Box,
  Heading,
  ModalBody,
  VStack,
  Button,
  Divider,
  Checkbox,
} from '@chakra-ui/react';
import { Tenancy } from 'types/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: Tenancy
}

const AgreementModal = ({ isOpen, onClose,item }: Props) => {
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
        overflowY="auto"
        h="100vh"
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
          <Box px="5">
            <VStack align="flex-start" fontSize="1.2rem">
              <Heading fontSize="1.2rem">Tenancy Agreement</Heading>
              <Text>Between</Text>
              <Heading
                fontSize="1.2rem"
                textTransform="capitalize"
              >{`${item.tenant?.firstName} ${item.tenant?.lastName}`}</Heading>
              <Text>And</Text>
              <Heading fontSize="1.2rem">PropertyMataaz Limted</Heading>
            </VStack>
            <Text my="5">
              In respect of the 4 Bedroom Duplex at No. 16 Admiralty Way, lekki
              Phase 1, lekki, Lagos, Nigeria
            </Text>
            <VStack align="flex-start" spacing="2">
              <Text>
                THIS TENANCY IS MADE THIS 10TH DAY OF APRIL 2021 BETWEEN
              </Text>
              <Heading
                fontSize="1rem"
                textTransform="capitalize"
              >{`${item.tenant?.firstName} ${item.tenant?.lastName}`}</Heading>
              <Text>
                of 10 Adebayo Titilope Street, Omole Phase 4, Ikeja, Lagos,
                Nigeria (hereinafter to referred to as The Tenant which
                expression shall where the context so admit include his
                successors in title and assigns) of the one part
              </Text>
            </VStack>

            <Text my="5">AND</Text>

            <Text>
              <Heading fontSize="1rem">PROPERTYMATAAZ LIMITED,</Heading> a
              company incorporated in nigeria having its registered office at Km
              24 Lekki Epe Expressway, oko Ado, Lagos, Nigeria
            </Text>
            <Heading my="5" fontSize="1rem">
              WHEREAS:
            </Heading>
            <VStack spacing="5" align="flex-start">
              <Divider />
              <Checkbox colorScheme="green" alignItems="flex-start">
                I agree that checking this box and tapping the agree button
                constitutes an appending of my electronic signature to the
                Tenancy Agreement herein.
              </Checkbox>
              <Button fontSize="1rem" w="full">
                Agree and Submit
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AgreementModal;
