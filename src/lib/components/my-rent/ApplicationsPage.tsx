import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import ReliefCard from 'lib/styles/customTheme/components/Modals/ReliefCard';
import { useOperationMethod } from 'react-openapi-client';
import { Application, RentReliefView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import TenantInfo from '../TenantInfo';
import Pagination from '../Pagination';

function ApplicationsPage({ data }: { data: any }) {
  console.log({ data });
  const result = data?.value;

  return (
    <Box w="100%" my="3rem">
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
          <PageTabs tabName="my-rent/applications/[id]" tabTitle="All" />
          <PageTabs tabName="my-rent/requests" tabTitle="Requests" />
          <PageTabs tabName="my-rent/rent-relief" tabTitle="Rent Relief" />
          <PageTabs tabName="my-rent/tenancy" tabTitle="My Tenancy" />
        </HStack>
        <Box>
          <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
            Tenant Applications
          </Text>
          {result?.length > 0 ? (
            <SimpleGrid columns={[1, 1, 2, 3]} spacing="6" mt="5">
              {result.map((item: Application) => (
                <TenantInfo key={item.id} item={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Text mt="3" fontWeight="medium" fontSize=".9rem">
              You currently do not have applications for the property...
            </Text>
          )}
        </Box>
        <Flex my="2rem" justifyContent="center">
          <Pagination data={data} />
        </Flex>
      </Box>
    </Box>
  );
}

export default ApplicationsPage;
