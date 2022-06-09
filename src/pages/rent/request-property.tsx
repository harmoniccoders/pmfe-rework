import axios from 'axios';
import RequestRentPage from 'lib/components/rent/RequestRentPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import React from 'react';
import { PropertyType, PropertyTitle } from 'types/api';

function requestRent({
  propertyTypes,
  getStates,
}: {
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
  getStates: any;
}) {
  return (
    <RequestRentPage propertyTypes={propertyTypes} getStates={getStates} />
  );
}

export default requestRent;
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
    const getStates = (
      await axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
    ).data;

    return {
      props: {
        propertyTypes,
        getStates,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
      },
    };
  }
};
