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
import EditPropertyForm from 'lib/components/sell/EditPropertyForm';
import { useState } from 'react';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  RentCollectionType,
  TenantType,
} from 'types/api';
import EditRentForm from './Listings/EditRentForm';

interface EditPropertyProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getBanks: any[];
  getStates: any[];
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
  getStates,
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
        w={['100%','75%', '80%']}
        overflow="hidden"
        maxH="100vh"
        maxW={['100%',"40%"]}
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
            {item.isForSale && (
              <EditPropertyForm
                propertyTypes={propertyTypes}
                propertyTitles={propertyTitles}
                getStates={getStates}
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
                getStates={getStates}
                getBanks={getBanks}
                formStep={formStep}
                setFormStep={setFormStep}
                onClose={onClose}
                item={item}
              />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default EditPropertyModal;
