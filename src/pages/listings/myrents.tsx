import axios from 'axios';
import RentPage from 'lib/styles/customTheme/components/Listings/RentPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyTitle, PropertyType } from 'types/api';

const myRents = ({
  propertyTitles,
  propertyTypes,
  getStates,
  listings,
}: {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any;
  listings: any;
}) => {
  return (
    <RentPage
      data={listings}
      propertyTypes={propertyTypes}
      propertyTitles={propertyTitles}
      getStates={getStates}
    />
  );
};

export default myRents;

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
    const getStates = (
      await axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
    ).data;

    const listings = (
      await _dataAccess.get(`/api/Property/user/created/rent?${url}`)
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        getStates,
        listings,
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
