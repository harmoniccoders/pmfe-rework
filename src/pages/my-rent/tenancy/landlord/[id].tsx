import Cookies from 'js-cookie';
import LandlordOptions from 'lib/components/my-rent/landlord/LandlordOptions';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function SinglePropertyForLandlord({ data, id }: any) {
  const singles = data.filter((x: any) => x.id == id)[0];
  // console.log({data})

  const router = useRouter();
  const isUser = Cookies.get('userIn');

  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <LandlordOptions singles={singles} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);

  const { id } = ctx.query;

  try {
    const data = (await _dataAccess.get(`/api/Tenancy/landlord`)).data;

    return {
      props: {
        data,
        id,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        data: [],
      },
    };
  }
};
