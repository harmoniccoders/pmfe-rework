import { useState } from 'react';
import { Box, Center, Grid, Stack, Text } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import CustomModal from 'lib/styles/customTheme/components/Modals/CustomModal';
import BookCleaning from 'lib/components/BookCleaning';
import { PropertyType } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import CleanProperty from 'lib/styles/customTheme/components/CleanProperty';
import { returnUserData } from 'lib/Utils/userData';

const clean = ({
  data,
  cleanRequests,
}: {
  data: PropertyType[];
  cleanRequests: any;
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const requests = cleanRequests.value;
  console.log({ data });

  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    setIsopen(true);
  };
  return (
    <Box w="90%" mx="auto" py="4">
      <Grid templateColumns="repeat(3,1fr)" gap={8}>
        <CardButton
          img="/assets/cleanProperty.png"
          title="Book Cleaning Session"
          text="Professional cleaning services"
          onClick={openModal}
        />
      </Grid>
      <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
        Cleaning Session
      </Text>
      {requests.length > 0 ? (
        <CleanProperty requests={requests} />
      ) : (
        <Center h="30vh" fontSize=".9rem">
          You currently have no Cleaning sessions Booked.
        </Center>
      )}

      <CustomModal
        component={<BookCleaning result={data} closeModal={closeModal} />}
        isOpen={isOpen}
        back={true}
        closeModal={closeModal}
      />
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
    const data = (await _dataAccess.get('api/Property/types')).data;
    const cleanRequests = (
      await _dataAccess.get(`/api/Clean/requests/user?${url}`)
    ).data;
    console.log('data', data);
    return {
      props: {
        data,
        cleanRequests,
      },
    };
  } catch (error) {
    return {
      props: {
        data: {},
        cleanRequests: [],
      },
    };
  }
};
