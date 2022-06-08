import { Box, Flex, Grid, GridItem, Heading, HStack } from '@chakra-ui/react';
import axios from 'axios';
import Pagination from 'lib/components/Pagination';
import PropertyCard from 'lib/components/PropertyCard';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import ListedProperties from 'lib/styles/customTheme/components/ListedProperties';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyView, UserEnquiry } from 'types/api';

const matches = ({ data }: { data: any }) => {
  const result = data.value;
  console.log({ result });

  return (
    <Box w="90%" mx="auto" mt="3rem">
      <>
        {result.length <= 0 ? (
          <Heading fontSize="16px" lineHeight={1.5}>
            Sorry! There's no property at this time please check back later
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
              {result.map((item: UserEnquiry) => {
                return (
                  <GridItem key={item.id}>
                    <PropertyCard item={item.property as PropertyView} />
                  </GridItem>
                );
              })}
            </>
            <GridItem my="2rem" colStart={1} colEnd={4}>
              <Flex justifyContent="center">
                <Pagination data={data} />
              </Flex>
            </GridItem>
          </Grid>
        )}
      </>
    </Box>
  );
};

export default matches;

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
  console.log(ctx.params);

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
