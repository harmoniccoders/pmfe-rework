import { Box, Flex, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ApplicationView } from 'types/api';
import ViewRentRelief from './ViewRentRelief';

const ReliefCard = ({ items }: {items: ApplicationView}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <Box
      w="full"
      py="2rem"
      px="1rem"
      borderRadius="8px"
      overflow="hidden"
      boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)"
      cursor="pointer"
      onClick={() => setShowModal(true)}
    >
      <Flex justifyContent="space-between" align="center" mb="8">
        <Box>
          <Text opacity=".7" fontSize="14px">
            Relief Amount
          </Text>
          <Text fontWeight="600">₦4,500,000</Text>
        </Box>
        <Text fontWeight="600" bg="gray.100" rounded="md" px="4" py="1">
          Pending
        </Text>
      </Flex>
      <HStack w="full" spacing="4" justify="space-between">
        <Box>
          <Text opacity=".7" fontSize="14px">
            Interest{' '}
          </Text>
          <Text fontWeight="600">15% </Text>
        </Box>
        <Box>
          <Text opacity=".7" fontSize="14px">
            Monthly Instalments
          </Text>
          <Text fontWeight="600">₦797,062</Text>
        </Box>
        <Box>
          <Text opacity=".7" fontSize="14px">
            Total Repayment
          </Text>
          <Text fontWeight="600">₦4,782,372</Text>
        </Box>
      </HStack>
      <ViewRentRelief isOpen={showModal} onClose={() => setShowModal(false)} />
    </Box>
  );
};

export default ReliefCard;