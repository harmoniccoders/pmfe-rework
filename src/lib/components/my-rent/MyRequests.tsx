import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  HStack,
} from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import RequestCard from 'lib/styles/customTheme/components/Listings/RequestCards';
import {
  PropertyRequestView,
} from 'types/api';
import Pagination from '../Pagination';

function MyRequests({ data }: { data: any }) {
  const result = data.value;
  console.log({data})
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
          <PageTabs tabName="my-rent/enquiries" tabTitle="Enquiries" />
          <PageTabs tabName="my-rent/requests" tabTitle="Requests" />
          <PageTabs tabName="my-rent/rent-relief" tabTitle="Rent Relief" />
          <PageTabs tabName="my-rent/tenancy" tabTitle="My Tenancy" />
        </HStack>

        <>
          {result.length <= 0 ? (
            <Text mt="3" fontWeight="medium" fontSize=".9rem">
              You have not made any request...
            </Text>
          ) : (
            <Box>
              <Grid
                templateColumns={[
                  'repeat(1,1fr)',
                  'repeat(1,1fr)',
                  'repeat(2,1fr)',
                  'repeat(3,1fr)',
                ]}
                columnGap="8"
                rowGap={7}
              >
                {result.map((item: PropertyRequestView) => {
                  return (
                    <GridItem key={item.id}>
                      <RequestCard item={item} />
                    </GridItem>
                  );
                })}
              </Grid>
              <GridItem my="2rem" colStart={1} colEnd={4}>
                <Flex justifyContent="center">
                  <Pagination data={data} />
                </Flex>
              </GridItem>
            </Box>
          )}
        </>
      </Box>
    </Box>
  );
}

export default MyRequests;
