import { Box, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import CardButton from 'lib/components/CardButton';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { returnUserData } from 'lib/Utils/userData';
import { DataAccess } from 'lib/Utils/Api';
import { PropertyType, PropertyTitle } from 'types/api';
import axios from 'axios';
import AddRentModal from 'lib/styles/customTheme/components/Modals/AddRentModal';
import RentoutModal from 'lib/styles/customTheme/components/Modals/RentoutModal';

const rent = ({
  propertyTitles,
  propertyTypes,
  getStates,
  getBanks,
}: {
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
  getStates: any;
  getBanks: any;
}) => {
  // const [isOpen, setIsopen] = useState<boolean>(false);
  const router = useRouter();

  const openRentProperty = () => {
    router.push('/rent/rent-property');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Box w="90%" mx="auto" py="3">
      <Heading fontSize={['lg', '2xl']}>What do you want to do?</Heading>
      <SimpleGrid columns={[1, 2]} mt="5" spacing="5">
        <CardButton
          img="/assets/listProperty.png"
          title="Rent out your property"
          text="Get verified tenants and enjoy hassle-free rent collection"
          onClick={onOpen}
        />
        <CardButton
          img="/assets/findProperty.png"
          title="Rent a property"
          text="Find the perfect property from a wide range of options"
          onClick={openRentProperty}
        />
      </SimpleGrid>

      <RentoutModal isOpen={isOpen} onClose={onClose} openModal={openModal} />
      <AddRentModal
        isOpen={showModal}
        onClose={closeModal}
        isClosed={onClose}
        propertyTypes={propertyTypes}
        propertyTitles={propertyTitles}
        getStates={getStates}
        getBanks={getBanks}
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
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('/api/Property/titles')).data;
    const getStates = (
      await axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
    ).data;

    const getBanks = await (
      await axios.get(
        'https://raw.githubusercontent.com/tomiiide/nigerian-banks/master/banks.json'
      )
    ).data;
    console.log(getBanks);
    return {
      props: {
        propertyTypes,
        propertyTitles,
        getStates,
        getBanks,
      },
    };
  } catch (error) {
    console.log('error');
    return {
      props: {
        propertyTypes: {},
      },
    };
  }
};
