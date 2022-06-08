import ListingsCard from './ListingsCard'
import { Tabs, Grid, Box, TabList, TabPanels, Tab, TabPanel, useDisclosure } from '@chakra-ui/react'
import {
    PropertyModel,
    PropertyTitle,
    PropertyType,
    PropertyView,
  } from 'types/api';
  import { GetServerSideProps } from 'next';
  import { DataAccess } from 'lib/Utils/Api';
  import { returnUserData } from 'lib/Utils/userData';
  import AddPropertyModal from 'lib/styles/customTheme/components/Modals/AddPropertyModal';
  import axios from 'axios';
  import EditPropertyModal from 'lib/styles/customTheme/components/EditPropertyModal';
  import { useState } from 'react';

const List =({
    propertyTitles,
    propertyTypes,
    getStates,
    listings,
  }: {
    propertyTitles: PropertyType[];
    propertyTypes: PropertyTitle[];
    getStates: any;
    listings: any;
  })=>{

const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const result = listings.value.filter(
    (property: PropertyView) => !property.isDraft
  );



    return(
        <>
        <Tabs isFitted >
            <TabList mb='1em' borderBottom='none'>
                <Tab borderBottom='none'>One</Tab>
                <Tab borderBottom='none'>Two</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                    <Grid templateColumns="repeat(4,1fr)" columnGap="3" rowGap={5}>
                        <>
                        {result.map((item: PropertyView) => {
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
                </TabPanel>
                <TabPanel>
                <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
            
        </>
    )
}

export default List;