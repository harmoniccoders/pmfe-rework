import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { InstallmentView, RentReliefView } from 'types/api';
import ViewRentRelief from './ViewRentRelief';
import naira from 'lib/styles/customTheme/components/Generics/Naira';

const ReliefCard = ({ item }: { item: RentReliefView }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  
  return (
    <Box
      w="full"
      py="2rem"
      px="1rem"
      borderRadius="8px"
      overflow="hidden"
      // boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)"
      shadow="xl"
      cursor="pointer"
      onClick={() => setShowModal(true)}
    >
      <Flex justifyContent="space-between" align="center" mb="8">
        <Box>
          <Text opacity=".7" fontSize="14px">
            Relief Amount
          </Text>
          <Text fontWeight="600">
            {naira(item?.reliefAmount as unknown as number)}
           
          </Text>
        </Box>
        <Text
          fontWeight="600"
          textTransform="capitalize"
          bg="gray.100"
          rounded="md"
          px="4"
          py="1"
        >
          {item?.status?.toLowerCase() as unknown as string}
        </Text>
      </Flex>
      <HStack w="full" spacing="4" justify="space-between">
        <Box>
          <Text opacity=".7" fontSize="14px">
            Interest{' '}
          </Text>
          <Text fontWeight="600">{item?.interest}%</Text>
        </Box>
        <Box>
          <Text noOfLines={1} opacity=".7" fontSize="14px">
            Monthly Installments
          </Text>
          <Text fontWeight="600">
            {naira(item?.monthlyInstallment as unknown as number)}
          </Text>
        </Box>
        <Box>
          <Text noOfLines={1} opacity=".7" fontSize="14px">
            Total Repayment
          </Text>
          <Text fontWeight="600">
            {naira(item?.totalRepayment as unknown as number)}
          </Text>
        </Box>
      </HStack>
      <ViewRentRelief
        item={item}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </Box>
  );
};

export default ReliefCard;
