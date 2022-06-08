import { Box, Grid, GridItem, SimpleGrid, Heading } from '@chakra-ui/react';
import PropertyCard from 'lib/components/PropertyCard';
import React from 'react';
import { PropertyModel } from 'types/api';

const ListedProperties = ({ data }: { data: PropertyModel[] }) => {
  console.log(data);
  return (
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
        {data.length <= 0 ? (
          <Heading fontSize="16px" lineHeight={1.5}>
            Find a property to buy with the safety of 103% money back guarantee
          </Heading>
        ) : (
          <>
            {data.map((item) => {
              return (
                <GridItem key={item.id}>
                  <PropertyCard item={item} />
                </GridItem>
              );
            })}
          </>
        )}
      </>
    </Grid>
  );
};

export default ListedProperties;

// location={item.area}
//                 description={item.name}
//                 title={item.title}
//                 bedroom={item.numberOfBedrooms}
//                 bathroom={item.numberOfBathrooms}
//                 price={item.price
//                   .toString()
//                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                 sellMyself={item.sellMyself}
//                 overview={item.description}
