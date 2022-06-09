import BuyPage from 'lib/styles/customTheme/components/Modals/Buy/BuyPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { PropertyModel } from 'types/api';

const buy = ({ data }: { data: PropertyModel[] }) => {
  return <BuyPage data={data} />;
};

export default buy;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=25&offset=0';
  try {
    const data = (await _dataAccess.get(`/api/Property/list?${url}`)).data;
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
