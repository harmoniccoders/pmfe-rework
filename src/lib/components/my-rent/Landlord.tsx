import { Box, Grid, HStack, Text } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import LandlordRentCard from 'lib/components/LandlordRentCard';
import MyTenancy from './MyTenancy';

function Landlord({ data }: { data: any }) {
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
            <PageTabs tabName="my-rent/tenancy/tenant" tabTitle="For Tenant" />
            <PageTabs
              tabName="my-rent/tenancy/landlord"
              tabTitle="For Landlord"
            />
          </HStack>

          <Box>
            <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
              For Landlord
            </Text>
            {data.length > 0 ? (
              <LandlordRentCard data={data} />
            ) : (
              <Text mt="3" fontWeight="medium" fontSize=".9rem">
                You currently do not have any active tenancy...
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Landlord;
