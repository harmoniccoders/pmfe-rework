import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Pagination from 'lib/components/Pagination';
import RentListingsCard from 'lib/components/RentListingsCard';
import { PropertyTitle, PropertyType, PropertyView } from 'types/api';
import PageTabs from '../Generics/PageTabs';

interface ListingTypes {
  data: any;
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  getStates: any;
  getBanks: any
}

function MyRents({
  data,
  propertyTitles,
  propertyTypes,
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

            <Grid templateColumns="repeat(3,1fr)" columnGap="6" rowGap={5}>
              <>
                {result.map((item: PropertyView) => {
                  return (
                    <>
                      <GridItem key={item.id}>
                        <RentListingsCard
                          item={item}
                          propertyTypes={propertyTypes}
                          propertyTitles={propertyTitles}
                          getStates={getStates}
                          getBanks={getBanks}
                        />
                      </GridItem>
                    </>
                  );
                })}
                <GridItem my="2rem" colStart={1} colEnd={4}>
                  <Flex justifyContent="center">
                    <Pagination data={data} />
                  </Flex>
                </GridItem>
              </>
            </Grid>
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
