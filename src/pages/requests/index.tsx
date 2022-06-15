import { Box, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react';
import Pagination from 'lib/components/Pagination';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import RequestCard from 'lib/styles/customTheme/components/Listings/RequestCards';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyRequestView } from 'types/api';

const request = ({ data }: { data: any }) => {
  const result = data.value;

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
      >
        <PageTabs tabName="listings" tabTitle="My Listings" />
        <PageTabs tabName="enquires" tabTitle="My Enquires" />
        <PageTabs tabName="requests" tabTitle="My Requests" />
      </HStack>
      <>
        {result.length <= 0 ? (
          <Heading fontSize="16px" lineHeight={1.5}>
            Sorry! There's no property at this time please check back later
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
              columnGap="8"
              rowGap={7}
            >
              {result.map((item: PropertyRequestView) => {
                return (
                  <GridItem key={item.id}>
                    <RequestCard item={item} />
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

export default request;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { user, redirect },
  } = returnUserData(ctx);
  if (redirect)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };

  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (
      await _dataAccess.get(`/api/PropertyRequest/list/user?${url}`)
    ).data;

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
