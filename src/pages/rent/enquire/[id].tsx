import React from 'react';
import { InspectionDateView, PaymentRatesView, PropertyModel } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { Box } from '@chakra-ui/react';
import SingleEnquiry from 'lib/components/SingleEnquiry';
import { returnUserData } from 'lib/Utils/userData';

interface Props {
  data: PropertyModel;
  date?: InspectionDateView;
  paymentRates: PaymentRatesView;
}

const index = ({ data, date, paymentRates }: Props) => {
 
  return (
    <Box mt="30px" py="1rem">
      <SingleEnquiry paymentRates={paymentRates} data={data} date={date} />
    </Box>
  );
};

export default index;

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
  const id = ctx.params?.id;

  try {
    const data = (await _dataAccess.get(`/api/Property/get/${id}`)).data;
    const paymentRates = (await _dataAccess.get(`/api/Payment/rates/${id}`))
      .data;
    
    const date = (
      await _dataAccess.get(`/api/Property/inspectiondates/list/${id}`)
    ).data;
    return {
      props: {
        paymentRates,
        data,
        date,
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
