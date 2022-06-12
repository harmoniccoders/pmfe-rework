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
import EditPropertyForm from 'pages/sell/EditPropertyForm';
import Form from 'pages/sell/Form';
import { useState } from 'react';
import { PropertyModel, PropertyTitle, PropertyType } from 'types/api';
import EditRentForm from '../Listings/EditRentForm';

interface EditPropertyProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any[];
  getBanks: any[];
  item: PropertyModel;
}

function EditRentModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
  getStates,
  getBanks,
  item,
}: EditPropertyProps) {
  // console.log({ propertyTypes });
  const [formStep, setFormStep] = useState(0);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
      // scrollBehavior="outside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflow="hidden"
        maxH="100vh"
        maxW="40%"
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
          <Box maxH="77vh" overflowY="auto" px={5}>
            <EditRentForm
              propertyTypes={propertyTypes}
              propertyTitles={propertyTitles}
              getStates={getStates}
              getBanks={getBanks}
              formStep={formStep}
              setFormStep={setFormStep}
              onClose={onClose}
              item={item}   />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditRentModal;
