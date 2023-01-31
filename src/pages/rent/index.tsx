import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import {
  PropertyType,
  PropertyTitle,
  TenantType,
  RentCollectionType,
} from 'types/api';
import axios from 'axios';
import RentsPage from 'lib/components/rent/RentsPage';

const rent = ({
  propertyTitles,
  propertyTypes,
  getBanks,
  propertyTenants,
  propertyCollection,
}: {
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];

  getBanks: any;
}) => {
  return (
    <RentsPage
      propertyTypes={propertyTypes}
      propertyTitles={propertyTitles}
      getBanks={getBanks}
      propertyTenants={propertyTenants}
      propertyCollection={propertyCollection}
    />
  );
};

export default rent;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

    const getBanks = await (
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
        getBanks,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: [],
      },
    };
  }
};
