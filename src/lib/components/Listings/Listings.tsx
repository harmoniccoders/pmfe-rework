import { Box, HStack } from '@chakra-ui/react';
import { PropertyTitle, PropertyType, PropertyView } from 'types/api';
import PageTabs from '../Generics/PageTabs';
import MyListings from './MyListings';

function ListPage({
  data,
  propertyTitles,
  propertyTypes,
  getBanks,
}: {
  data: PropertyView[];
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  getBanks: any[];
}) {
  return (
    <Box w="100%" mt="3rem">
      <Box w="90%" mx="auto">
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
          <PageTabs tabName="listings" tabTitle="My Listings" />
          <PageTabs tabName="enquires" tabTitle="My Enquires" />
          <PageTabs tabName="requests" tabTitle="My Requests" />
        </HStack>
        <MyListings
          data={data}
          propertyTypes={propertyTypes}
          propertyTitles={propertyTitles}
          getBanks={getBanks}
        />
      </Box>
    </Box>
  );
}

export default ListPage;
