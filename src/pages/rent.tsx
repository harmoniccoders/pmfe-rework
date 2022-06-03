import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import CustomModal from 'lib/components/CustomModal';
import Rentout from 'lib/components/Rentout';
import { useState } from 'react';

const rent = () => {
  const [isOpen, setIopen] = useState(false);
  const onClose = () => {
    setIopen(!isOpen);
  };
  return (
    <Box w="90%" mx="auto" py="3">
      <Heading fontSize={['lg', '2xl']}>What do you want to do?</Heading>
      <SimpleGrid columns={[1, 2]} mt="5" spacing="5">
        <CardButton
          img="/assets/listProperty.png"
          title="Rent out your property"
          text="Get verified tenants and enjoy hassle-free rent collection"
          onClick={onClose}
        />
        <CardButton
          img="/assets/findProperty.png"
          title="Rent a property"
          text="Find the perfect property from a wide range of options"
        />
      </SimpleGrid>
      <CustomModal component={<Rentout />} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default rent;
