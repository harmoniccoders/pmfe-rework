import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import CleanProperty from '../clean/CleanProperty';

function VerifySession({
  data,
}: {
  data: any;
 
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
            Verify
          </Text>
          {data.length > 0 ? (
            <CleanProperty requests={data} />
          ) : (
          <Heading mt="3" fontWeight="medium" fontSize=".9rem">
            You currently do not have any land search or verification listed...
          </Heading>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default VerifySession;
