import { Grid } from '@chakra-ui/react';
import React from 'react';
import { ComplaintsCategory } from 'types/api';
import TenancyCard from './TenancyCard';

type Props = {
  category: ComplaintsCategory[];
  data: any;
};

const MyTenancy = ({ category, data }: Props) => {
  return (
    <Grid
      width="100%"
      templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)', 'repeat(3,1fr)']}
      columnGap={6}
      rowGap={8}
      mt="25px"
    >
      {data.map((item: any) => {
        return <TenancyCard category={category} data={item} key={item.id} />;
      })}
    </Grid>
  );
};

export default MyTenancy;
