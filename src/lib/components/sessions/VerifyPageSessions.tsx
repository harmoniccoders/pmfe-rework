import { Box, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import PageTabs from 'lib/styles/customTheme/components/Generics/PageTabs';
import LandSearchModal from 'lib/styles/customTheme/components/Modals/LandSearchModal';
import { useState } from 'react';
import { LandSearchView } from 'types/api';
import CardButton from '../CardButton';
import LandSearchCard from '../LandSearchCard';

function VerifySession({ data }: { data: any }) {
  const [open, setOpen] = useState(false);
  const request = data?.value;

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
        <Box pb="14">
          <Text fontWeight="bold" mt="8" color="brand.100" fontSize="lg">
            Verify
          </Text>
          <SimpleGrid my="5" columns={{ base: 1, md: 2, xl: 3 }} spacing={8}>
            <CardButton
              img="/assets/findProperty.png"
              title="Land Search"
              text="Search for land"
              onClick={() => setOpen(true)}
            />
          </SimpleGrid>
          {request.length > 0 ? (
            <SimpleGrid columns={[1, 2, 2, 3]} spacing="6">
              {request.map((item: LandSearchView) => (
                <LandSearchCard item={item} />
              ))}
            </SimpleGrid>
          ) : (
            <Text mt="3" fontWeight="medium" fontSize=".9rem">
              You currently do not have any land search or verification
              listed...
            </Text>
          )}
        </Box>
      </Box>
      <LandSearchModal isOpen={open} closeModal={() => setOpen(false)} />
    </Box>
  );
}

export default VerifySession;
