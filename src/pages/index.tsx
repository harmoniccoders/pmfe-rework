import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Link,
  VStack,
  Grid,
  GridItem,
  Flex,
  Button,
} from '@chakra-ui/react';
import Hero from 'lib/components/Hero';
import PropertyCard from 'lib/components/PropertyCard';
import Services from 'lib/components/Services';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PropertyView } from 'types/api';

const index = ({ data }: { data: any }) => {
  const result = data.value;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const router = useRouter();

  const goHome = () => {
    setIsSearch(false);
    setSearchTerm('');
    router.push({
      query: {
        search: '',
      },
    });
  };
  return (
    <Box>
      {isSearch && router.query.search == searchTerm ? (
        <Box w="90%" mx="auto" mt="3rem">
          <Flex justify="space-between" alignItems="center" mb="2rem">
            <Heading fontSize="16px" lineHeight={1.5} color="brand.100">
              You searched for: {searchTerm}
            </Heading>
            <Button
              height={['2.3rem', '3rem']}
              onClick={() => goHome()}
            >
              Go back
            </Button>
          </Flex>
          <>
            {result?.length <= 0 ? (
              <Heading fontSize="16px" lineHeight={1.5}>
                No result found
              </Heading>
            ) : (
              <Grid
                templateColumns={[
                  'repeat(1,1fr)',
                  'repeat(1,1fr)',
                  'repeat(2,1fr)',
                  'repeat(3,1fr)',
                ]}
                columnGap="6"
                rowGap={5}
              >
                <>
                  {result.map((item: PropertyView) => {
                    return (
                      <GridItem key={item.id}>
                        <PropertyCard item={item} />
                      </GridItem>
                    );
                  })}
                </>
              </Grid>
            )}
          </>
        </Box>
      ) : (
        <>
          <Hero
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsSearched={setIsSearch}
          />
          <Services />
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify="center"
            bg="green.50"
            minH="400px"
            spacing="10"
          >
            <VStack>
              <Heading alignSelf={['center', 'start']}>Get the app!</Heading>
              <Text>
                Download our Android or iOS app and take <br /> PropertyMataaz
                with you wherever you go.
              </Text>
            </VStack>
            <Stack
              direction={['column', 'row']}
              spacing="5"
              align={['center', 'unset']}
            >
              <Link href="/">
                <Image
                  cursor="pointer"
                  src="/assets/iOS+App+Store+badge-min.png"
                  alt="apple"
                />
              </Link>
              <Link href="/">
                <Image
                  cursor="pointer"
                  src="/assets/Google+Play+badge-min.png"
                  alt="google"
                />
              </Link>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url, search, filter } = ctx.query;
  if (url == '' || undefined || null) {
    url = 'limit=6&offset=0&';
  }
  url = url ?? 'limit=25&offset=0&';

  if (search) {
    url = `${url}search=${search}`;
  }

  try {
    const data = (await _dataAccess.get(`/api/Property/list?${url}`)).data;
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
