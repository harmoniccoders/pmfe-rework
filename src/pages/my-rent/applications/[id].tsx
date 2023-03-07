import Cookies from 'js-cookie';
import ApplicationsPage from 'lib/components/my-rent/ApplicationsPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Application } from 'types/api';

type Props = {
  data: Application;
};
const applications = ({ data }: Props) => {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <ApplicationsPage data={data} />;
};

export default applications;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  const id = ctx.params?.id;

  try {
    const data = (await _dataAccess.get(`/api/Application/list/${id}`)).data;
    // const property = (
    //   await _dataAccess.get(`/api/Property/get/${data.property?.id}`)
    // ).data;
    // console.log({ data: data.value });

    return {
      props: {
        data,
        // property,
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
