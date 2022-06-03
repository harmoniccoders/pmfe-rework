import { GridItem, Grid } from '@chakra-ui/react';
import PropertyCard from 'lib/components/PropertyCard';
import React from 'react';

type Props = {};

const buy = (props: Props) => {
  return (
    <div>buy</div>
    // <div>
    // {
    /* buy
      <Grid
        // templateColumns="repeat()"
        templateColumns="repeat(auto-fit, minmax(100px, 260px))"
        border="2px solid green"
        justifyContent="space-between"
        rowGap={4}
        w="90%"
        mx="auto"
      >
        <GridItem>
          <PropertyCard
            location="lekki phase 2"
            description="the location is okay"
            bedroom="7"
            bathroom="9"
            price="145"
          />
        </GridItem>

        <GridItem>
          <PropertyCard
            location="lekki phase 2"
            description="the location is okay"
            bedroom="7"
            bathroom="9"
            price="145"
          />
        </GridItem>

        <GridItem>
          <PropertyCard
            location="lekki phase 2"
            description="the location is okay"
            bedroom="7"
            bathroom="9"
            price="145"
          />
        </GridItem>

        <GridItem>
          <PropertyCard
            location="lekki phase 2"
            description="the location is okay"
            bedroom="7"
            bathroom="9"
            price="145"
          />
        </GridItem>
      </Grid>
      {/* <PropertyCard />
      <PropertyCard />
      <PropertyCard /> */
    // }
    // </div> */}
  );
};

export default buy;
