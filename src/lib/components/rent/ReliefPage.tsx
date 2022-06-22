import { Box, Heading,Text } from '@chakra-ui/react';
import { PropertyModel } from 'types/api/property-model';
import ListedRent from './ListedRent';

const ReliefPage = ({ data }: { data: PropertyModel[] }) => {
  return (
    <Box w="90%" mt="30px" mx="auto">
      <Heading
        fontWeight="bold"
        my="5"
        color="brand.100"
        fontSize="lg"
      >
        Rent Relief
      </Heading>
      <Text  fontWeight="bold" lineHeight={1.5} mb="2rem">
        Find the perfect property to rent from our wide range of options
      </Text>
      <ListedRent data={data} />
    </Box>
  );
};

export default ReliefPage;
