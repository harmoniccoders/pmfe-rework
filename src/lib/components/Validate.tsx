import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import naira from 'lib/styles/customTheme/components/Generics/Naira';
import PdfDownloader from 'lib/styles/customTheme/components/Generics/PdfDownloader';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TableData, TableHead } from './Table';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Transaction } from 'types/api';
import Receipt from './Receipt';

function Validate() {
  const router = useRouter();
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const tx_ref = router.query.tx_ref;
  const transaction_id = router.query.transaction_id;
  const [transaction, setTransaction] = useState<Transaction>();
  const [loading, setLoading] = useState(false);

  const validatePayment = async () => {
    // setLoading(true);
    try {
      const data = await (
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/api/payment/validate/${tx_ref}/${transaction_id}`
        )
      ).data;
      setLoading(false);
      setTransaction(data.data.transaction);
      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      validatePayment();
    }
  }, [router.isReady]);
  return (
    <>
      {loading ? (
        <Text textAlign="center" fontSize="600" mt="2rem">
          Validating Payment. Please wait...
        </Text>
      ) : (
        <Flex>
          <Flex
            bgColor="brand.100"
            w="50%"
            minH="100vh"
            align="center"
            justify="center"
            pl="2rem"
            zIndex="2"
            display={['none', 'flex']}
            flexDirection="column"
          >
            <Image src="/assets/paids.gif" w="70%" />
            <HStack gap={6}>
              <PdfDownloader
                rootElementId="receipt"
                downloadFileName={`${transaction?.property?.name || ''}-${
                  transaction?.paymentLog?.transactionReference || ''
                }`}
              />

              <Button variant="outline" color="white" onClick={handlePrint}>
                Print
              </Button>
            </HStack>
          </Flex>
          <Box
            pos="absolute"
            h="100vh"
            w="10rem"
            bgColor="brand.100"
            left="37%"
            zIndex="1"
            display={['none', 'block']}
          />

          <Box w={['full', '60%']}>
            <Box w="full" mx="auto" id="receipt">
              <Receipt
                mr={['auto', 'unset']}
                name={`${transaction?.user?.firstName || ''}  ${
                  transaction?.user?.lastName || ''
                }`}
                amount={(transaction?.amount as unknown as number) || 0}
                price={transaction?.property?.price || 0}
                txRef={transaction?.paymentLog?.transactionReference || ''}
                property={`1. ${transaction?.property?.name || ''} - ${
                  transaction?.property?.lga || ''
                }`}
                date={`${
                  moment(
                    new Date(transaction?.paymentLog?.createdAt as string)
                  ).format('Do MMM YYYY') || ''
                } - ${
                  moment(
                    new Date(
                      transaction?.paymentLog?.createdAt as string
                    ).getTime()
                  ).format('LT') || ''
                }`}
                card={`${transaction?.paymentLog?.card?.type || ''} - ${
                  transaction?.paymentLog?.card?.last4Digits || ''
                }`}
              />
            </Box>

            <div style={{ display: 'none' }}>
              <Box w="90%" mx="auto" ref={componentRef}>
                <Receipt
                  mr="auto"
                  name={`${transaction?.user?.firstName || ''}  ${
                    transaction?.user?.lastName || ''
                  }`}
                  amount={(transaction?.amount as unknown as number) || 0}
                  price={
                    (transaction?.property?.price as unknown as number) || 0
                  }
                  txRef={transaction?.paymentLog?.transactionReference || ''}
                  property={`1. ${transaction?.property?.name || ''} - ${
                    transaction?.property?.lga || ''
                  }`}
                  date={`${
                    moment(
                      new Date(transaction?.paymentLog?.createdAt as string)
                    ).format('Do MMM YYYY') || ''
                  } - ${
                    moment(
                      new Date(
                        transaction?.paymentLog?.createdAt as string
                      ).getTime()
                    ).format('LT') || ''
                  }`}
                  card={`${transaction?.paymentLog?.card?.type || ''} - ${
                    transaction?.paymentLog?.card?.last4Digits || ''
                  }`}
                />
              </Box>
            </div>
            <HStack
              gap={6}
              justify="space-between"
              mb="2rem"
              w="full"
              px={8}
              display={['flex', 'none']}
            >
              <PdfDownloader
                rootElementId="receipt"
                downloadFileName={`${transaction?.property?.name || ''}-${
                  transaction?.paymentLog?.transactionReference || ''
                }`}
              />

              <Button variant="solid" color="white" onClick={handlePrint}>
                Print
              </Button>
            </HStack>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Validate;
