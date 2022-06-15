import { Box, Heading, HStack } from '@chakra-ui/react';
import Listed from 'lib/components/Listed';
import { PropertyModel } from 'types/api';
import PageTabs from '../../Generics/PageTabs';

function BuyPage({ data }: { data: PropertyModel[] }) {
  return (
    <Box w="100%" mt="30px">
      <Box w="90%" mx="auto">
        <Heading fontSize="16px" lineHeight={1.5} mb="2rem">
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
          mb={['1.5rem', '2.5rem']}
        >
          <PageTabs tabName="buy" tabTitle="Listed Properties" />
          <PageTabs tabName="request" tabTitle="Request Property" />
        </HStack>
        <Listed data={data} />
      </Box>
    </Box>
  );
}

export default BuyPage;
