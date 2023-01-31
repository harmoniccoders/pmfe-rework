import { Grid, GridItem, Heading } from '@chakra-ui/react';
import PropertyCard from 'lib/components/PropertyCard';
import React from 'react';
import { PropertyView } from 'types/api';

const ListedProperties = ({ result }: { result: PropertyView[] }) => {
  return (
    <Grid
      templateColumns={[
        'repeat(1,1fr)',
        'repeat(1,1fr)',
        'repeat(1,1fr)',
        'repeat(1,1fr)',
        'repeat(3,1fr)',
      ]}
      columnGap="5"
      rowGap={5}
      width="100%"
    >
      <>
        {result.map((item) => {
          return (
            <GridItem key={item.id}>
              <PropertyCard item={item} />
            </GridItem>
          );
        })}
      </>
    </Grid>
  );
};

export default ListedProperties;
