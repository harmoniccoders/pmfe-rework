import axios from 'axios';
import Cookies from 'js-cookie';
import Profile from 'lib/components/Profile';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function profile({ data }: any) {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <Profile getBanks={data} />;
}

export default profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await (
      await axios.get(
        'https://raw.githubusercontent.com/tomiiide/nigerian-banks/master/banks.json'
      )
    ).data;

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
