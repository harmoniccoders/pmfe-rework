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
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React from 'react';
import { Cleaning, CleaningQuote, CleaningView } from 'types/api';
import moment from 'moment';

type Props = {
  isOpen?: any;
  onClose?: any;
  data: CleaningView;
};

const CleanDetailsModal = ({ isOpen, onClose, data }: Props) => {
  console.log(data.cleaningQuote);

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
                {data.buildingType}
                <Flex alignItems="center" mt=".5rem">
                  <Icons iconClass="fa-calendar" style={{ color: 'blue' }} />
                  <Text fontSize="13px" ml=".5rem" fontWeight="500">
                    {moment(data.dateCreated).format('Do MMMM YYYY')}
                  </Text>
                </Flex>
              </Heading>
              <Box>
                <Text fontSize="1rem" fontWeight="bold">
                  Quote
                </Text>
                <Text fontSize=".8rem" fontWeight="400">
                  &#8358;
                  {data.cleaningQuote !== null ? data.cleaningQuote?.quote : 0}
                </Text>
              </Box>
              <Box>
                <Text fontSize="1rem" fontWeight="bold">
                  Proposed Date
                </Text>
                <Flex alignItems="center" mt=".5rem">
                  <Icons iconClass="fa-calendar" style={{ color: 'blue' }} />
                  <Text fontSize=".8rem" fontWeight="400" ml=".5rem">
                    {data.cleaningQuote === null
                      ? 'Awaiting Approval'
                      : moment(data.cleaningQuote?.proposedDate).format(
                          'Do MMMM YYYY'
                        )}
                  </Text>
                </Flex>
              </Box>
              <Button
                variant="solid"
                textTransform="capitalize"
                height="40px"
                width="100%"
              >
                Accept Quote
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CleanDetailsModal;
