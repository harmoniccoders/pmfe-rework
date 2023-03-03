import { HStack, Button, Box } from '@chakra-ui/react';
import Modals from 'lib/Utils/Modals';
import moment from 'moment';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ReceiptView } from 'types/api';
import PdfDownloader from '../Generics/PdfDownloader';
import Receipt from '../Receipt';

type Props = {
  open: boolean;
  close: any;
  data?: ReceiptView;
};

const ReceiptModal = ({ open, close, data }: Props) => {
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  function closeTab() {
    close();
  }
  return (
    <Modals
      isOpen={open}
      onClose={close}
      pmlogo={false}
      width="50%"
      h="90vh"
      pb="1rem"
      showBack={false}
      content={
        <>
          <Box ref={componentRef} id="receipt">
            <Receipt
              mr="auto"
              p="0rem 2rem 2rem"
              name={data?.fullName}
              amount={data?.amount}
              price={data?.property?.price}
              txRef={data?.paymentLog?.transactionReference}
              property={`1. ${data?.property?.name} - ${data?.property?.address}`}
              date={moment(data?.paymentDate).format('DD MMMM YYYY - LT')}
              card={`${data?.paymentLog?.card?.type} - ${data?.paymentLog?.card?.last4Digits}`}
            />
          </Box>
          <HStack
            gap={6}
            justify="space-between"
            // mb="2rem"
            w="full"
            px={8}
            // display={['flex', 'none']}
          >
            <PdfDownloader
              rootElementId="receipt"
              variant="solid"
              downloadFileName={`${data?.property?.name || ''}-${
                data?.paymentLog?.transactionReference || ''
              }`}
            />

            <Button variant="solid" color="white" onClick={handlePrint}>
              Print
            </Button>
            <Button variant="solid" color="white" onClick={closeTab}>
              Close
            </Button>
          </HStack>
        </>
      }
    />
  );
};

export default ReceiptModal;
