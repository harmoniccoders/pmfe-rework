import Cookies from 'js-cookie';
import Landlord from 'lib/components/my-rent/Landlord';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const index = ({ data }: { data: any }) => {
   const router = useRouter();
   const isUser = Cookies.get('userIn');
   useEffect(() => {
     if (isUser !== 'true') {
       router.push({ pathname: '/login', query: { from: router.pathname } });
       return;
     }
   });

  return <Landlord data={data} />;
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  

  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (await _dataAccess.get(`/api/Tenancy/landlord?${url}`)).data;

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
