import { Box, SimpleGrid, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ApplicationView } from 'types/api';
import Pagination from '../Pagination';
import TenantInfo from '../TenantInfo';

const AllApplications = ({ result, data }: { data: any; result: any }) => {
  const onAccepted = result.find(
    (item: ApplicationView) => item.status === 'REVIEWED'
  );
  return (
    <Box>
      <Text fontWeight="bold" mt="2" color="brand.100" fontSize="lg">
        Tenant Applications
      </Text>
      {result?.length > 0 ? (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="6" mt="5">
          {result
            .filter((x: ApplicationView) => x.applicationType == 'RENT')
            .map((item: ApplicationView) => (
              <TenantInfo key={item.id} item={item} onAccepted={onAccepted} />
            ))}
        </SimpleGrid>
      ) : (
        <Text mt="3" fontWeight="medium" fontSize=".9rem">
          You currently do not have applications for the property...
        </Text>
      )}
      <Flex my="3rem" justifyContent="center">
        {/* <Pagination data={data} /> */}
      </Flex>
    </Box>
  );
};

export default AllApplications;
