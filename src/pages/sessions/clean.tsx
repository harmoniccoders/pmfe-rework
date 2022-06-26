import Cookies from 'js-cookie';
import CleanSession from 'lib/components/sessions/CleanSessionPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const cleanSession = ({ cleanRequests }: { cleanRequests: any }) => {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <CleanSession cleanRequests={cleanRequests} />;
};

export default cleanSession;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const cleanRequests = (
      await _dataAccess.get(`/api/Clean/requests/user?${url}`)
    ).data;
    return {
      props: {
        cleanRequests,
      },
    };
  } catch (error) {
    return {
      props: {
        cleanRequests: [],
      },
    };
  }
};
