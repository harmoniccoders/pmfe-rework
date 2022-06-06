import { GridItem, SimpleGrid } from '@chakra-ui/react';
import BuyFilter from 'lib/styles/customTheme/components/BuyFilter';
import ListedProperties from 'lib/styles/customTheme/components/ListedProperties';
import { PropertyModel } from 'types/api';
import Pagination from './Pagination';

function Listed({ data }: { data: any }) {
  console.log({ data });

  const result = data.value;
  return (
    <SimpleGrid columns={4} gap={5}>
      <GridItem colSpan={1}>
        <BuyFilter />
      </GridItem>
      <GridItem colSpan={3}>
        <ListedProperties data={result} />
      </GridItem>
      <Pagination data={data} />
    </SimpleGrid>
  );
}

export default Listed;
