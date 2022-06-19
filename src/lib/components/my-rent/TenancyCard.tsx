import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Icons from '../Icons';
import TenancyModal from 'lib/styles/customTheme/components/Modals/my-rent/TenancyModal';

type Props = {};

const TenancyCard = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w="100%"
      boxShadow="0 20px 25px 4px rgba(0,0,0,0.14)"
      py="25px"
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
            <Icons iconClass="fa-calendar-day" />

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
            onClick={onOpen}
          >
            view details
          </Button>
        </Box>
      </Box>

      <TenancyModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TenancyCard;
