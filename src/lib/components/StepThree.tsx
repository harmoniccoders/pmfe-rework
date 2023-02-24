import {
  VStack,
  Heading,
  Button,
  Flex,
  Circle,
  Box,
  Icon,
  Text,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Icons from './Icons';
import { TbHourglassHigh } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa';
import { DataAccess } from 'lib/Utils/Api';
import Cookies from 'js-cookie';
import { useToasts } from 'react-toast-notifications';
import ReceiptModal from './Modals/ReceiptModal';

type Props = {
  applicationData: any;
};

const iconStyle = {
  color: '#191919',
};

const StepThree = ({ applicationData }: Props) => {
  const payment =
    applicationData.status === 'SOLD' || applicationData.status === 'INACTIVE';
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [receiptData, setReceiptData] = useState<any>();

  const loadReceipt = async () => {
    const bearer = `Bearer ${Cookies.get('token')}`;
    const _dataAccess = new DataAccess(bearer);
    setLoading(true);
    try {
      const result = await _dataAccess.get(
        `/api/Property/property/receipt/${applicationData.id}`
      );
      // console.log(result);
      if (result.status) {
        setLoading(false);
        setReceiptData(result.data);
        onOpen();
        console.log({ result });
        return;
      }
      setLoading(false);
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (error: any) {
      addToast(error.body || error.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  return (
    <>
      <Flex
        h={['100%', '100%']}
        overflow="hidden"
        justifyContent="space-between"
        width="100%"
      >
        <VStack w={['fit-content']} spacing="0.5rem">
          <Circle
            size="2rem"
            p="0.2rem"
            border={payment ? '1px solid #2fdf84' : '1px solid #DCE1E7'}
            bgColor={payment ? '#2fdf84' : 'unset'}
          >
            <Icon
              as={payment ? FaCheck : TbHourglassHigh}
              w="100%"
              color={payment ? 'white' : 'brand.50'}
            />
          </Circle>
          <Box h="100%" w="2px" bgColor={payment ? '#2fdf84' : '#DCE1E7'}></Box>
        </VStack>
        <VStack
          align="flex-start"
          spacing={3}
          width="100%"
          ml="2rem"
          pb={['3.5rem', '3.5rem']}
          h={['100%', ' 100%']}
          overflow="hidden"
        >
          <Heading fontSize="1rem" lineHeight={1.5}>
            Step 3-Confirmation
          </Heading>

          <Button
            variant="outline"
            width="100%"
            fontSize="13px"
            color="brand.900"
            role="group"
            disabled={!payment}
            onClick={loadReceipt}
            isLoading={loading}
            justifyContent={loading ? 'center' : 'flex-start'}
          >
            <HStack align="center">
              <Box
                pr="10px"
                _groupHover={{
                  color: 'white',
                }}
              >
                <Icons iconClass="fa-scroll" />
              </Box>

              <Text>View Receipt</Text>
            </HStack>
          </Button>

          <Button
            variant="outline"
            width="100%"
            fontSize="13px"
            color="brand.900"
            justifyContent="flex-start"
            role="group"
            display="flex"
            alignItems="center"
            disabled={!payment}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-file-minus" />
            </Box>
            <Text>View Documentation</Text>
          </Button>
        </VStack>
      </Flex>
      <ReceiptModal open={isOpen} close={onClose} data={receiptData} />
    </>
  );
};

export default StepThree;
