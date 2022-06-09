import axios from 'axios';
import FixSession from 'lib/components/sessions/FixSessionPage';
import SessionPage from 'lib/components/sessions/CleanSessionPage';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { PropertyModel, PropertyTitle, PropertyType } from 'types/api';

const sessions = ({
  fix,
}: {

  fix: any;
}) => {
  return (
    <FixSession
      fix={fix}
    />
  );
};

export default sessions;

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

    const fix = (
      await _dataAccess.get(`/api/Property?${url}`)
    ).data;
    
    return {
      props: {
        fix,
      },
    };
  } catch (error) {
    return {
      props: {
      
        fix: [],
      },
    };
  }
};
