import { Grid } from '@chakra-ui/react';
import React from 'react';
import TenancyCard from './TenancyCard';

type Props = {};

const MyTenancy = (props: Props) => {
  return (
    <Grid
      width="100%"
      templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)', 'repeat(3,1fr)']}
      columnGap={6}
      rowGap={8}
      mt="25px"
    >
      <TenancyCard />
      <TenancyCard />
      <TenancyCard />
      <TenancyCard />
    </Grid>
  );
};

export default MyTenancy;
