import ListedRentPage from 'lib/components/rent/ListedRentPage';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { PropertyModel } from 'types/api';

const listedRent = ({ data }: { data: PropertyModel[] }) => {
  return <ListedRentPage data={data} />;
};

export default listedRent;

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
