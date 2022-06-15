import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PropertyModel } from 'types/api';
import Icons from './Icons';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import PropertyInfo from './PropertyInfo';
import { InspectionDateView } from 'types/api';
import { Parameters } from 'openapi-client-axios';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';

type Props = {
  data: PropertyModel;
  date?: InspectionDateView;
};

const SingleEnquiry = ({ data, date }: Props) => {
  const [cancel, { loading, data: isData, error }] = useOperationMethod(
    'Propertyenquirycancel{propertyId}'
  );
  const { addToast } = useToasts();
  const router = useRouter();

  const CancelEnquiry = async () => {
    const params: Parameters = {
      propertyId: data.id as number,
    };

    try {
      const result = await (await cancel(params)).data;

      if (result.status) {
        addToast(result.message, {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('/buy');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const [step, setStep] = useState(2);
  return (
    <HStack
      w="90%"
      mx="auto"
      alignItems="flex-start"
      py="1rem"
      flexDirection={['column', 'row']}
    >
      <Box w={['full', '28%']}>
        <VStack
          w="100%"
          alignItems="flex-start"
          spacing="0rem"
          // borderLeft="2px solid #DCE1E7"
          px="1.2rem"
        >
          <StepOne date={date} data={data} step={step} setStep={setStep} />
          <StepTwo step={step} setStep={setStep} data={data} />
          <StepThree step={step} />
        </VStack>

        <Button
          width="100%"
          my="40px"
          fontSize="15px"
          color="brand.900"
          variant="outline"
          display={['none', 'block']}
          onClick={() => CancelEnquiry()}
          isLoading={loading}
        >
          Cancel Request
        </Button>
      </Box>

      <Box
        w={['full', '72%']}
        borderLeft={['0', '2px solid #DCE1E7']}
        mt={['1rem !important', '0']}
      >
        <PropertyInfo data={data} />
      </Box>
      <Button
        width="100%"
        my="40px !important"
        fontSize="15px"
        color="brand.900"
        display={['block', 'none']}
        variant="outline"
        onClick={() => CancelEnquiry()}
        isLoading={loading}
      >
        Cancel Request
      </Button>
    </HStack>
  );
};

export default SingleEnquiry;
