import { Box, Button, VStack, HStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { PropertyModel } from 'types/api';
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

type Props = {
  data: PropertyModel;
  date?: InspectionDateView;
};

const SingleEnquiry = ({ data, date }: Props) => {
  const [cancel, { loading, data: isData, error }] = useOperationMethod(
    'Userenquirecancel{PropertyId}'
  );
  const [applicationStatus, setApplicationStatus] = useState<any>();

  const { addToast } = useToasts();
  const router = useRouter();

  const CancelEnquiry = async () => {
    const params: Parameters = {
      PropertyId: data.id as number,
    };

    try {
      const result = await (await cancel(params)).data;
      console.log({ result });
      if (result.status) {
        addToast(result.message, {
          appearance: 'success',
          autoDismiss: true,
        });
        router.pathname.startsWith('/rent')
          ? router.push('/rent/listed-property')
          : router.push('/buy');

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

  const [
    getApplication,
    { loading: appLoading, data: appData, error: isError },
  ] = useOperationMethod('Applicationgetuserproperty{propertyId}');

  useEffect(() => {
    const GetApplication = async () => {
      const params: Parameters = {
        propertyId: data.id as number,
      };
      try {
        const result = await (await getApplication(params)).data;
        console.log({ result });
      } catch (err) {
        console.log(err);
      }
    };
    GetApplication();
  }, []);
  console.log({ appData });
  const resultData = appData?.data;

  console.log(resultData);

  useEffect(() => {
    const fetchData = async () => {
      const bearer = `Bearer ${Cookies.get('token')}`;
      const _dataAccess = new DataAccess(bearer);

      try {
        const result = (
          await _dataAccess.get(`/api/Application/get/user/property/${data.id}`)
        ).data;

        console.log(result);
        setApplicationStatus(result);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <HStack
      w="90%"
      mx="auto"
      alignItems="flex-start"
      py="1rem"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <Box w={{ base: 'full', md: 'full', lg: '45%', xl: '28%' }}>
        <VStack w="100%" alignItems="flex-start" spacing="0rem" px="1.2rem">
          <StepOne
            appData={appData}
            date={date}
            data={data}
            step={step}
            setStep={setStep}
          />
          <StepTwo
            step={step}
            appData={resultData}
            setStep={setStep}
            applicationData={applicationStatus}
            data={data}
          />
          <StepThree step={step} />
        </VStack>

        <Button
          width="100%"
          my="40px"
          fontSize="15px"
          color="brand.900"
          variant="outline"
          onClick={() => CancelEnquiry()}
          isLoading={loading}
        >
          Cancel Request
        </Button>
      </Box>

      <Box
        w={{ base: 'full', lg: '72%' }}
        borderLeft={{ base: '0', lg: '2px solid #DCE1E7' }}
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
