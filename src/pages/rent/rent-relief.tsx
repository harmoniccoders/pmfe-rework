import ReliefPage from 'lib/components/rent/ReliefPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { PropertyModel } from 'types/api';

const relief = ({ data }: { data: PropertyModel[] }) => {
  return <ReliefPage data={data} />;
};

export default relief;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url, search, filter } = ctx.query;
  if (url == '' || undefined || null) {
    url = 'limit=6&offset=0&';
  }
  url = url ?? 'limit=6&offset=0&';

  if (search) {
    url = `${url}search=${search}`;
  }
  if (filter) {
    url = `${url}filter=${filter}`;
  }

  try {
    const data = (await _dataAccess.get(`/api/Property/list/rent?${url}`)).data;
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
