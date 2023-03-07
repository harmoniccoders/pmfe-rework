import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';
import DateSliders from './DateSliders';
import { InspectionDateView, InspectionView, PropertyView } from 'types/api';
import moment from 'moment';
import 'react-clock/dist/Clock.css';

import dynamic from 'next/dynamic';
//@ts-ignore
const Clock = dynamic(() => import('react-clock'), {
  ssr: false,
});

type Props = {
  date?: InspectionDateView | undefined;
  item?: PropertyView;
  close: any;
  status: InspectionView;
};

const ScheduleTabs = ({ date, item, close, status }: Props) => {
  console.log({ status });

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
            {status !== undefined ? (
              <>
                <Text fontWeight={600} mb="1rem">
                  Selected Inspection Date
                </Text>
                <HStack gap="1rem">
                  <VStack
                    justifyContent="center"
                    width="fit-content"
                    borderRadius="8px"
                    p="1rem"
                    height="100%"
                    cursor="none"
                    pointerEvents="none"
                    align="flex-start"
                    border="2px solid"
                  >
                    <Text
                      fontWeight={600}
                      fontSize="16px"
                      textTransform="uppercase"
                    >
                      {moment(status.inspectionDate?.date).format('ddd')}
                    </Text>
                    <Text fontWeight={600} fontSize="16px">
                      {moment(status.inspectionDate?.date).format('MMM DD')}
                    </Text>
                  </VStack>
                  <VStack>
                    <Clock
                      value={
                        new Date(status.inspectionTime?.time as unknown as Date)
                      }
                      size={80}
                    />
                    <Box>
                      {moment(status.inspectionTime?.time).format('LT')}
                    </Box>
                  </VStack>
                </HStack>
              </>
            ) : (
              <>
                <Text fontWeight={600} mb="1rem">
                  Select date
                </Text>
                <DateSliders date={date} item={item} close={close} />
              </>
            )}
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
