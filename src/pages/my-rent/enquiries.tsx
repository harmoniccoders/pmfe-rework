import Enquiries from 'lib/components/my-rent/Enquiries';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';

const enquiries = ({ data }: { data: any }) => {
  return <Enquiries data={data} />;
};

export default enquiries;

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
    const data = (await _dataAccess.get(`/api/User/enquiries/user?${url}`))
      .data;

    return {
      props: {
        data,
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
