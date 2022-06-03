import { useState } from 'react';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import CustomModal from 'lib/components/CustomModal';

const clean = () => {
   const [isOpen, setIopen] = useState(false);
   const onClose = () => {
     setIopen(!isOpen);
   };
  return (
    <Box w="90%" mx="auto" py="4">
      <Stack w={['full', '50%']}>
        <CardButton
          img="/assets/cleanProperty.png"
          title="Book Cleaning Session"
          text="Professional cleaning services"
          onClick={onClose}
        />
      </Stack>
      <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
        Cleaning Session
      </Text>
      <Center h="30vh" fontSize=".9rem">
        You currently have no Cleaning sessions Booked.
      </Center>
      <CustomModal component={<></>} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default clean;
