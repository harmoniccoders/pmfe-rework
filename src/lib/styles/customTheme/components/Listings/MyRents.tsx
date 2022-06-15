import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import ListingsCard from 'lib/components/ListingsCard';
import Pagination from 'lib/components/Pagination';
import {
  PropertyTitle,
  PropertyType,
  PropertyView,
  RentCollectionType,
  TenantType,
} from 'types/api';
import PageTabs from '../Generics/PageTabs';

interface ListingTypes {
  data: any;
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getStates: any;
  getBanks: any;
}

function MyRents({
  data,
  propertyTitles,
  propertyTypes,
  propertyTenants,
  propertyCollection,
  getStates,
  getBanks,
}: ListingTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const result = data.value;
  return (
    <Box w="95%" mx="auto" pb="5">
      <HStack
        w="full"
        h="3rem"
        borderRadius="8px"
        bgColor="brand.50"
        spacing={0}
        align="center"
        p=".2rem"
        mb="1rem"
      >
        <PageTabs tabName="listings/mylistings" tabTitle="For Sale" />
        <PageTabs tabName="listings/myrents" tabTitle="For Rent" />
      </HStack>
      <Box>
        {result.length > 0 ? (
          <Box>
            <Flex justify="space-between" align="center" my="8">
              <Text fontWeight="bold" color="brand.100" fontSize="lg">
                Properties Listed by you for Rent
              </Text>
            </Flex>

            <SimpleGrid columns={[1, 2, 2, 3]} spacing="6">
              {result.map((item: PropertyView) => {
                return (
                  <ListingsCard
                    key={item.id}
                    item={item}
                    propertyTypes={propertyTypes}
                    propertyTitles={propertyTitles}
                    propertyTenants={propertyTenants}
                    propertyCollection={propertyCollection}
                    getStates={getStates}
                    getBanks={getBanks}
                  />
                );
              })}
            </SimpleGrid>
            <Box my="2rem">
              <Flex justifyContent="center">
                <Pagination data={data} />
              </Flex>
            </Box>
          </Box>
        ) : (
          <Heading fontSize="16px" lineHeight={1.5}>
            Sorry! There's no property at this time please check back later
          </Heading>
        )}
      </Box>
    </Box>
  );
}

export default MyRents;
