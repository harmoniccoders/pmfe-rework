import axios from 'axios';
import RentPage from 'lib/components/Listings/RentPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyTitle, PropertyType, RentCollectionType, TenantType } from 'types/api';

const myRents = ({
  propertyTitles,
  propertyTypes,
  propertyTenants,
  propertyCollection,
 
  getBanks,
  listings,
}: {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
 
  getBanks: any;
  listings: any;
}) => {
  return (
    <RentPage
      data={listings}
      propertyTypes={propertyTypes}
      propertyTitles={propertyTitles}
      propertyTenants={propertyTenants}
      propertyCollection={propertyCollection} 
      getBanks={getBanks}
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
     const propertyTenants = (
       await _dataAccess.get('/api/Property/tenants/types')
     ).data;
     const propertyCollection = (
       await _dataAccess.get('/api/Property/collection/types')
     ).data;
  

    const listings = (
      await _dataAccess.get(`/api/Property/user/created/rent?${url}`)
    ).data;

    
    const getBanks = await(
      await axios.get(
        'https://raw.githubusercontent.com/tomiiide/nigerian-banks/master/banks.json'
      )
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        propertyTenants,
        propertyCollection,
       
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
