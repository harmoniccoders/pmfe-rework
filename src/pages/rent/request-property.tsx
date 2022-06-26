import Cookies from 'js-cookie';
import RequestRentPage from 'lib/components/rent/RequestRentPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { PropertyType, PropertyTitle } from 'types/api';

function requestRent({
  propertyTypes,
}: {
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
}) {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <RequestRentPage propertyTypes={propertyTypes} />;
}

export default requestRent;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;

    return {
      props: {
        propertyTypes,
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
