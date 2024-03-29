import axios from 'axios';
import ListPage from 'lib/components/Listings/Listings';
import BuyPage from 'lib/components/Buy/BuyPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyModel, PropertyTitle, PropertyType } from 'types/api';

const listings = ({
  propertyTitles,
  propertyTypes,
  listings,
  getBanks,
}: {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getBanks: any[];
  listings: any;
}) => {
  return (
    <ListPage
      data={listings}
      propertyTypes={propertyTypes}
      propertyTitles={propertyTitles}
      getBanks={getBanks}
    />
  );
};

export default listings;

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
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('/api/Property/titles')).data;

    const listings = (
      await _dataAccess.get(`/api/Property/user/created/sale?${url}`)
    ).data;
    const getBanks = await (
      await axios.get(
        'https://raw.githubusercontent.com/tomiiide/nigerian-banks/master/banks.json'
      )
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        listings,
        getBanks,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        listings: [],
      },
    };
  }
};
