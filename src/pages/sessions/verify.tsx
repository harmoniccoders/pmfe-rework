import axios from 'axios';
import SessionPage from 'lib/components/sessions/CleanSessionPage';
import VerifySession from 'lib/components/sessions/VerifyPageSessions';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';

const sessions = ({ data }: { data: any }) => {
  return <VerifySession data={data} />;
};

export default sessions;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { user, redirect },
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
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {

    const data = (
      await _dataAccess.get(`?${url}`)
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
