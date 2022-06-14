import { useState } from 'react';
import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import { PropertyType } from 'types/api';
import CleanProperty from 'lib/components/clean/CleanProperty';
import BookCleaningModal from 'lib/styles/customTheme/components/Modals/BookCleaningModal';

const CleanPage = ({
  data,
  cleanRequests,
}: {
  data: PropertyType[];
  cleanRequests: any;
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const requests = cleanRequests.value;
  
  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    setIsopen(true);
  };
  return (
    <Box w="90%" mx="auto" py="4">
      <SimpleGrid columns={{base: 1, md: 2, xl:3}} spacing={8}>
        <CardButton
          img="/assets/cleanProperty.png"
          title="Book Cleaning Session"
          text="Professional cleaning services"
          onClick={openModal}
        />
      </SimpleGrid>
      <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
        Cleaning Session
      </Text>
      {requests.length > 0 ? (
        <CleanProperty requests={requests} />
      ) : (
        <Center h="30vh" fontSize=".9rem">
          You currently have no Cleaning sessions Booked.
        </Center>
      )}
      <BookCleaningModal
        result={data}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </Box>
  );
};

export default CleanPage;
