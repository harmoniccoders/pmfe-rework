import {
  Box,
  Button,
  Center,
  Grid,
  Stack,
  Text,
  Image,
  useDisclosure,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  PropertyView,
} from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import AddPropertyModal from 'lib/styles/customTheme/components/Modals/AddPropertyModal';
import axios from 'axios';
import ListingsCard from 'lib/components/ListingsCard';
import EditPropertyModal from 'lib/styles/customTheme/components/EditPropertyModal';
import { useState } from 'react';

const sell = ({
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
  // const requests = cleanRequests.value;
  // console.log({ propertyTitles });
  // console.log({ propertyTypes });
  // console.log({ getStates });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const result = listings.value.filter(
    (property: PropertyView) => !property.isDraft
  );
  console.log({ result });

  return (
    <Box w="90%" mx="auto" py="4">
      {result.length > 0 ? (
        <Box>
          <Flex justify="space-between" align="center" my="8">
            <Text fontWeight="bold" color="brand.100" fontSize="lg">
              My Listings
            </Text>
            <Button
              bg="brand.100"
              onClick={onOpen}
              height="3rem"
              color="#fff"
              borderRadius="8px"
            >
              + &nbsp; Add Property
            </Button>
          </Flex>

          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(3,1fr)']}
            columnGap="8"
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
                      />
                    </GridItem>
                  </>
                );
              })}
            </>
          </Grid>
        </Box>
      ) : (
        <Grid templateColumns="repeat(1, 1fr)" w="100%" h="100%">
          <Stack alignItems="center !important" justifyContent="center !important" spacing={[3, 6]}>
            <Box
              w={['90%','100%', '75%']}
              h={['100%','100%', '75%']}
              mx={['.53rem', '1.3rem']}
              borderRadius="8px"
              justifyContent="center !important" 
              alignItems="center !important"
            >
              <Center><Image src="/assets/admin.png"  w={['100%', '35vw']}
              h='100%' /></Center>
            </Box>
            <Text>You have no current property listed for sale.</Text>

            <Button
              bg="brand.100"
              onClick={onOpen}
              // width="30%"Fw
              color="#fff" p='1.5rem'
              borderRadius="8px"
            >
              + &nbsp; Add Property
            </Button>
          </Stack>
        </Grid>
      )}
      <AddPropertyModal
        isOpen={isOpen}
        onClose={onClose}
        propertyTypes={propertyTypes}
        propertyTitles={propertyTitles}
        getStates={getStates}
      />
    </Box>
  );
};

export default sell;
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

    const listings = (
      await _dataAccess.get(`/api/Property/user/created/sale?${url}`)
    ).data;

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
