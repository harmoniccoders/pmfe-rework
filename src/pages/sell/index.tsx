import { PropertyTitle, PropertyType, PropertyView } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import axios from 'axios';
import SellPage from 'lib/components/sell/SellPage';
import { useDisclosure } from '@chakra-ui/react';
import router from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = listings.value;
  console.log({ data });

  const result = data?.filter((property: PropertyView) => !property.isDraft);

  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return (
    <SellPage
      propertyTitles={propertyTitles}
      propertyTypes={propertyTypes}
      getStates={getStates}
      listings={listings}
    />
  );
};

export default sell;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const {
  //   data: { user, redirect },
  // } = returnUserData(ctx);

  // if (redirect)
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/login',
  //     },
  //     props: {},
  //   };

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
