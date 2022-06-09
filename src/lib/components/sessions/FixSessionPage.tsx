import { Box, Center, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import MyListings from 'lib/styles/customTheme/components/Listings/MyListings';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  PropertyView,
} from 'types/api';
import CleanProperty from '../clean/CleanProperty';

function FixSession({
  fix,
}: {
  fix: any;
}) {
  return (
    <Box w="100%" mt="3rem">
      <Box w="90%" mx="auto">
        <HStack
          w="full"
          h="3rem"
          borderRadius="8px"
          bgColor="brand.50"
          spacing={0}
          align="center"
          p=".2rem"
          mb="2.5rem"
        >
          <PageTabs tabName="sessions/clean" tabTitle="Clean" />
          <PageTabs tabName="sessions/fix" tabTitle="Fix" />
          <PageTabs tabName="sessions/verify" tabTitle="Verify" />
        </HStack>
        <Box>
          <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
            Fix
          </Text>
          {fix.length > 0 ? (
            <CleanProperty requests={fix} />
          ) : (
          <Heading mt="3" fontWeight="medium" fontSize=".9rem">
            You currently do not have any fix request listed...
          </Heading>
           )} 
        </Box>
      </Box>
    </Box>
  );
}

export default FixSession;
