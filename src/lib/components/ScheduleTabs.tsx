import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import DateSliders from './DateSliders';
import { InspectionDateView, PropertyView } from 'types/api';

type Props = {
  date?: InspectionDateView | undefined;
  item?: PropertyView;
  close: any;
  
};

const ScheduleTabs = ({ date, item, close }: Props) => {
  return (
    <>
      <Tabs isFitted variant="enclosed" width="100%" defaultIndex={0}>
        <TabList bg="brand.50" borderRadius="6px" p="1px">
          <Tab
            _selected={{
              color: 'brand.100',
              bg: 'white',
              boxShadow: '0 0 4px -2px rgba(0,0,0,0.4)',
              borderRadius: '6px',
              fontWeight: '600',
            }}
          >
            In-person
          </Tab>
          <Tab
            _selected={{
              color: 'brand.100',
              bg: 'white',
              boxShadow: '0 0 4px -2px rgba(0,0,0,0.4)',
              borderRadius: '6px',
              fontWeight: '600',
            }}
          >
            Video chat
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel mt="2rem">
            <Text fontWeight={600} mb="1rem">
              Select date
            </Text>
            <DateSliders
              date={date}
              item={item}
              close={close}
              
            />
          </TabPanel>
          <TabPanel>
            <Text>Have a live session with a representative</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ScheduleTabs;
