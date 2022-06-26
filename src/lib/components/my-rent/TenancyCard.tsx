import React from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Icons from '../Icons';
import TenancyModal from 'lib/styles/customTheme/components/Modals/my-rent/TenancyModal';
import { ComplaintsCategory, TenancyView } from 'types/api';
import moment from 'moment';
type Props = {
  category: ComplaintsCategory[];
  data: TenancyView;
};

const TenancyCard = ({ category, data }: Props) => {
  console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const iconStyle = {
    color: '#0042ff',
    fontSize: '14px',
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
           
            {data?.property?.name}
          </Text>

          <HStack w="100%">
            <Icons iconClass="fa-calendar-day" style={iconStyle} />

            <Text fontSize="14px">{`Next rent is due in ${moment(
              data.rentDueDate
            ).diff(moment(data.transaction?.dateCreated), 'day')} days`}</Text>
          </HStack>
        </VStack>

        <Divider />

        <Box width="90%" height="45px" mx="auto" mt="20px">
          <Button
            width="100%"
            height="100%"
            variant="outline"
            textTransform="capitalize"
            onClick={onOpen}
          >
            view details
          </Button>
        </Box>
      </Box>

      <TenancyModal
        isOpen={isOpen}
        onClose={onClose}
        category={category}
        propertyData={data}
      />
    </Box>
  );
};

export default TenancyCard;
