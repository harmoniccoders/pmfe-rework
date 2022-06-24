import Tenant from 'lib/components/my-rent/Tenant';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { ComplaintsCategory } from 'types/api';

const index = ({
  data,
  category,
}: {
  data: any;
  category: ComplaintsCategory[];
}) => {
  console.log({ data });
  console.log(category);
  return <Tenant data={data} category={category} />;
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { redirect },
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
    const data = (await _dataAccess.get(`/api/Tenancy/user?${url}`)).data;
    const category = (await _dataAccess.get(`/api/Complaints/categories/list`))
      .data;
    return {
      props: {
        data,
        category,
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
