import {
  Grid,
  Text,
  Stack,
  Box,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { returnUserData } from 'lib/Utils/userData';
import { DataAccess } from 'lib/Utils/Api';
import { PropertyTitle, PropertyType } from 'types/api';
import AddPropertyModal from 'lib/styles/customTheme/components/Modals/AddPropertyModal';
import axios from 'axios';

const sell = ({
  propertyTitles,
  data,
  getStates,
}: {
  propertyTitles: PropertyTitle[];
  data: PropertyType[];
  getStates: any[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log({ data });

  return (
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

        <Button bg="brand.100" onClick={onOpen} color="#fff" borderRadius="8px">
          + &nbsp; Add Property
        </Button>
      </Stack>
      <AddPropertyModal
        isOpen={isOpen}
        onClose={onClose}
        propertyTypes={data}
        propertyTitles={propertyTitles}
        getStates={getStates}
      />
    </Grid>
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
    const data = (await _dataAccess.get('api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('api/Property/titles')).data;
    const getStates = (
      await axios.get('https://locationsng-api.herokuapp.com/api/v1/states')
    ).data;
    console.log({ data });

    const listings = (
      await _dataAccess.get(`/api​/Property​/user​/created?${url}`)
    ).data;

    return {
      props: {
        data,
        propertyTitles,
        getStates,
        listings,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        propertyTitles: {},
        getStates: [],
        listings: [],
      },
    };
  }
};
