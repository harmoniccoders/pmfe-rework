import RentHelpPage from 'lib/components/rent/RentHelpPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';

const help = ({ result }: { result: any }) => {
  return <RentHelpPage result={result} />;
};

export default help;

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
    const result = (
      await _dataAccess.get(`?${url}`)
    ).data;
    return {
      props: {
        result,
      },
    };
  } catch (error) {
    return {
      props: {
        result: [],
      },
    };
  }
};
