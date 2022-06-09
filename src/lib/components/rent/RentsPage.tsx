import { Box, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PropertyType, PropertyTitle } from 'types/api';
import AddRentModal from 'lib/styles/customTheme/components/Modals/AddRentModal';
import RentoutModal from 'lib/styles/customTheme/components/Modals/RentoutModal';

const RentsPage = ({
  propertyTitles,
  propertyTypes,
  getStates,
  getBanks,
}: {
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
  getStates: any;
  getBanks: any;
}) => {
  const router = useRouter();

  const openRentProperty = () => {
    router.push('/rent/listed-property');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Box w="90%" mx="auto" py="3">
      <Heading fontSize={['lg', '2xl']}>What do you want to do?</Heading>
      <SimpleGrid columns={[1, 2]} mt="5" spacing="5">
        <CardButton
          img="/assets/listProperty.png"
          title="Rent out your property"
          text="Get verified tenants and enjoy hassle-free rent collection"
          onClick={onOpen}
        />
        <CardButton
          img="/assets/findProperty.png"
          title="Rent a property"
          text="Find the perfect property from a wide range of options"
          onClick={openRentProperty}
        />
      </SimpleGrid>

      <RentoutModal isOpen={isOpen} onClose={onClose} openModal={openModal} />
      <AddRentModal
        isOpen={showModal}
        onClose={closeModal}
        isClosed={onClose}
        propertyTypes={propertyTypes}
        propertyTitles={propertyTitles}
        getStates={getStates}
        getBanks={getBanks}
      />
    </Box>
  );
};

export default RentsPage;