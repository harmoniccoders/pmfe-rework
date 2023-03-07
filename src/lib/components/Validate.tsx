import { Box, Button, Flex, HStack, Image } from '@chakra-ui/react';
import axios from 'axios';
import PdfDownloader from 'lib/components/Generics/PdfDownloader';
import moment from 'moment';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Transaction } from 'types/api';
import Receipt from './Receipt';

function Validate({ data }: { data: any }) {
  const transaction = data;
  // console.log({ transaction });
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  function closeTab() {
    window.open('about:blank', '_self');
    window.close();
  }

  return (
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
              transaction?.transaction?.paymentLog?.transactionReference || ''
            }`}
          />

          <Button variant="outline" color="white" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="outline" color="white" onClick={closeTab}>
            Go back
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
            amount={(transaction?.transaction?.amount as unknown as number) || 0}
            price={transaction?.property?.price || 0}
            txRef={
              transaction?.transaction?.paymentLog?.transactionReference || ''
            }
            property={`1. ${transaction?.property?.name || ''} - ${
              transaction?.property?.lga || ''
            }`}
            date={moment(transaction?.transaction?.dateCreated).format(
              'DD MMMM YYYY - LT'
            )}
            card={`${
              transaction?.transaction?.paymentLog?.card?.type || ''
            } - ${
              transaction?.transaction?.paymentLog?.card?.last4Digits || ''
            }`}
          />
        </Box>

        <div style={{ display: 'none' }}>
          <Box w="90%" mx="auto" ref={componentRef}>
            <Receipt
              mr={['auto', 'unset']}
              name={`${transaction?.user?.firstName || ''}  ${
                transaction?.user?.lastName || ''
              }`}
              amount={(transaction?.transaction?.amount as unknown as number) || 0}
              price={transaction?.property?.price || 0}
              txRef={
                transaction?.transaction?.paymentLog?.transactionReference || ''
              }
              property={`1. ${transaction?.property?.name || ''} - ${
                transaction?.property?.lga || ''
              }`}
              date={moment(transaction?.transaction?.dateCreated).format(
                'DD MMMM YYYY - LT'
              )}
              card={`${
                transaction?.transaction?.paymentLog?.card?.type || ''
              } - ${
                transaction?.transaction?.paymentLog?.card?.last4Digits || ''
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
          <Button variant="solid" color="white" onClick={closeTab}>
            Go back
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Validate;
