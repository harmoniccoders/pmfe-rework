import BuyPage from 'lib/styles/customTheme/components/Modals/Buy/BuyPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { PropertyModel } from 'types/api';

const buy = ({ data }: { data: PropertyModel[] }) => {
  // console.log({ data });

  return <BuyPage data={data} />;
};

export default buy;

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
    const data = (await _dataAccess.get(`/api/Property/list/sales?${url}`))
      .data;
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
