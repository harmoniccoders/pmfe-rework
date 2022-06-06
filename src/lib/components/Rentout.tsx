import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomModal from './CustomModal';
import RentPropertyForm from './RentPropertyForm';

const Rentout = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  //  const requests = cleanRequests.value;

  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    setIsopen(true);
  };
  return (
    <Box>
      <Box>
        <Text fontWeight="600" color="black" fontSize="14">
          Choose an option to continue
        </Text>
        <VStack spacing="5" mt="8">
          <Button
            variant="outline"
            w="full"
            color="gray.600"
            fontWeight="500"
            fontSize=".9rem"
          >
            List property yourself
          </Button>
          <Button
            variant="outline"
            w="full"
            color="gray.600"
            fontWeight="500"
            fontSize=".9rem"
          >
            Get help listing property
          </Button>
        </VStack>
      </Box>
      <CustomModal
        component={<RentPropertyForm result={[]} closeModal={closeModal} />}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};
export default Rentout;
