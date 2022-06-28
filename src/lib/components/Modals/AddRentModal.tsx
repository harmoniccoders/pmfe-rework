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
import RentForm from 'lib/components/rent/RentForm';
import Modals from 'lib/Utils/Modals';
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
    <>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        formStep={formStep}
        setFormStep={setFormStep}
        pmlogo={true}
        content={
          <>
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
          </>
        }
      />
    </>
  );
}

export default AddRentModal;
