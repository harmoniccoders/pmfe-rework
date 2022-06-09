import axios from 'axios';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyTitle, PropertyType } from 'types/api';
import MyRequests from 'lib/components/my-rent/MyRequests';

const requests = ({
  propertyTitles,
  propertyTypes,
  getStates,
  sessions,
}: {
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getStates: any;
  sessions: any;
}) => {
  return (
    <MyRequests
      data={sessions}
      propertyTypes={propertyTypes}
      propertyTitles={propertyTitles}
      getStates={getStates}
    />
  );
};

export default requests;

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

    const sessions = (
      await _dataAccess.get(`/api/Property/user/created/sale?${url}`)
    ).data;

    return {
      props: {
        propertyTypes,
        propertyTitles,
        getStates,
        sessions,
      },
    };
  } catch (error) {
    return {
      props: {
        propertyTypes: {},
        sessions: [],
      },
    };
  }
};
