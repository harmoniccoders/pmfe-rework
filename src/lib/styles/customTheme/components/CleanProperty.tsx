import { Grid, GridItem } from '@chakra-ui/react';
import CleanCard from 'lib/components/CleanCard';
import React from 'react';
import { Cleaning } from 'types/api';
import moment from 'moment';

const CleanProperty = ({ requests }: { requests: Cleaning[] }) => {
  console.log(requests);
  return (
    <Grid templateColumns="repeat(3,1fr)" columnGap="8" rowGap={5} my="2rem">
      <>
        {requests.map((item) => {
          return (
            <GridItem key={item.id}>
              <CleanCard
                propertyType={item.buildingType}
                bedroom={item.numberOfBedrooms}
                bathroom={item.numberOfBathrooms}
                floor={item.numberOfFloors}
                data={item}
                date={moment(item.dateCreated).format('Do MMMM YYYY')}
              />
            </GridItem>
          );
        })}
      </>
    </Grid>
  );
};

export default CleanProperty;
