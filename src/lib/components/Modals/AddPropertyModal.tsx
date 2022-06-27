import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import Form from 'lib/components/sell/Form';
import Modals from 'lib/Utils/Modals';
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
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={
        <Image
          src="/assets/PropertyMataaz.png"
          alt="company-logo"
          w="100%"
          h="100%"
          objectFit="contain"
        />
      }
      content={
        <>
          <Form
            propertyTypes={propertyTypes}
            propertyTitles={propertyTitles}
            formStep={formStep}
            setFormStep={setFormStep}
            onClose={onClose}
          />
        </>
      }
    />
  );
}

export default AddPropertyModal;
