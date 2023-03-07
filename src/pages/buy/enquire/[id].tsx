import React from 'react';
import { useRouter } from 'next/router';
import { InspectionDateView, PropertyModel, PaymentRatesView } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { Box } from '@chakra-ui/react';
import SingleEnquiry from 'lib/components/SingleEnquiry';

interface Props {
  data: PropertyModel;
  date?: InspectionDateView;
  paymentRates: PaymentRatesView;
  result: any;
  inspection: any;
}

const index = ({ data, date, paymentRates, inspection, result }: Props) => {
  return (
    <Box mt="30px" py="1rem">
      <SingleEnquiry
        data={data}
        date={date}
        paymentRates={paymentRates}
        isBuy={true}
        isRent={false}
        result={result}
        inspection={inspection}
      />
    </Box>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
    const result = (
      await _dataAccess.get(`/api/Application/get/user/property/${data.id}`)
    ).data;
    const inspection = (
      await _dataAccess.get(
        `/api/Property/inspections/user/property/${data?.id}`
      )
    ).data;

    // console.log({ inspection });

    return {
      props: {
        data,
        date,
        paymentRates,
        result,
        inspection,
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
