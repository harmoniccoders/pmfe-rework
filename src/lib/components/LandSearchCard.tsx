import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import VerifyModal from 'lib/components/Modals/VerifyModal';
import { LandSearchView } from 'types/api/land-search-view';

const LandSearchCard = ({ item }: { item: LandSearchView }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box
      w="full"
      py="2rem"
      px="1rem"
      borderRadius="8px"
      overflow="hidden"
      boxShadow="0 5px 5px 2px rgba(0,0,0,0.14)"
    >
      <VStack align="flex-start" spacing={4}>
        <Flex justifyContent="space-between" alignItems="flex-start" w="full">
          <Box px=".8rem" w="full">
            <Text fontWeight={600} fontSize="17px" textTransform="capitalize">
              {item?.fileName}
            </Text>
            <Text mt="3">{item?.fileNumber}</Text>
          </Box>
         
        </Flex>

        <Divider borderColor="brand.50" />
        <Flex px=".8rem" justify="space-between" w="full">
          <Button
            isDisabled={item?.status !== 'PENDING' ? true : false}
            variant="outline"
            height="40px"
            w="full"
            px="1.8rem"
            color="rgb(37,36,39)"
            onClick={onOpen}
          >
            View Details
          </Button>
        </Flex>
      </VStack>
      <VerifyModal item={item} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default LandSearchCard;
