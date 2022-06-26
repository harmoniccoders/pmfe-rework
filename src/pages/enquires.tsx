import { Box, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Pagination from 'lib/components/Pagination';
import PropertyCard from 'lib/components/PropertyCard';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PropertyView, UserEnquiry } from 'types/api';

const enquires = ({ data }: { data: any }) => {
  const result = data.value;
 const router = useRouter();
 const isUser = Cookies.get('userIn');
 useEffect(() => {
   if (isUser !== 'true') {
     router.push({ pathname: '/login', query: { from: router.pathname } });
     return;
   }
 });
  return (
    <Box w="90%" mx="auto" mt="3rem">
      <HStack
        w="full"
        h="3rem"
        borderRadius="8px"
        bgColor="brand.50"
        spacing={0}
        align="center"
        p=".2rem"
        mb="2.5rem"
        flex="1 1"
      >
        <PageTabs tabName="listings" tabTitle="My Listings" />
        <PageTabs tabName="enquires" tabTitle="My Enquires" />
        <PageTabs tabName="requests" tabTitle="My Requests" />
      </HStack>
      <>
        {result?.length <= 0 ? (
          <Heading fontSize="16px" lineHeight={1.5}>
            You have not made any enquiries...
          </Heading>
        ) : (
          <Box>
            <Grid
              templateColumns={[
                'repeat(1,1fr)',
                'repeat(1,1fr)',
                'repeat(2,1fr)',
                'repeat(3,1fr)',
              ]}
              columnGap="7"
              rowGap={6}
            >
              {result.map((item: UserEnquiry) => {
                return (
                  <GridItem key={item.id}>
                    <PropertyCard item={item.property as PropertyView} />
                  </GridItem>
                );
              })}
            </Grid>

            <GridItem my="2rem" colStart={1} colEnd={4}>
              <Flex justifyContent="center">
                <Pagination data={data} />
              </Flex>
            </GridItem>
          </Box>
        )}
      </>
    </Box>
  );
};

export default enquires;

export const getServerSideProps: GetServerSideProps = async (ctx) => {


  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (await _dataAccess.get(`/api/User/enquiries/user?${url}`))
      .data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        data: [],
      },
    };
  }
};
