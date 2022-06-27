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
import EditPropertyForm from 'lib/components/sell/EditPropertyForm';
import { useState } from 'react';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  RentCollectionType,
  TenantType,
} from 'types/api';
import EditRentForm from 'lib/components/rent/EditRentForm';
import Modals from 'lib/Utils/Modals';

interface EditPropertyProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getBanks: any[];
  item: PropertyModel;
}

function EditPropertyModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
  getBanks,
  propertyTenants,
  propertyCollection,
  item,
}: EditPropertyProps) {
  const [formStep, setFormStep] = useState(0);
  return (
    <>
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
            {item.isForSale && (
              <EditPropertyForm
                propertyTypes={propertyTypes}
                propertyTitles={propertyTitles}
                formStep={formStep}
                setFormStep={setFormStep}
                onClose={onClose}
                item={item}
              />
            )}
            {item.isForRent && (
              <EditRentForm
                propertyTypes={propertyTypes}
                propertyTitles={propertyTitles}
                propertyTenants={propertyTenants}
                propertyCollection={propertyCollection}
                getBanks={getBanks}
                formStep={formStep}
                setFormStep={setFormStep}
                onClose={onClose}
                item={item}
              />
            )}
          </>
        }
      />
    </>
  );
}

export default EditPropertyModal;
