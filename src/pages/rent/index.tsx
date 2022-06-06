import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import CustomModal from 'lib/components/CustomModal';
import Rentout from 'lib/components/Rentout';
import { useRouter } from 'next/router';
import { useState } from 'react';

const rent = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const router = useRouter();

  const openRentProperty = () => {
    router.push('/rent/rentProperty');
  };

  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    setIsopen(true);
  };
  return (
    <Box w="90%" mx="auto" py="3">
      <Heading fontSize={['lg', '2xl']}>What do you want to do?</Heading>
      <SimpleGrid columns={[1, 2]} mt="5" spacing="5">
        <CardButton
          img="/assets/listProperty.png"
          title="Rent out your property"
          text="Get verified tenants and enjoy hassle-free rent collection"
          onClick={openModal}
        />
        <CardButton
          img="/assets/findProperty.png"
          title="Rent a property"
          text="Find the perfect property from a wide range of options"
          onClick={openRentProperty}
        />
      </SimpleGrid>
      <CustomModal
        component={<Rentout />}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default rent;
