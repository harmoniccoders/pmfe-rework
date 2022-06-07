import { Box, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import PropertyCard from 'lib/components/PropertyCard';
import React from 'react';
import { PropertyModel } from 'types/api';

const ListedProperties = ({ data }: { data: PropertyModel[] }) => {
  console.log(data);
  return (
    <Grid templateColumns="repeat(3,1fr)" columnGap="3" rowGap={5}>
      <>
        {data.map((item) => {
          return (
            <GridItem key={item.id}>
              <PropertyCard
                id={item.id as number}
                location={item.area}
                description={item.name}
                title={item.title}
                bedroom={item.numberOfBedrooms}
                bathroom={item.numberOfBathrooms}
                price={item.price}
              />
            </GridItem>
          );
        })}
      </>
    </Grid>
  );
};

export default ListedProperties;
