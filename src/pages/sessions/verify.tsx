import axios from 'axios';
import Cookies from 'js-cookie';
import SessionPage from 'lib/components/sessions/CleanSessionPage';
import VerifySession from 'lib/components/sessions/VerifyPageSessions';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const sessions = ({ data }: { data: any }) => {
  const router = useRouter();
  //Redirect user to login and back here when login is successful
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <VerifySession data={data} />;
};

export default sessions;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const {
  //   data: { user, redirect },
  // } = returnUserData(ctx);
  // if (redirect)
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/login',
  //     },
  //     props: {},
  //   };

  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (await _dataAccess.get(`/api/LandSearch/user/list?${url}`))
      .data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
