import ListingsCard from './ListingsCard'
import { Tabs, Grid, Box, TabList, Text, TabPanels, Tab, TabPanel, useDisclosure, GridItem } from '@chakra-ui/react'
import {
    PropertyModel,
    PropertyTitle,
    PropertyType,
    PropertyView,
  } from 'types/api';
  import EditPropertyModal from 'lib/styles/customTheme/components/EditPropertyModal';
  import { useState } from 'react';

const List =({
    propertyTitles,
    propertyTypes,
    getStates,
    data,
  }: {
    propertyTitles: PropertyType[];
    propertyTypes: PropertyTitle[];
    getStates: any;
    data: PropertyView[];
  })=>{

const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  // const result = listings.value.filter(
  //   (property: PropertyView) => !property.isDraft
  // );



    return(
        <>
        {/* <Tabs isFitted >
            <TabList mb='1em' borderBottom='none'>
                <Tab borderBottom='none'>One</Tab>
                <Tab borderBottom='none'>Two</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs> */}
        <Box>
          <Text fontWeight="bold" my='2rem' mx='5rem' color="brand.100" fontSize="lg">
            My Listings
          </Text>
            <Grid templateColumns="repeat(4,1fr)"  columnGap="3" rowGap={5}>
                <>
                {data.map((item: PropertyView) => {
                    return (
                    <>
                        <GridItem key={item.id}>
                        <ListingsCard item={item} openModal={openModal} />
                        </GridItem>
                        <EditPropertyModal
                        item={item as PropertyModel}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        propertyTypes={propertyTypes}
                        propertyTitles={propertyTitles}
                        getStates={getStates}
                        />
                    </>
                    );
                })}
                </>
            </Grid>
        </Box>
            
        </>
    )
}

export default List;