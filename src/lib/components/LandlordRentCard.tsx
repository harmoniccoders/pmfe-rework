import {
  Grid,
  Text,
  Divider,
  VStack,
  useDisclosure,
  HStack,
  Box,
  Button,
} from '@chakra-ui/react';
import Icons from './Icons';
import LandlordModal from 'lib/styles/customTheme/components/Modals/LandlordModal';

const LandlordRentCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const iconStyle = {
    color: '#0042ff',
  };

  return (
    <Box
      w="100%"
      boxShadow="0 5px 5px 2px rgba(0,0,0,0.14)"
      py="15px"
      borderRadius="8px"
    >
      <Box w="100%">
        <VStack alignItems="flex-start" spacing={4} mx="auto" my="20px" w="90%">
          <Text
            w="200px"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontWeight={600}
            lineHeight={1.5}
          >
            4 Bedroom duplex with BQ
          </Text>

          <HStack w="100%">
            <Icons iconClass="fa-calendar-day" style={iconStyle} />

            <Text>Next rent is due in 365 days</Text>
          </HStack>
        </VStack>

        <Divider />

        <Box width="90%" height="45px" mx="auto" mt="20px">
          <Button
            width="100%"
            height="100%"
            variant="outline"
            textTransform="capitalize"
          >
            view details
          </Button>
        </Box>
      </Box>
      <LandlordModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default LandlordRentCard;
