import { Box, Heading, HStack } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import { PropertyModel } from 'types/api';
import ListedRent from './ListedRent';

function ListedRentPage({ data }: { data: PropertyModel[] }) {
  return (
    <Box w="100%" mt="30px">
      <Box w="90%" mx="auto">
        <Heading fontSize="16px" lineHeight={1.5} mb="2rem">
          Find the perfect property to rent from our wide range of options
        </Heading>
        <HStack
          w="full"
          h="3rem"
          borderRadius="8px"
          bgColor="brand.50"
          spacing={0}
          align="center"
          p=".2rem"
          mb="2.5rem"
        >
          <PageTabs
            tabName="rent/listed-property"
            tabTitle="Listed Properties"
          />
          <PageTabs
            tabName="rent/request-property"
            tabTitle="Request Property"
          />
        </HStack>
        <ListedRent data={data} />
      </Box>
    </Box>
  );
}

export default ListedRentPage;
