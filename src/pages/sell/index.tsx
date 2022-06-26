import { PropertyTitle, PropertyType } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import SellPage from 'lib/components/sell/SellPage';
import router from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const sell = ({
  propertyTitles,
  propertyTypes,
  listings,
}: {
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  listings: any;
}) => {
  const data = listings.value;

  //Redirect user to login and back here when login is successful
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
      listings={listings}
    />
  );
};

export default sell;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('/api/Property/titles')).data;

    const listings = (
      await _dataAccess.get(`/api/Property/user/created/sale?${url}`)
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
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
