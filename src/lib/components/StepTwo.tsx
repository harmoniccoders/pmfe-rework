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
import React from 'react';
import Icons from './Icons';
import { TbHourglassHigh } from 'react-icons/tb';
import SubmitApplicationModal from 'lib/styles/customTheme/components/Modals/SubmitApplicationModal';
import { FaCheck } from 'react-icons/fa';
import PaySecurelyModal from 'lib/styles/customTheme/components/Modals/PaySecurelyModal';
import { PaymentRatesView, PropertyModel } from 'types/api';
import RentApplicationModal from 'lib/styles/customTheme/components/Modals/RentApplicationModal';

type Props = {
  applicationData: any;
  data: PropertyModel;
  paymentRates: PaymentRatesView;
};

const iconStyle = {
  color: '#191919',
};

const StepTwo = ({
  applicationData,
  data,

  paymentRates,
}: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: open, onClose: close, onOpen: payOpen } = useDisclosure();

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
            border={
              applicationData?.hasApplied
                ? '1px solid #2fdf84'
                : '1px solid #DCE1E7'
            }
            bgColor={applicationData?.hasApplied ? '#2fdf84' : 'unset'}
          >
            <Icon
              as={
                applicationData?.applicationStatus == 'APPROVED' &&
                applicationData?.hasPaid
                  ? FaCheck
                  : TbHourglassHigh
              }
              w="100%"
              color={applicationData?.hasApplied ? 'white' : 'brand.50'}
            />
          </Circle>
          <Box
            h="100%"
            w="2px"
            bgColor={
              applicationData?.applicationStatus == 'APPROVED' &&
              applicationData?.hasPaid
                ? '#2fdf84'
                : '#DCE1E7'
            }
          ></Box>
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
            disabled={applicationData?.hasApplied}
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

            <Text>
              {applicationData?.applicationStatus == 'ACTIVE'
                ? 'Application has been Submitted'
                : applicationData?.applicationStatus == 'REVIEWED'
                ? 'Application is under review'
                : applicationData?.applicationStatus == 'ACCEPTED'
                ? 'Proceed to payment'
                : applicationData?.applicationStatus == 'APPROVED'
                ? 'Payment approved'
                : applicationData?.applicationStatus == null &&
                  'Submit Application'}
            </Text>
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
            disabled={
              applicationData?.applicationStatus == 'APPROVED' ||
              applicationData?.applicationStatus == null ||
              applicationData?.applicationStatus == 'REVIEWED' ||
              applicationData?.applicationStatus == 'ACTIVE'
            }
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
      {data.isForRent ? (
        <RentApplicationModal onClose={onClose} isOpen={isOpen} data={data} />
      ) : (
        <SubmitApplicationModal onClose={onClose} isOpen={isOpen} data={data} />
      )}
      <PaySecurelyModal
        open={open}
        close={close}
        item={data}
        paymentRates={paymentRates}
      />
    </>
  );
};

export default StepTwo;
