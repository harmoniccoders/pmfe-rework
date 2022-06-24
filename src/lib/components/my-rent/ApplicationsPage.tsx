import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import ReliefCard from 'lib/components/ReliefCard';
import { useOperationMethod } from 'react-openapi-client';
import { Application, RentReliefView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import TenantInfo from '../TenantInfo';
import Pagination from '../Pagination';
import { date } from 'yup';
import DateSliders from '../DateSliders';
import AllApplications from './AllApplications';
import AcceptedApplication from './AcceptedApplication';
import RejectedApplication from './RejectedApplication';

function ApplicationsPage({ data }: { data: any }) {
  console.log({ data });
  const result = data?.value;

  return (
    <Box w="100%" my="3rem">
      <Box w="90%" mx="auto">
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
              All
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
              Accepted
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
              Rejected
            </Tab>
          </TabList>

          <TabPanels mt="2rem">
            <TabPanel>
              <AllApplications result={result} data={data} />
            </TabPanel>
            <TabPanel>
              <AcceptedApplication result={result} />
            </TabPanel>
            <TabPanel>
              <RejectedApplication result={result} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default ApplicationsPage;
