import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  PropertyView,
  RentCollectionType,
  TenantType,
} from 'types/api';
import PageTabs from '../Generics/PageTabs';
import MyRents from './MyRents';

type Props = {
  data: PropertyView[];
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getStates: any;
  getBanks: any;
};
function RentPage({
  data,
  propertyTitles,
  propertyTypes,
  propertyTenants,
  propertyCollection,
  getStates,
  getBanks,
}: Props) {
  console.log({ data });
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
        <MyRents
          data={data}
          propertyTypes={propertyTypes}
          propertyTitles={propertyTitles}
          propertyTenants={propertyTenants}
          propertyCollection={propertyCollection}
          getStates={getStates}
          getBanks={getBanks}
        />
      </Box>
    </Box>
  );
}

export default RentPage;
