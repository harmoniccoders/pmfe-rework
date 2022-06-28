import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import PropertyCard from 'lib/components/PropertyCard';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PropertyRequestMatch, PropertyView } from 'types/api';

const matches = ({ data, id }: { data: any; id: any }) => {
  let result = data.value.filter((item: any) => item.id == id);

  const singleRequest = result[0].matches;

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
      <>
        {singleRequest.length <= 0 ? (
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
              {singleRequest.map((item: PropertyRequestMatch) => {
                return (
                  <GridItem key={item.id}>
                    <PropertyCard
                      matchId={item.id}
                      item={item.property as PropertyView}
                    />
                  </GridItem>
                );
              })}
            </>
          </Grid>
        )}
      </>
    </Box>
  );
};

export default matches;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);

  let { url, id } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (
      await _dataAccess.get(`/api/PropertyRequest/list/user?${url}`)
    ).data;

    return {
      props: {
        id,
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
