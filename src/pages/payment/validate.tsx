import axios from 'axios';
import Validate from 'lib/components/Validate';
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

  if (status == 'cancelled') {
    return {
      redirect: {
        permanent: false,
        destination: '/payment/cancelled',
      },
      props: {},
    };
  }
  try {
    const data = await (
      await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/api/payment/validate/${tx_ref}/${transaction_id}`
      )
    ).data;

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
