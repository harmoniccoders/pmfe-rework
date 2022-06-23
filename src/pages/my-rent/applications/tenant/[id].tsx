import { VStack, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import ApplicationsPage from 'lib/components/my-rent/ApplicationsPage';
import TenantInfo from 'lib/components/TenantInfo';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { Application } from 'types/api';

type Props = {
    data: Application;
    id: number
};
const tenant = ({ data, id }: Props) => {
    // let result = data.filter((item: any) => item.id == id);
 
  console.log({ data });
  return (
    <>hell</>
    // <ApplicationsPage data={data} />
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
  const id = ctx.params?.id;

  try {
    const data = (await _dataAccess.get(`/api/Application/list/${id}`)).data;

    return {
      props: {
        data,
        id,
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
