import { GridItem, SimpleGrid } from '@chakra-ui/react';

import ListedProperties from 'lib/styles/customTheme/components/ListedProperties';
import { PropertyModel } from 'types/api';
import BuyFilter from './BuyFilter';
import Pagination from './Pagination';

function Listed({ data }: { data: any }) {
  console.log({ data });

  const result = data.value;
  return (
    <SimpleGrid columns={4} gap={5}>
      <GridItem colSpan={[4, 2, 2, 1]}>
        <BuyFilter />
      </GridItem>
      <GridItem colSpan={[4, 2, 2, 3]}>
        <ListedProperties data={result} />
      </GridItem>
      <GridItem colSpan={4} colStart={2} colEnd={4} my="2rem">
        <Pagination data={data} />
      </GridItem>
    </SimpleGrid>
  );
}

export default Listed;
