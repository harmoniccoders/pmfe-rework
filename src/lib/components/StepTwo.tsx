import {
  VStack,
  Heading,
  Button,
  Flex,
  Circle,
  Box,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Icons from './Icons';
import { TbHourglassHigh } from 'react-icons/tb';
import SubmitApplicationModal from 'lib/styles/customTheme/components/Modals/SubmitApplicationModal';
import { FaCheck } from 'react-icons/fa';
import PaySecurelyModal from 'lib/styles/customTheme/components/Modals/PaySecurelyModal';
import { PropertyModel } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';

type Props = {
  step: number;
  setStep: any;
  data: PropertyModel;
};

const iconStyle = {
  color: '#191919',
};

const StepTwo = ({ step, setStep, data }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: open, onClose: close, onOpen: payOpen } = useDisclosure();

  const [getApplication, { loading: isLoading, data: isData, error: isError }] =
    useOperationMethod('Applicationget{id}');

  useEffect(() => {
    const GetApplication = async () => {
      const params: Parameters = {
        id: data.id as number,
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

  return (
    <>
      <Flex
        h={[step !== 1 && step !== 2 ? '3rem' : '100%', '100%']}
        overflow="hidden"
        justifyContent="space-between"
        width="100%"
      >
        <VStack w={['fit-content']} spacing="0.5rem">
          <Circle
            size="2rem"
            p="0.2rem"
            border={step >= 1 ? '1px solid #2fdf84' : '1px solid #DCE1E7'}
            bgColor={step >= 1 ? '#2fdf84' : 'unset'}
          >
            <Icon
              as={step >= 1 ? FaCheck : TbHourglassHigh}
              w="100%"
              color={step >= 1 ? 'white' : 'brand.50'}
            />
          </Circle>
          <Box
            h="100%"
            w="2px"
            bgColor={step >= 1 ? '#2fdf84' : '#DCE1E7'}
          ></Box>
        </VStack>

        <VStack
          // border="2px solid blue"
          align="flex-start"
          spacing={3}
          width="100%"
          ml="2rem"
          pb={[step !== 1 && step !== 2 ? '0' : '3.5rem', '3.5rem']}
          h={[step !== 1 && step !== 2 ? '1rem' : '100%', ' 100%']}
          overflow="hidden"
        >
          <Heading fontSize="1rem" lineHeight={1.5}>
            Step 2-Payment
          </Heading>

          <Button
            variant="outline"
            width="100%"
            fontSize="13px"
            color="brand.900"
            justifyContent="flex-start"
            role="group"
            display="flex"
            alignItems="center"
            disabled={step < 1}
            onClick={onOpen}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-paper-plane" />
            </Box>

            <Text> Submit Application</Text>
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
            disabled={step < 2}
            onClick={payOpen}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-lock" />
            </Box>

            <Text>Pay Securely</Text>
          </Button>
        </VStack>
      </Flex>

      <SubmitApplicationModal
        onClose={onClose}
        isOpen={isOpen}
        data={data}
        setStep={setStep}
      />
      <PaySecurelyModal
        open={open}
        close={close}
        setStep={setStep}
        item={data}
      />
    </>
  );
};

export default StepTwo;
