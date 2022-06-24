import LandlordOptions from 'lib/components/landlord/LandlordOptions';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import React from 'react';

function SinglePropertyForLandlord({ data, singleProperty }: any) {
  const singles = data.filter((x: any) => x.id == singleProperty);
  return <LandlordOptions singles={singles} />;
}

export default SinglePropertyForLandlord;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { redirect },
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
  const { singleProperty } = ctx.query;

  try {
    const data = (
      await _dataAccess.get(`/api/Tenancy/landlord?${singleProperty}`)
    ).data;

    return {
      props: {
        data,
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
