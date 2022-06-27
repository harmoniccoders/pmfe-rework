import {
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  VStack,
  Image,
  Text,
  HStack,
  Button,
  Center,
} from '@chakra-ui/react';
import Counter from 'lib/Utils/Counter';

import ListedProperties from 'lib/components/ListedProperties';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Icons from '../Icons';
import Pagination from '../Pagination';

function ListedRent({ data }: { data: any }) {
  const result = data.value;

  const router = useRouter();

  const [filterOptions, setFilterOptions] = useState({
    isResidential: false,
    isCommercial: false,
    isMixed: false,
    isFlat: false,
    isBungalow: false,
    isDuplex: false,
    isTerrace: false,
    bedrooms: 0,
    bathrooms: 0,
  });
  const [bedroomCounter, setBedroomCounter] = useState(0);
  const [bathroomCounter, setBathroomCounter] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [openFilter, setOpenFilter] = useState(false);

  const getSearchedResult = async () => {
    router.push({
      query: {
        search: searchTerm,
      },
    });
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      getSearchedResult();
    }
  };
  const clearSearch = () => {
    setSearchTerm('');
    router.push({
      query: {
        search: '',
      },
    });
  };

  const getFilteredData = async () => {
    filterOptions.isResidential = filterOptions.isResidential;
    filterOptions.isCommercial = filterOptions.isCommercial;
    filterOptions.isMixed = filterOptions.isMixed;
    filterOptions.isFlat = filterOptions.isFlat;
    filterOptions.isBungalow = filterOptions.isBungalow;
    filterOptions.isDuplex = filterOptions.isDuplex;
    filterOptions.isTerrace = filterOptions.isTerrace;
    filterOptions.bedrooms = bedroomCounter;
    filterOptions.bathrooms = bathroomCounter;
    const url = `Residential=${filterOptions.isResidential}&Commercial=${filterOptions.isCommercial}&Mixed=${filterOptions.isMixed}&Bungalow=${filterOptions.isBungalow}&Flat=${filterOptions.isFlat}&Duplex=${filterOptions.isDuplex}&Terrace=${filterOptions.isTerrace}&Bathrooms=${filterOptions.bathrooms}&Bedrooms=${filterOptions.bedrooms}`;
    router.push({
      query: {
        filter: url,
      },
    });
  };

  const clearFilteredData = () => {
    setFilterOptions({
      isResidential: false,
      isCommercial: false,
      isMixed: false,
      isFlat: false,
      isBungalow: false,
      isDuplex: false,
      isTerrace: false,
      bedrooms: 0,
      bathrooms: 0,
    });
    setBedroomCounter(0);
    setBathroomCounter(0);
    router.push({
      query: {
        filter: '',
      },
    });
  };

  return (
    <Box>
      <SimpleGrid columns={4} gap={9}>
        <GridItem colSpan={[4, 4, 2, 2, 1]}>
          <VStack w="full" pb="1rem" align="flex-start" spacing={5}>
            <Box w="full">
              <InputGroup alignItems="center">
                <InputLeftElement onClick={getSearchedResult}>
                  <Icons iconClass="fa-search" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search"
                  height="40px"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                  value={searchTerm}
                  _placeholder={{
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                  _focus={{
                    outline: 'none',
                  }}
                />
                {searchTerm !== '' && (
                  <InputRightElement onClick={clearSearch}>
                    <Icons iconClass="fa-times" />
                  </InputRightElement>
                )}
              </InputGroup>
            </Box>
            <Box
              bgColor="brand.50"
              w="full"
              // color="white"
              fontWeight="600"
              textAlign="center"
              py=".5rem"
              display={['block', 'block', 'block', 'none']}
              onClick={() => setOpenFilter(!openFilter)}
            >
              {openFilter ? 'Hide Filter Tabs' : 'Show Filter Tabs'}
            </Box>
            <VStack
              w="full"
              align="flex-start"
              spacing={5}
              transition="all .5s ease"
              display={{
                base: openFilter ? 'flex' : 'none',
                md: openFilter ? 'flex' : 'none',
                lg: 'flex',
                xl: 'flex',
              }}
            >
              <Grid
                templateColumns="repeat(4,1fr)"
                gap={5}
                w="full"
                mt="2rem !important"
                mb="1rem"
              >
                <GridItem width="full">
                  <Flex
                    border="2px solid"
                    width="100%"
                    height="57px"
                    alignItems="flex-end"
                    justifyContent="center"
                    borderRadius="5px"
                    borderColor={
                      filterOptions.isBungalow ? 'brand.100' : '#33333'
                    }
                    onClick={() => {
                      setFilterOptions({
                        ...filterOptions,
                        isBungalow: !filterOptions.isBungalow,
                      });
                    }}
                  >
                    <Image
                      width="40px"
                      height="40px"
                      mx="auto"
                      src="/assets/Bungalow.png"
                      alt="apartment-image"
                      objectFit="contain"
                    />
                  </Flex>

                  <Text
                    fontSize="12px"
                    fontWeight={600}
                    textTransform="capitalize"
                    textAlign="center"
                    pt="3px"
                    color={filterOptions.isBungalow ? 'brand.100' : '#33333'}
                  >
                    bungalow
                  </Text>
                </GridItem>
                <GridItem width="full">
                  <Flex
                    border="2px solid"
                    width="100%"
                    height="57px"
                    alignItems="flex-end"
                    justifyContent="center"
                    borderRadius="5px"
                    borderColor={
                      filterOptions.isDuplex ? 'brand.100' : '#33333'
                    }
                    onClick={() => {
                      setFilterOptions({
                        ...filterOptions,
                        isDuplex: !filterOptions.isDuplex,
                      });
                    }}
                  >
                    <Image
                      width="40px"
                      height="40px"
                      mx="auto"
                      src="/assets/Duplex.png"
                      alt="apartment-image"
                      objectFit="contain"
                    />
                  </Flex>

                  <Text
                    fontSize="12px"
                    fontWeight={600}
                    textTransform="capitalize"
                    textAlign="center"
                    pt="3px"
                    color={filterOptions.isDuplex ? 'brand.100' : '#33333'}
                  >
                    Duplex
                  </Text>
                </GridItem>
                <GridItem width="full">
                  <Flex
                    border="2px solid"
                    width="100%"
                    height="57px"
                    alignItems="flex-end"
                    justifyContent="center"
                    borderRadius="5px"
                    borderColor={filterOptions.isFlat ? 'brand.100' : '#33333'}
                    onClick={() => {
                      setFilterOptions({
                        ...filterOptions,
                        isFlat: !filterOptions.isFlat,
                      });
                    }}
                  >
                    <Image
                      width="40px"
                      height="40px"
                      mx="auto"
                      src="/assets/Apartment.png"
                      alt="apartment-image"
                      objectFit="contain"
                    />
                  </Flex>

                  <Text
                    fontSize="12px"
                    fontWeight={600}
                    textTransform="capitalize"
                    textAlign="center"
                    pt="3px"
                    color={filterOptions.isFlat ? 'brand.100' : '#33333'}
                  >
                    Flat
                  </Text>
                </GridItem>
                <GridItem width="full">
                  <Flex
                    border="2px solid"
                    width="100%"
                    height="57px"
                    alignItems="flex-end"
                    justifyContent="center"
                    borderRadius="5px"
                    borderColor={
                      filterOptions.isTerrace ? 'brand.100' : '#33333'
                    }
                    onClick={() => {
                      setFilterOptions({
                        ...filterOptions,
                        isTerrace: !filterOptions.isTerrace,
                      });
                    }}
                  >
                    <Image
                      width="40px"
                      height="40px"
                      mx="auto"
                      src="/assets/Terrace.png"
                      alt="apartment-image"
                      objectFit="contain"
                    />
                  </Flex>

                  <Text
                    fontSize="12px"
                    fontWeight={600}
                    textTransform="capitalize"
                    textAlign="center"
                    pt="3px"
                    color={filterOptions.isTerrace ? 'brand.100' : '#33333'}
                  >
                    Terrace
                  </Text>
                </GridItem>
              </Grid>

              <Counter
                room="bedroom"
                bed={setBedroomCounter}
                bath={setBathroomCounter}
                count={bedroomCounter}
                bathCount={bathroomCounter}
              />
              <Counter
                room="bathroom"
                bed={setBedroomCounter}
                bath={setBathroomCounter}
                count={bedroomCounter}
                bathCount={bathroomCounter}
              />
              <HStack spacing={4} w="full">
                <Button
                  variant="outline"
                  height="40px"
                  width="full"
                  color="rgb(37,36,39)"
                  onClick={() => clearFilteredData()}
                >
                  Clear Filters
                </Button>
                <Button
                  variant="solid"
                  height="40px"
                  width="full"
                  onClick={() => getFilteredData()}
                >
                  Apply Filters
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={[4, 4, 2, 2, 3]}>
          <ListedProperties result={result} />
        </GridItem>
      </SimpleGrid>
      <Center my="2rem">
        <Pagination data={data} />
      </Center>
    </Box>
  );
}

export default ListedRent;
