import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import CustomModal from 'lib/styles/customTheme/components/Modals/CustomModal';
import Rentout from 'lib/components/Rentout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { returnUserData } from 'lib/Utils/userData';
import { DataAccess } from 'lib/Utils/Api';
import { PropertyType } from 'types/api';
import axios from 'axios';

const rent = ({
  propertyTypes,
  propertyTitle,
  states,
}: {
  propertyTypes: PropertyType[];
  propertyTitle: PropertyType[];
  states: any[];
}) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const router = useRouter();
  // const requests = cleanRequests.value;
  const openRentProperty = () => {
    router.push('/rent/rentProperty');
  };

  const closeModal = () => {
    setIsopen(false);
  };
  const openModal = () => {
    setIsopen(true);
  };
  return (
    <Box w="90%" mx="auto" py="3">
      <Heading fontSize={['lg', '2xl']}>What do you want to do?</Heading>
      <SimpleGrid columns={[1, 2]} mt="5" spacing="5">
        <CardButton
          img="/assets/listProperty.png"
          title="Rent out your property"
          text="Get verified tenants and enjoy hassle-free rent collection"
          onClick={openModal}
        />
        <CardButton
          img="/assets/findProperty.png"
          title="Rent a property"
          text="Find the perfect property from a wide range of options"
          onClick={openRentProperty}
        />
      </SimpleGrid>
      <CustomModal
        component={
          <Rentout
            propertyTypesData={propertyTypes}
            propertyTitleData={propertyTitle}
            statesData={states}
          />
        }
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default rent;

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
    const propertyTypes = (await _dataAccess.get('api/Property/types')).data;
    const propertyTitle = (await _dataAccess.get('api/Property/titles')).data;
    const states = await (await axios.get(
      'https://locationsng-api.herokuapp.com/api/v1/states'
    )).data;

    return {
      props: {
        propertyTypes,
        propertyTitle,
        states,
      },
    };
  } catch (error) {
    // console.log(error.message);
    return {
      props: {
        propertyTypes: {},
        propertyTitle: {},
        states: [],
      },
    };
  }
};
