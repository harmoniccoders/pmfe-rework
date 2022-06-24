import { VStack, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import ApplicationsPage from 'lib/components/my-rent/ApplicationsPage';
import TenantInfo from 'lib/components/TenantInfo';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { Application } from 'types/api';

type Props = {
  data: any;
  params: any;
};
const tenant = ({ data, params }: Props) => {
  const singleId = params[0];
  const result = data.value.filter((x: any) => x.id == singleId)[0];
  // console.log({ result });
  return (
    <>hell</>
    // <ApplicationsPage data={result} />
  );
};

export default tenant;

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
  const { params } = ctx.query;
  const datas = (params as unknown as string)[1];

  try {
    const data = (await _dataAccess.get(`/api/Application/list/${datas}`)).data;

    return {
      props: {
        data,
        params,
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
