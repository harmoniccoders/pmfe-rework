import { Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import PropertyCard from 'lib/components/PropertyCard';
import React from 'react';
import { PropertyModel } from 'types/api';

type Props = {
  data?: PropertyModel;
};

const ListedProperties = ({ data }: Props) => {
  console.log(data);
  return (
    <Grid
      mt={['40px', 0]}
      // templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
      templateColumns="repeat(4,1fr)"
      rowGap={5}
      columnGap={3}
      w="100%"
      overflow="hidden"
    >
      <GridItem>
        <PropertyCard
          location="lekki phase 1"
          description="7 bedrooms with Olympic size swimmming pool"
          bedroom="7 Bedrooms"
          bathroom="9 Bathrooms"
          price="145M"
        />
      </GridItem>

      <GridItem>
        <PropertyCard
          location="lekki phase 1"
          description="7 bedrooms with Olympic size swimmming pool"
          bedroom="7 Bedrooms"
          bathroom="9 Bathrooms"
          price="145M"
        />
      </GridItem>

      <GridItem>
        <PropertyCard
          location="lekki phase 1"
          description="7 bedrooms with Olympic size swimmming pool"
          bedroom="7 Bedrooms"
          bathroom="9 Bathrooms"
          price="145M"
        />
      </GridItem>

      <GridItem>
        <PropertyCard
          location="lekki phase 1"
          description="7 bedrooms with Olympic size swimmming pool"
          bedroom="7 Bedrooms"
          bathroom="9 Bathrooms"
          price="145M"
        />
      </GridItem>
    </Grid>
  );
};

export default ListedProperties;
// auto-fit, minmax(100%, 300px)

export const getStaticProps = async () => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/api/Property/list`
  );
  const data = result.data.data;

  console.log(data);

  return {
    props: {
      data,
    },
  };
};
