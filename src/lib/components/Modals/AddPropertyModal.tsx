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
import Form from 'lib/components/sell/Form';
import { useState } from 'react';
import { PropertyTitle, PropertyType } from 'types/api';

interface AddPropertyProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
}

function AddPropertyModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
}: AddPropertyProps) {
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
          <Box px={5}>
            <Form
              propertyTypes={propertyTypes}
              propertyTitles={propertyTitles}
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

export default AddPropertyModal;