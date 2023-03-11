import { Box, Button, VStack, HStack, useDisclosure } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PaymentRatesView, PropertyModel } from 'types/api';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import PropertyInfo from './PropertyInfo';
import { InspectionDateView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { DataAccess } from 'lib/Utils/Api';
import Cookies from 'js-cookie';
import CancelEnquiryModal from './Modals/CancelEnquiryModal';
import { useNonInitialEffect } from './Generics/useNonInitialEffect';

type Props = {
  data: PropertyModel;
  date?: InspectionDateView;
  paymentRates: PaymentRatesView;
  isBuy: boolean;
  isRent: boolean;
  result: any;
  inspection: any;
};

const SingleEnquiry = ({
  data,
  date,
  paymentRates,
  isBuy,
  isRent,
  result,
  inspection,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const reloadPage = () => {
    if (document.hidden) {
      console.log('hidden');
    } else {
      console.log('shown');
      router.reload();
    }
  };
  const router = useRouter();
  useEffect(() => {
    document.addEventListener('visibilitychange', reloadPage);
  }, []);

  return (
    <HStack
      w={['full', '90%']}
      mx="auto"
      alignItems="flex-start"
      py="1rem"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box w={{ base: 'full', md: 'full', lg: '45%', xl: '28%' }}>
        <VStack w="100%" alignItems="flex-start" spacing="0rem" px="1.2rem">
          <StepOne date={date} data={data} inspection={inspection} />
          <StepTwo
            applicationData={result}
            paymentRates={paymentRates}
            data={data}
            isBuy={isBuy}
            isRent={isRent}
          />
          <StepThree applicationData={data} />
        </VStack>

        <Box w="90%" mx="auto">
          <Button
            width="100%"
            m="40px auto"
            fontSize="15px"
            color="brand.900"
            variant="outline"
            onClick={onOpen}
          >
            Cancel Request
          </Button>
        </Box>
      </Box>

      <Box
        w={{ base: '90%', lg: '72%' }}
        mx={{ base: 'auto !important' }}
        borderLeft={{ base: '0', lg: '2px solid #DCE1E7' }}
        mt={['1rem !important', '0']}
      >
        <PropertyInfo data={data} />
      </Box>
      <CancelEnquiryModal isOpen={isOpen} onClose={onClose} item={data} />
    </HStack>
  );
};

export default SingleEnquiry;
