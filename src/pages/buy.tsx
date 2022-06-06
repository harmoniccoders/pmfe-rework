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
import axios from 'axios';
import Listed from 'lib/components/Listed';
import RequestProperty from 'lib/styles/customTheme/components/RequestProperty';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { PropertyModel } from 'types/api';

const buy = ({ data }: { data: PropertyModel[] }) => {
  return (
    <Box w="100%" mt="30px">
      <Box w="90%" mx="auto">
        <Heading fontSize="16px" lineHeight={1.5}>
          Find a property to buy with the safety of 103% money back guarantee
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
              <Listed data={data} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  let { url } = ctx.query;
  url = 'limit=8&offset=0';
  try {
    const data = (await _dataAccess.get(`/api/Property/list?${url}`)).data;
    // console.log({ data });

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
