import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { RentReliefView } from 'types/api';
import ViewRentRelief from './Modals/ViewRentRelief';
import naira from 'lib/components/Generics/Naira';

const ReliefCard = ({ item }: { item: RentReliefView }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
 
  return (
    <Box
      w="full"
      py="2rem"
      px="1rem"
      borderRadius="8px"
      overflow="hidden"
      boxShadow="0 5px 5px 2px rgba(0,0,0,0.14)"
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
          color="white"
          bg={item.status === 'PENDING' ? 'brand.600' : '#2FDF84'}
          rounded="md"
          px="4"
          py="1"
        >
          {item?.status}
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
