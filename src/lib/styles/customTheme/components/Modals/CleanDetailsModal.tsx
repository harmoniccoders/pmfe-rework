import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  Button,
  Text,
  Image,
  Box,
  Badge,
  Heading,
  Grid,
  GridItem,
  VStack,
  HStack,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React from 'react';
import { Cleaning, CleaningQuote, CleaningView } from 'types/api';
import moment from 'moment';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { Parameters } from 'openapi-client-axios';

type Props = {
  isOpen?: any;
  onClose?: any;
  item: CleaningView;
};

const CleanDetailsModal = ({ isOpen, onClose, item }: Props) => {
  const [reject, { loading: isLoading, data: rData, error: rErr }] =
    useOperationMethod('Cleanquotereject{id}');
  const [accept, { loading, data, error }] = useOperationMethod(
    'Cleanquoteaccept{id}'
  );

  const { addToast } = useToasts();
  const router = useRouter();

  const RejectQuote = async () => {
    const params: Parameters = {
      id: item.id as number,
    };
    console.log(params);
    try {
      const result = await (await reject(params)).data;
      if (result.status) {
        addToast('Action Succesful', {
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
    } catch (err) {
      //   onClose();
      console.log(err);
    }
  };
  const AcceptQuote = async () => {
    const params: Parameters = {
      id: item.id as number,
    };
    console.log(params);
    try {
      const result = await (await accept(params)).data;
      if (result.status) {
        addToast('Action Succesful', {
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
    } catch (err) {
      //   onClose();
      console.log(err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered

      // scrollBehavior="outside"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        w={['88%', '80%']}
        overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              onClick={onClose}
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px' }}
              ></span>
              Back
            </Text>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Box maxH="77vh" overflowY="auto" px={5}>
            <VStack align="flex-start" spacing={6}>
              <Heading fontSize="16px" mt="30px" textTransform="capitalize">
                {item.buildingType}
                <Flex alignItems="center" mt=".5rem">
                  <Icons iconClass="fa-calendar" style={{ color: 'blue' }} />
                  <Text fontSize="13px" ml=".5rem" fontWeight="500">
                    {moment(item.dateCreated).format('Do MMMM YYYY')}
                  </Text>
                </Flex>
              </Heading>
              <Box>
                <Text fontSize="1rem" fontWeight="bold">
                  Quote
                </Text>
                <Text fontSize=".8rem" fontWeight="400">
                  &#8358;
                  {item.cleaningQuote !== null ? item.cleaningQuote?.quote : 0}
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
                      : moment(item.cleaningQuote?.proposedDate).format(
                          'Do MMMM YYYY'
                        )}
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
                  disabled={item.cleaningQuote === null ? true : false}
                >
                  Reject Quote
                </Button>
                <Button
                  variant="solid"
                  height="40px"
                  width="full"
                  color="rgb(37,36,39)"
                  textTransform="uppercase"
                  onClick={() => AcceptQuote()}
                  isLoading={loading}
                  disabled={item.cleaningQuote === null ? true : false}
                >
                  Accept Quote
                </Button>
              </HStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CleanDetailsModal;
