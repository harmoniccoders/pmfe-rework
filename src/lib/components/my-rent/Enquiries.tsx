import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import { PropertyView, UserEnquiry } from 'types/api';
import Pagination from '../Pagination';
import PropertyCard from '../PropertyCard';

function MyRent({ data }: { data: any }) {
  const result = data.value;
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
          {result?.length <= 0 ? (
            <Heading fontSize="16px" lineHeight={1.5}>
              Sorry! There's no property at this time please check back later
            </Heading>
          ) : (
            <Box>
              <Grid
                templateColumns={[
                  'repeat(1,1fr)',
                  'repeat(1,1fr)',
                  'repeat(2,1fr)',
                  'repeat(3,1fr)',
                ]}
                columnGap="6"
                rowGap={5}
              >
                {result.map((item: UserEnquiry) => {
                  return (
                    <GridItem key={item.id}>
                      <PropertyCard item={item.property as PropertyView} />
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

export default MyRent;
