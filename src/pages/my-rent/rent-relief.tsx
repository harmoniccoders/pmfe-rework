import { DataAccess } from 'lib/Utils/Api';

import { GetServerSideProps } from 'next';
import RentRelief from 'lib/components/my-rent/RentRelief';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const rentRelief = ({ data }: { data: any }) => {
   const router = useRouter();
   const isUser = Cookies.get('userIn');
   useEffect(() => {
     if (isUser !== 'true') {
       router.push({ pathname: '/login', query: { from: router.pathname } });
       return;
     }
   });
  
  return <RentRelief data={data} />;
};

export default rentRelief;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = await _dataAccess.get(`/api/Relief/user?${url}`);

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
