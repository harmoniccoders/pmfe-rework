import { Box, SimpleGrid } from '@chakra-ui/react';
import CleanCard from 'lib/components/clean/CleanCard';
import React from 'react';
import { Cleaning } from 'types/api';
import moment from 'moment';

const CleanProperty = ({ requests }: { requests: Cleaning[] }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacingY="8"
      spacingX={5}
      my="2rem"
    >
      <>
        {requests.map((item) => {
          return (
            <Box key={item.id}>
              <CleanCard
                propertyType={item.buildingType}
                bedroom={item.numberOfBedrooms}
                bathroom={item.numberOfBathrooms}
                floor={item.numberOfFloors}
                data={item}
                date={moment(item.dateCreated).format('Do MMMM YYYY')}
              />
            </Box>
          );
        })}
      </>
    </SimpleGrid>
  );
};

export default CleanProperty;
