import axios from 'axios';
import RequestPage from 'lib/styles/customTheme/components/Modals/Buy/RequestPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyModel, PropertyType } from 'types/api';

const request = ({
  propertyTypes,
  getStates,
}: {
  propertyTypes: PropertyType[];
  getStates: any;
}) => {
  return <RequestPage propertyTypes={propertyTypes} getStates={getStates} />;
};

export default request;

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
  try {
    const propertyTypes = (await _dataAccess.get('/api/Property/types')).data;
    const propertyTitles = (await _dataAccess.get('/api/Property/titles')).data;
    const getStates = (
      await axios.get('http://locationsng-api.herokuapp.com/api/v1/states')
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        getStates,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
      },
    };
  }
};
