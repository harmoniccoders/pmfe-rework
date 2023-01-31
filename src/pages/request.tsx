import axios from 'axios';
import Cookies from 'js-cookie';
import RequestPage from 'lib/components/Buy/RequestPage';
import { DataAccess } from 'lib/Utils/Api';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PropertyType } from 'types/api';

const request = ({ propertyTypes }: { propertyTypes: PropertyType[] }) => {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <RequestPage propertyTypes={propertyTypes} />;
};

export default request;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  try {
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('/api/Property/titles')).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: [],
      },
    };
  }
};
