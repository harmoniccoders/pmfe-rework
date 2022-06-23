import React from 'react';
import { useRouter } from 'next/router';
import { InspectionDateView, PropertyModel } from 'types/api';
import { GetServerSideProps } from 'next';
import { DataAccess } from 'lib/Utils/Api';
import { Box } from '@chakra-ui/react';
import SingleEnquiry from 'lib/components/SingleEnquiry';
import { returnUserData } from 'lib/Utils/userData';

interface Props {
  data: PropertyModel;
  date?: InspectionDateView;
}

const index = ({ data, date }: Props) => {
  // const router = useRouter();

  return (
    <Box mt="30px" py="1rem">
      <SingleEnquiry data={data} date={date} />
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
    const date = (
      await _dataAccess.get(`/api/Property/inspectiondates/list/${id}`)
    ).data;
    return {
      props: {
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
