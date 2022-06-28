import {
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  ModalHeader,
  Flex,
  ModalBody,
  Image,
  Box,
  OrderedList,
  ListItem,
  Divider,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import Modals from 'lib/Utils/Modals';

import React, { useState } from 'react';
import { useOperationMethod } from 'react-openapi-client';
import {
  PaymentRatesView,
  PropertyView,
  RentReliefView,
  InstallmentView,
} from 'types/api';

type Props = {
  open: boolean;
  close: any;
  item?: PropertyView;
  nextPayment?: InstallmentView;

  paymentRates?: PaymentRatesView;
  rentRelief?: RentReliefView;
};

const InstructionModal = ({
  open,
  close,
  item,
  paymentRates,
  nextPayment,
  rentRelief,
}: Props) => {
  const [redirect, setRedirect] = useState(false);
  let payData: any;

  if (item) {
    payData = {
      propertyId: item?.id,
      amount: paymentRates?.total,
    };
  }
  if (rentRelief) {
    payData = {
      propertyId: rentRelief?.propertyId,
      amount: nextPayment?.amount,
      rentReliefId: rentRelief?.id,
      installmentId: nextPayment?.id,
    };
  }

  const [initiatePay, { loading, data, error }] =
    useOperationMethod('Paymentinitiate');

  const InitiatePayment = async () => {
    try {
      const result = await (await initiatePay(undefined, payData)).data;

      if (result.status) {
        setRedirect(true);
        setTimeout(() => {
          window.open(result.message);
          close();
          setRedirect(false);
        }, 3000);
      }
    } catch (err) {}
  };
  return (
    <Modals
      isOpen={open}
      onClose={close}
      pmlogo={true}
      content={
        <>
          <Text color="brand.100" fontWeight="bold" mt="1rem">
            Please read the following before you proceed.
          </Text>
          <OrderedList spacing={5} my="1rem" textAlign="justify">
            <ListItem>
              Do not close the payment modal until payment is completed and a
              receipt is generated for you
            </ListItem>
            <ListItem>
              Upon successful payment, a detailed receipt of your purchase will
              be presented to you which you can download or print for reference
              purposes
            </ListItem>
            <ListItem>
              Once payment is confirmed, a documentation of this property will
              be sent to you
            </ListItem>
          </OrderedList>
          <Box textAlign="justify">
            <Text>
              Should incase your payment fails, copy your{' '}
              <em>reference code</em> on the payment portal and contact our
              &nbsp;
              <span style={{ color: '#0042ff' }}>customer service center</span>
              to help resolve all pending and/or failed transactions
            </Text>
            <Text mt="1rem">
              If you do not understand any of this, reach out to our customer
              service center at:
            </Text>
            <Text mt="1rem">
              1st Floor, Providence House, 15 Admiralty Way, Lekki Phase I
              106104, Lagos
            </Text>
          </Box>
          <Flex mt="1rem" align="center" justify="center">
            <Divider w="20%" />
            <Text w="full" textAlign="center">
              Or send us a mail
            </Text>{' '}
            <Divider w="20%" />
          </Flex>
          <Text textAlign="center" fontWeight="600">
            mailto:hello@propertymataaz.com
          </Text>
          <Flex mt="1rem" align="center" justify="center">
            <Divider w="20%" />
            <Text w="full" textAlign="center">
              Or call us on
            </Text>{' '}
            <Divider w="20%" /> <Divider w="20%" />
          </Flex>
          <Text textAlign="center" fontWeight="600">
            +(234) 09090002394 | +(234) 09090002394
          </Text>

          <Box onClick={() => InitiatePayment()}>
            <ButtonComponent
              content="Click proceed to continue"
              isValid={true}
              loading={loading}
            />
          </Box>
          {redirect && (
            <Text textAlign="center">You will be redirected shortly!...</Text>
          )}
        </>
      }
    />
  );
};

export default InstructionModal;
