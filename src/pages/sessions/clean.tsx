import CleanSession from 'lib/components/sessions/CleanSessionPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';

const sessions = ({ cleanRequests }: { cleanRequests: any }) => {
  return <CleanSession cleanRequests={cleanRequests} />;
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
