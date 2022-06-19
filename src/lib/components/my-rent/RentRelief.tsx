import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import ReliefCard from 'lib/styles/customTheme/components/Modals/ReliefCard';
import CleanProperty from '../clean/CleanProperty';

function RentRelief({ data }: { data: any }) {
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
        <Box>
          <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
            Rent Relief
          </Text>
          {data.length === 0 ? (
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="6" mt="3">
              <ReliefCard />
              
            </SimpleGrid>
          ) : (
            <Text mt="3" fontWeight="medium" fontSize=".9rem">
              You currently do not have any relief request...
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default RentRelief;
