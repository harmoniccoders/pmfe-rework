import { PropertyType } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import CleanPage from 'lib/components/clean/CleanPage';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const clean = ({
  data,
  cleanRequests,
}: {
  data: PropertyType[];
  cleanRequests: any;
}) => {
  const router = useRouter();
  //Redirect user to login and back here when login is successful
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <CleanPage data={data} cleanRequests={cleanRequests} />;
};

export default clean;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (await _dataAccess.get('api/Property/types')).data;
    const cleanRequests = (
      await _dataAccess.get(`/api/Clean/requests/user?${url}`)
    ).data;
    return {
      props: {
        data,
        cleanRequests,
      },
    };
  } catch (error) {
    return {
      props: {
        data: {},
        cleanRequests: [],
      },
    };
  }
};
