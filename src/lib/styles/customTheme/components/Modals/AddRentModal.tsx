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
import Form from 'pages/rent/Form';
import { useState } from 'react';
import { PropertyTitle, PropertyType } from 'types/api';

interface AddRentProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
}

function AddRentModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
  getStates,
  getBanks,
}: {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
  getBanks: any[];
}) {
  const [formStep, setFormStep] = useState(0);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['full', '80%']}
        // overflow="hidden"
        overflowY="scroll"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
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
          <Box pb="7" px={5}>
            <Form
              propertyTypes={propertyTypes}
              propertyTitles={propertyTitles}
              getStates={getStates}
              getBanks={getBanks}
              formStep={formStep}
              setFormStep={setFormStep}
              onClose={onClose}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddRentModal;
