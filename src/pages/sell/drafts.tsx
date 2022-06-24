import { Box, Center, Grid, Text, GridItem, Flex } from '@chakra-ui/react';
import { PropertyTitle, PropertyType, PropertyView } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import axios from 'axios';
import ListingsCard from 'lib/components/ListingsCard';
import router from 'next/router';

const drafts = ({
  propertyTitles,
  propertyTypes,
  getStates,
  listings,
}: {
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  getStates: any;
  listings: any;
}) => {
  const result = listings.value;

  return (
    <Box w="90%" mx="auto" py="4">
      {result.length > 0 ? (
        <Box>
          <Flex justify="space-between" align="center" my="8">
            <Text fontWeight="bold" color="brand.100" fontSize="lg">
              My Drafts
            </Text>
          </Flex>

          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(3,1fr)']}
            columnGap={['4', '8']}
            rowGap={5}
          >
            <>
              {result.map((item: PropertyView) => {
                return (
                  <>
                    <GridItem key={item.id}>
                      <ListingsCard
                        item={item}
                        propertyTypes={propertyTypes}
                        propertyTitles={propertyTitles}
                        getStates={getStates}
                        propertyTenants={[]}
                        propertyCollection={[]}
                      />
                    </GridItem>
                  </>
                );
              })}
            </>
          </Grid>
        </Box>
      ) : (
        <Center h="30vh" fontSize=".9rem">
          You have no property saved in draft.
        </Center>
      )}
    </Box>
  );
};

export default drafts;
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
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('/api/Property/titles')).data;
    const getStates = (
      await axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
    ).data;

    const listings = (await _dataAccess.get(`/api/Property/user/drafts?${url}`))
      .data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        getStates,
        listings,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        listings: [],
      },
    };
  }
};
