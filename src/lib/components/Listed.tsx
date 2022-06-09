import { GridItem, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

import ListedProperties from 'lib/styles/customTheme/components/ListedProperties';
import { useEffect, useState } from 'react';
import { PropertyView } from 'types/api';
import BuyFilter from './BuyFilter';
import Pagination from './Pagination';

function Listed({ data }: { data: any }) {
  const result = data.value.filter((property: PropertyView) => {
    return property.isForSale && property.status === 'VERIFIED';
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchedResult, setSearchedResult] = useState([]);
  const getSearchedResult = async () => {
    try {
      const result = await (
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/api/Property/list?search=${searchTerm}`
        )
      ).data;

      if (result.status) {
        setSearchedResult(
          result.data.value.filter((property: PropertyView) => {
            return property.isForSale && property.status === 'VERIFIED';
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      getSearchedResult();
    }
  };
  const clearSearch = async () => {
    setSearchTerm('');
    setSearchedResult(result);
  };

  useEffect(() => {
    setSearchedResult(result);
  }, []);
  return (
    <SimpleGrid columns={4} gap={10}>
      <GridItem colSpan={[4, 2, 2, 1]}>
        <BuyFilter
          search={handleKeyPress}
          term={setSearchTerm}
          clear={clearSearch}
          word={searchTerm}
        />
      </GridItem>
      <GridItem colSpan={[4, 2, 2, 3]}>
        <ListedProperties searched={searchedResult} />
      </GridItem>
      <GridItem colSpan={4} colStart={2} colEnd={4} my="2rem">
        <Pagination data={data} />
      </GridItem>
    </SimpleGrid>
  );
}

export default Listed;
