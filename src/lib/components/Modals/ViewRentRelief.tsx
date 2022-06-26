import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Heading,
  HStack,
  Button,
  VStack,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { RentReliefView } from 'types/api';
import naira from 'lib/components/Generics/Naira';
import moment from 'moment';
import InstructionModal from './InstructionModals';

interface Props {
  isOpen: boolean;
  item: RentReliefView;

  onClose: () => void;
}

const ViewRentRelief = ({ isOpen, onClose, item }: Props) => {
  const { isOpen: isOpened, onClose: onClosed, onOpen } = useDisclosure();

  const paymentHistory = item?.installments?.filter(
    (x) => x.status !== 'PENDING'
  );
  let outstaningBalance = 0;
  let paidAmount = 0;

  if (item.installments !== null && item.installments !== undefined) {
    item?.installments?.forEach((x) => {
      if (x?.status === 'PENDING') {
        outstaningBalance += x.amount as unknown as number;
      } else {
        paidAmount += x.amount as unknown as number;
      }
    });
  }
  const nextPayment = item?.installments?.find((x) => x.status === 'PENDING');
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="lg"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="auto"
        h="100vh"
        pos="fixed"
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
          <Box px={[1, 4]} py="5">
            <VStack>
              <Text>Amount to pay</Text>
              <Heading fontSize="1.5rem">
                {naira(item?.totalRepayment as unknown as number)}
              </Heading>
              <SimpleGrid columns={2} pt="5" spacing="5">
                <VStack w="full">
                  <Text mb="2">Outstanding Balance</Text>
                  <Text
                    bg="brand.100"
                    color="white"
                    w="full"
                    textAlign="center"
                    py="2"
                    rounded="lg"
                  >
                    {naira(outstaningBalance as number)}
                  </Text>
                </VStack>
                <VStack>
                  <Text mb="2">Next Payment Date</Text>
                  <Text
                    bg="brand.100"
                    color="white"
                    textAlign="center"
                    py="2"
                    w="full"
                    rounded="lg"
                  >
                    {item.status === 'PENDING'
                      ? moment(nextPayment?.dateDue).format('D/MM/YY')
                      : '-'}
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
            <VStack w="full" spacing="5" mt="8">
              <Text>Repayment Progress</Text>
              <SimpleGrid
                w="full"
                border="1px solid"
                columns={item?.installments?.length}
              >
                {item.installments?.map((x, index) => (
                  <Box
                    bg={x.status === 'PENDING' ? 'blue.50' : 'brand.100'}
                    h="20px"
                    borderRight={
                      index ===
                      (item?.installments?.length as unknown as number) - 1
                        ? 'unset'
                        : '1px solid'
                    }
                    key={x.id}
                  ></Box>
                ))}
              </SimpleGrid>
              <Flex justifyContent="space-between" w="full">
                <Text fontWeight="600">{naira(paidAmount as number)}</Text>
                <Text fontWeight="600">
                  {naira(outstaningBalance as number)}
                </Text>
              </Flex>
            </VStack>
            <Button
              variant="outline"
              my="7"
              color="black"
              w="full"
              disabled={item.status === 'COMPLETED'}
              onClick={onOpen}
            >
              Make a payment
            </Button>
            <VStack align="flex-start" spacing="5">
              <Heading fontSize="17px">Payment History</Heading>

              {(paymentHistory?.length as unknown as number) > 0 ? (
                <>
                  {paymentHistory?.map((x, index) => {
                    return (
                      <HStack
                        align="flex-start"
                        border="1px solid"
                        w="full"
                        p="3"
                        borderColor="gray.300"
                        rounded="md"
                      >
                        <Text color="white" bg="green.400" rounded="full" p="3">
                          <FaArrowUp />
                        </Text>
                        <Box>
                          <Heading fontSize="16px">
                            {moment.localeData().ordinal(index + 1)} Installment
                          </Heading>

                          <Text>
                            Paid on the {moment(x?.paidOn).format('D/MM/YY')}{' '}
                            via Flutterwave
                          </Text>
                        </Box>
                        <Heading fontSize="16px">
                          + {naira(x.amount as unknown as number)}{' '}
                        </Heading>
                      </HStack>
                    );
                  })}
                </>
              ) : (
                <Text>No payments made</Text>
              )}
            </VStack>
          </Box>
        </ModalBody>
        <InstructionModal
          open={isOpened}
          close={onClosed}
          nextPayment={nextPayment}
          rentRelief={item}
        />
      </ModalContent>
    </Modal>
  );
};

export default ViewRentRelief;
