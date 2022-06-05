import {
  GridItem,
  Grid,
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import PropertyCard from 'lib/components/PropertyCard';
import BuyFilter from 'lib/styles/customTheme/components/BuyFilter';
import ListedProperties from 'lib/styles/customTheme/components/ListedProperties';
import RequestProperty from 'lib/styles/customTheme/components/RequestProperty';
import React from 'react';

type Props = {};

const buy = (props: Props) => {
  return (
    <Box w="100%" mt="30px">
      <Box w="90%" mx="auto">
        <Heading fontSize="16px" lineHeight={1.5}>
          "Find a property to buy with the safety of 103% money back guarantee"
        </Heading>

        <Tabs isFitted mt="40px" variant="unstyled" defaultIndex={0}>
          <TabList bg="brand.50" borderRadius="5px">
            <Tab
              textTransform="capitalize"
              _selected={{
                outline: 'none',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0 0 6px -2px rgba(0,0,0,0.4)',
                color: 'brand.100',
                fontWeight: 600,
              }}
              fontWeight="500"
            >
              listed properties
            </Tab>
            <Tab
              textTransform="capitalize"
              _selected={{
                outline: 'none',
                backgroundColor: 'white',
                borderRadius: '5px',
                boxShadow: '0 0 6px -2px rgba(0,0,0,0.4)',
                color: 'brand.100',
                fontWeight: 600,
              }}
              fontWeight="500"
            >
              request property
            </Tab>
          </TabList>

          <TabPanels mt="20px">
            <TabPanel w="100%" px="0px">
              <Flex width="100%" flexDirection={['column', 'row']}>
                <BuyFilter />
                <ListedProperties />
              </Flex>
            </TabPanel>
            <TabPanel>
              <RequestProperty />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default buy;

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
