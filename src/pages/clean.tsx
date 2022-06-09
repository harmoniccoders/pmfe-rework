import { PropertyType } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import CleanPage from 'lib/components/clean/CleanPage';

const clean = ({
  data,
  cleanRequests,
}: {
  data: PropertyType[];
  cleanRequests: any;
}) => {
 
  return <CleanPage data={data} cleanRequests={cleanRequests} />;
};

export default clean;

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
