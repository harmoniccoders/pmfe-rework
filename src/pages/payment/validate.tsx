import axios from 'axios';
import Cookies from 'js-cookie';
import Validate from 'lib/components/Validate';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { Transaction } from 'types/api';

function validate({ data }: { data: Transaction }) {
  return <Validate data={data} />;
}

export default validate;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tx_ref = ctx.query.tx_ref;
  const transaction_id = ctx.query.transaction_id;
  const status = ctx.query.status;
  const bearer = `Bearer ${Cookies.get('token')}`;
  const _dataAccess = new DataAccess(bearer);
  // console.log({ tx_ref, transaction_id, status });

  if (status == 'cancelled') {
    return {
      redirect: {
        permanent: false,
        destination: '/payment/cancelled',
      },
    };
  }
  if (status == 'failed') {
    return {
      redirect: {
        permanent: false,
        destination: '/payment/cancelled',
      },
    };
  }
  try {
    const data = await (
      await _dataAccess.get(`/api/payment/validate/${tx_ref}/${transaction_id}`)
    ).data;
    // console.log({ data });

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
