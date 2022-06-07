import {
  Box,
  Button,
  Center,
  Grid,
  Stack,
  Text,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { PropertyTitle, PropertyType } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import AddPropertyModal from 'lib/styles/customTheme/components/Modals/AddPropertyModal';
import axios from 'axios';

const clean = ({
  propertyTitles,
  propertyTypes,
  getStates,
  cleanRequests,
}: {
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
  getStates: any;
  cleanRequests: any;
}) => {
  // const requests = cleanRequests.value;
  console.log({ propertyTitles });
  console.log({ propertyTypes });
  console.log({ getStates });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="90%" mx="auto" py="4">
      <Grid templateColumns="repeat(1, 1fr)" w="100%" h="100%">
        <Stack alignItems="center" justifyContent="center" spacing={[3, 6]}>
          <Box
            w={['90%', '35vw']}
            h={['30vh', '35vh']}
            // bg="#ccc"
            my={['2rem', '5rem']}
            mx={['.53rem', '1.3rem']}
            borderRadius="8px"
          >
            <Image src="/assets/admin.png" />
          </Box>
          <Text>You have no current property listed for sale.</Text>

          <Button
            bg="brand.100"
            onClick={onOpen}
            // width="30%"Fw
            color="#fff"
            borderRadius="8px"
          >
            + &nbsp; Add Property
          </Button>
        </Stack>
        <AddPropertyModal
          isOpen={isOpen}
          onClose={onClose}
          propertyTypes={propertyTypes}
          propertyTitles={propertyTitles}
          getStates={getStates}
        />
      </Grid>
    </Box>
  );
};

export default clean;

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

    const cleanRequests = (
      await _dataAccess.get(`/api/Clean/requests/user?${url}`)
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        getStates,
        cleanRequests,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        cleanRequests: [],
      },
    };
  }
};
