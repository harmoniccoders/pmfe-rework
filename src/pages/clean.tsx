import { useState } from 'react';
import { Box, Center, Stack, Text } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import CustomModal from 'lib/components/CustomModal';
import BookCleaning from 'lib/components/BookCleaning';
import axios from 'axios';
import { PropertyType } from 'types/api';

const clean = ({ data }: { data: PropertyType[] }) => {
  const [isOpen, setIsopen] = useState<boolean>(false);

  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    setIsopen(true);
  };
  return (
    <Box w="90%" mx="auto" py="4">
      <Stack w={['full', '50%']}>
        <CardButton
          img="/assets/cleanProperty.png"
          title="Book Cleaning Session"
          text="Professional cleaning services"
          openModal={openModal}
        />
      </Stack>
      <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
        Cleaning Session
      </Text>
      <Center h="30vh" fontSize=".9rem">
        You currently have no Cleaning sessions Booked.
      </Center>
      <CustomModal
        component={<BookCleaning result={data} closeModal={closeModal} />}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default clean;

export const getStaticProps = async () => {
  const result = await (
    await axios.get(`${process.env.NEXT_PUBLIC_API_BASEURL}/api/Property/types`)
  ).data;
  console.log(result);
  const data = result.data;
  return {
    props: { data },
  };
};
