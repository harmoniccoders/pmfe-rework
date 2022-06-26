import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import RentForm from 'lib/components/rent/RentForm';
import { useState } from 'react';
import {
  PropertyTitle,
  PropertyType,
  RentCollectionType,
  TenantType,
} from 'types/api';

interface AddRentProps {
  isOpen: boolean;
  onClose: () => void;
  isClosed: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];

  getBanks: any[];
}

function AddRentModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
  propertyTenants,
  propertyCollection,
 
  getBanks,
  isClosed,
}: AddRentProps) {
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
        overflowY="scroll"
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
          <Box pb="7" px={5}>
            <RentForm
              propertyTypes={propertyTypes}
              propertyTitles={propertyTitles}
              propertyTenants={propertyTenants}
              propertyCollection={propertyCollection}
             
              getBanks={getBanks}
              formStep={formStep}
              setFormStep={setFormStep}
              onClose={onClose}
              isClosed={isClosed}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddRentModal;
