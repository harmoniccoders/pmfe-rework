import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Button,
  Text,
  Box,
  Heading,
  VStack,
  HStack,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React from 'react';
import { CleaningView } from 'types/api';
import moment from 'moment';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { Parameters } from 'openapi-client-axios';
import naira from '../Generics/Naira';
import Modals from 'lib/Utils/Modals';

type Props = {
  isOpen?: any;
  onClose?: any;
  item: CleaningView | any;
};

const CleanDetailsModal = ({ isOpen, onClose, item }: Props) => {
  const [reject, { loading: isLoading, data: rData, error: rErr }] =
    useOperationMethod('Cleanquotereject{id}');
  const [accept, { loading, data, error }] = useOperationMethod(
    'Cleanquoteaccept{id}'
  );

  const quote = item.cleaningQuotes[item.cleaningQuotes.length - 1];

  const { addToast } = useToasts();
  const router = useRouter();

  const RejectQuote = async () => {
    const params: Parameters = {
      id: quote.id as number,
    };

    try {
      const result = await (await reject(params)).data;
      if (result.status) {
        addToast('Action successful', {
          appearance: 'error',
          autoDismiss: true,
        });
        onClose();
        router.reload();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      onClose();
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  const AcceptQuote = async () => {
    const params: Parameters = {
      id: quote.id as number,
    };

    try {
      const result = await (await accept(params)).data;
      if (result.status) {
        addToast('Action successful', {
          appearance: 'success',
          autoDismiss: true,
        });
        onClose();
        router.reload();
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      onClose();
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      content={
        <>
          <VStack align="flex-start" spacing={6}>
            <Heading fontSize="16px" mt="30px" textTransform="capitalize">
              {item.buildingType}
              <Flex alignItems="center" mt=".5rem">
                <Icons iconClass="fa-calendar" style={{ color: 'blue' }} />
                <Text fontSize="13px" ml=".5rem" fontWeight="500">
                  {moment(item?.dateCreated).format('Do MMMM YYYY')}
                </Text>
              </Flex>
            </Heading>
            <Box>
              <Text fontSize="1rem" fontWeight="bold">
                Quote
              </Text>
              <Text fontSize=".8rem" fontWeight="400">
                <>{naira((quote?.quote as unknown as number) || 0)}</>
              </Text>
            </Box>
            <Box>
              <Text fontSize="1rem" fontWeight="bold">
                Proposed Date
              </Text>
              <Flex alignItems="center" mt=".5rem">
                <Icons iconClass="fa-calendar" style={{ color: 'blue' }} />
                <Text fontSize=".8rem" fontWeight="400" ml=".5rem">
                  {item.cleaningQuote === null
                    ? 'Awaiting Approval'
                    : moment(quote?.proposedDate).format('Do MMMM YYYY')}
                </Text>
              </Flex>
            </Box>
            <HStack w="full" spacing={5}>
              <Button
                variant="outline"
                height="40px"
                width="full"
                color="rgb(37,36,39)"
                textTransform="uppercase"
                onClick={() => RejectQuote()}
                isLoading={isLoading}
                disabled={
                  item.cleaningQuotes === null || item.cleaningQuotes.length < 1
                    ? true
                    : false
                }
              >
                Reject Quote
              </Button>
              <Button
                variant="solid"
                height="40px"
                width="full"
                textTransform="uppercase"
                onClick={() => AcceptQuote()}
                isLoading={loading}
                color="white"
                disabled={
                  item.cleaningQuotes === null || item.cleaningQuotes.length < 1
                    ? true
                    : false
                }
              >
                Accept Quote
              </Button>
            </HStack>
          </VStack>
        </>
      }
    />
  );
};

export default CleanDetailsModal;
