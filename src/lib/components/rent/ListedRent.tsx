import { GridItem, SimpleGrid } from '@chakra-ui/react';
import ListedProperties from 'lib/styles/customTheme/components/ListedProperties';
import { PropertyView } from 'types/api';
import BuyFilter from '../BuyFilter';
import Pagination from '../Pagination';

function ListedRent({ data }: { data: any }) {
  const result = data.value.filter((property: PropertyView) => {
    return property.isForRent && property.status === 'VERIFIED';
  });
  return (
    <SimpleGrid columns={4} gap={10}>
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

export default ListedRent;
