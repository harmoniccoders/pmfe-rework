import Cookies from 'js-cookie';
import Tenant from 'lib/components/my-rent/Tenant';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ComplaintsCategory } from 'types/api';

const index = ({
  data,
  category,
}: {
  data: any;
  category: ComplaintsCategory[];
}) => {
 const router = useRouter();
 const isUser = Cookies.get('userIn');
 useEffect(() => {
   if (isUser !== 'true') {
     router.push({ pathname: '/login', query: { from: router.pathname } });
     return;
   }
 });
  return <Tenant data={data} category={category} />;
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (await _dataAccess.get(`/api/Tenancy/user?${url}`)).data;
    const category = (await _dataAccess.get(`/api/Complaints/categories/list`))
      .data;
    return {
      props: {
        data,
        category,
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
