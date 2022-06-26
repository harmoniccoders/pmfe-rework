import { Box, Heading, HStack } from '@chakra-ui/react';
import { PropertyType } from 'types/api';
import PageTabs from 'lib/components/Generics/PageTabs';
import RequestProperty from '../RequestProperty';

function RequestPage({
  propertyTypes,
  
}: {
  propertyTypes: PropertyType[];

}) {
  return (
    <Box w="100%" mt="30px">
      <Box w="90%" mx="auto">
        <Heading
          fontSize="16px"
          lineHeight={1.5}
          mb="2rem"
          opacity="0"
          display={['none', 'block']}
          pointerEvents="none"
        >
          Find a property to buy with the safety of 103% money back guarantee
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
          <PageTabs tabName="buy" tabTitle="Listed Properties" />
          <PageTabs tabName="request" tabTitle="Request Property" />
        </HStack>

        <RequestProperty propertyTypes={propertyTypes}  />
      </Box>
    </Box>
  );
}

export default RequestPage;
