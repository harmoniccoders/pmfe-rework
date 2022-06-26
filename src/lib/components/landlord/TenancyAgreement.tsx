import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Box,
  Stack,
} from '@chakra-ui/react';
import LandlordOptions from 'lib/components/landlord/LandlordOptions';
import { useState } from 'react';

interface LandlordProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export default function TenancyAgreement({
  isOpen,
  onClose,
  data,
}: LandlordProps) {
  const [formStep, setFormStep] = useState(0);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        overflowY="auto"
        borderRadius="0"
        pos="fixed"
        maxH="100vh"
      >
        <ModalHeader>
          {formStep === 0 ? (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={onClose}
            >
              <Text
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
            </Flex>
          ) : (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setFormStep(formStep - 1)}
            >
              <Text
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
            </Flex>
          )}
        </ModalHeader>

        <ModalBody>
          <Box maxH="80vh" overflow="auto">
            <Text fontWeight="700" fontSize="1.25em">
              Tenancy Agreement
            </Text>
            <Text fontSize="1.25em">Between</Text>
            <Text fontWeight="700" fontSize="1.25em">
              Gideon Oluwasegun Emokpae
            </Text>
            <Text fontSize="1.35em">And</Text>
            <Text fontWeight="700" fontSize="1.35em">
              PropertyMataaz Limited
            </Text>
            <Stack fontSize=".95em" mt="1rem">
              <Text fontWeight="600">
                In respect of the 4 Bedroom Duplex at No. 16 Admiralty Way,
                lekki Phase 1, lekki, Lagos, Nigeria
              </Text>
              <br />
              <Text>
                <span style={{ textTransform: 'uppercase' }}>
                  THIS TENANCY IS MADE THIS 10TH DAY OF APRIL 2021 BETWEEN
                </span>
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  GIDEON OLUWASEGUN EMOKPAE
                </span>{' '}
                of 10 Adebayo Titilope Street, Omole Phase 4, Ikeja, Lagos,
                Nigeria (hereinafter to referred to as The Tenant which
                expression shall where the context so admit include his
                successors in title and assigns) of the one part
                <br />
                <br />
                <span style={{ textTransform: 'uppercase' }}> and</span>
                <br />
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  PROPERTYMATAAZ LIMITED
                </span>
                , a company incorporated in nigeria having its registered office
                at Km 24 Lekki Epe Expressway, oko Ado, Lagos, Nigeria
                <br />
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  WHEREAS
                </span>
                :
              </Text>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
