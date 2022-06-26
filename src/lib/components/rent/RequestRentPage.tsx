import { Box, Heading, HStack } from '@chakra-ui/react';
import PageTabs from 'lib/components/Generics/PageTabs';
import RequestRentProperty from 'lib/components/rent/RequestRentProperty';
import { PropertyType } from 'types/api';

function RequestRentPage({
  propertyTypes,
  
}: {
  propertyTypes: PropertyType[];
 
}) {
  return (
    <Box w="100%">
      <Box w="90%" mx="auto" mt={'30px'}>
        <Heading
          fontSize="16px"
          lineHeight={1.5}
          mb="2rem"
          pointerEvents="none"
        >
          Find the perfect property to rent from our wide range of options
        </Heading>
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
          <PageTabs
            tabName="rent/listed-property"
            tabTitle="Listed Properties"
          />
          <PageTabs
            tabName="rent/request-property"
            tabTitle="Request Property"
          />
        </HStack>
        <RequestRentProperty
          propertyTypes={propertyTypes}
          
        />
      </Box>
    </Box>
  );
}

export default RequestRentPage;
