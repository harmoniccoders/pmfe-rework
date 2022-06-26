import Cookies from 'js-cookie';
import FixSession from 'lib/components/sessions/FixSessionPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const sessions = ({ fix }: { fix: any }) => {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <FixSession fix={fix} />;
};

export default sessions;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const fix = (await _dataAccess.get(`/api/Property?${url}`)).data;

    return {
      props: {
        fix,
      },
    };
  } catch (error) {
    return {
      props: {
        fix: [],
      },
    };
  }
};
