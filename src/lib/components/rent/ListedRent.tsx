import { Box, GridItem, SimpleGrid, Center } from '@chakra-ui/react';
import ListedProperties from 'lib/components/ListedProperties';
import { useRouter } from 'next/router';
import { FilterDocket } from '../Generics/FilterDocket';
import { NoData } from '../NoData';
import Pagination from '../Pagination';

function ListedRent({ data }: { data: any }) {
  const result = data.value;
  const router = useRouter();
  const isFilter = router.query.filter;

  return (
    <Box>
      {(result?.length === 0 || result == undefined) &&
      isFilter === undefined ? (
        <NoData />
      ) : (
        <SimpleGrid columns={4} gap={9}>
          <FilterDocket />
          {(result?.length === 0 || result == undefined) &&
            isFilter !== undefined && (
              <GridItem colSpan={3}>
                <NoData w="100%" />
              </GridItem>
            )}
          <GridItem colSpan={[4, 4, 2, 2, 3]}>
            <ListedProperties result={result} />
            <Center my="2rem">
              <Pagination data={data} />
            </Center>
          </GridItem>
        </SimpleGrid>
      )}
    </Box>
  );
}

export default ListedRent;
