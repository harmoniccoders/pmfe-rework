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
import { useRouter } from 'next/router';
const moment = require('moment');

const LandlordRentCard = ({ data }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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
            {data.transaction.property.name}
          </Text>

          <HStack w="100%">
            <Icons iconClass="fa-calendar-day" style={iconStyle} />

            <Text>{`Next rent is due in ${moment(data.rentDueDate).format(
              'DD'
            )} days`}</Text>
          </HStack>
        </VStack>

        <Divider />

        <Box width="90%" height="45px" mx="auto" mt="20px">
          <Button
            width="100%"
            height="100%"
            variant="outline"
            textTransform="capitalize"
            onClick={() => router.push(`/tenancy/landlord/${data.id}`)}
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
