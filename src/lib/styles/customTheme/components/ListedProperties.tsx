import { Box, Grid, GridItem, SimpleGrid, Heading } from '@chakra-ui/react';
import PropertyCard from 'lib/components/PropertyCard';
import React from 'react';
import { PropertyModel, PropertyView } from 'types/api';

const ListedProperties = ({ searched }: { searched: PropertyView[] }) => {
  // console.log(data);
  // console.log({ searched });

  return (
    <>
      {searched?.length <= 0 ? (
        <Heading fontSize="16px" lineHeight={1.5}>
          Sorry! There's no property at this time please check back later
        </Heading>
      ) : (
        <Grid
          templateColumns={[
            'repeat(1,1fr)',
            'repeat(1,1fr)',
            'repeat(2,1fr)',
            'repeat(3,1fr)',
          ]}
          columnGap="3"
          rowGap={5}
        >
          <>
            {searched.map((item) => {
              return (
                <GridItem key={item.id}>
                  <PropertyCard item={item} />
                </GridItem>
              );
            })}
          </>
        </Grid>
      )}
    </>
  );
};

export default ListedProperties;
