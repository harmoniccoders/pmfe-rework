import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { ApplicationView } from 'types/api';
import TenantInfo from '../TenantInfo';

const RejectedApplication = ({ result }: { result: any }) => {
  const rejected = result?.filter(
    (item: ApplicationView) => item.status === 'REJECTED'
  );
  return (
    <Box>
      <Text fontWeight="bold" mt="2" color="brand.100" fontSize="lg">
        Rejected Applications
      </Text>
      {rejected?.length > 0 ? (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing="6" mt="5">
          {rejected?.map((item: ApplicationView) => (
            <TenantInfo key={item.id} item={item} />
          ))}
        </SimpleGrid>
      ) : (
        <Text mt="3" fontWeight="medium" fontSize=".9rem">
          You have not rejected any applications for the property...
        </Text>
      )}
    </Box>
  );
};

export default RejectedApplication;
