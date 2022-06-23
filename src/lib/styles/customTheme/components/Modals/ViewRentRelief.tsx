import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Image,
  Text,
  Center,
  Heading,
  HStack,
  Button,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';
import { RentReliefView } from 'types/api';
import naira from 'lib/styles/customTheme/components/Generics/Naira';
import moment from 'moment';

interface Props {
  isOpen: boolean;
  item: RentReliefView;
  onClose: () => void;
}

// const outstaningBalance = item?.installments?.reduce(
//   (prev: number, curr: InstallmentView) => {
//     if (curr.status !== 'PENDING') {
//       return prev + curr.amount;
//     }
//     return;
//   }
// );
// let outStandingBalance: number;
// item?.installments?.forEach((x) => {
//   if (x?.status !== 'PENDING') {
//     outStandingBalance += x.amount;
//   }
// });

// console.log(outStandingBalance);
const ViewRentRelief = ({ isOpen, onClose, item }: Props) => {
  const paymentHistory = item?.installments?.filter(
    (x) => x.status !== 'PENDING'
  );
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
                <Box>
                  <Text mb="2">Outstaning Balance</Text>
                  <Text
                    bg="brand.100"
                    color="white"
                    textAlign="center"
                    py="2"
                    rounded="lg"
                  >
                    {naira(item?.reliefAmount as unknown as number)}
                  </Text>
                </Box>
                <Box>
                  <Text mb="2">Next Payment Date</Text>
                  <Text
                    bg="brand.100"
                    color="white"
                    textAlign="center"
                    py="2"
                    rounded="lg"
                  >
                    23/03/21
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
            <VStack w="full" spacing="5" mt="8">
              <Text>Repayment Progress</Text>
              <SimpleGrid w="full" border="1px solid" rounded="lg" columns={6}>
                <Box
                  bg="brand.100"
                  h="20px"
                  borderRight="1px solid"
                  roundedLeft="lg"
                ></Box>
                <Box bg="blue.50" h="20px" borderRight="1px solid"></Box>
                <Box bg="blue.50" h="20px" borderRight="1px solid"></Box>
                <Box bg="blue.50" h="20px" borderRight="1px solid"></Box>
                <Box bg="blue.50" h="20px" borderRight="1px solid"></Box>
                <Box bg="blue.50" h="20px" roundedRight="lg"></Box>
              </SimpleGrid>
              <Flex justifyContent="space-between" w="full">
                <Text fontWeight="600">₦782,372</Text>
                <Text fontWeight="600">₦4,782,372</Text>
              </Flex>
            </VStack>
            <Button variant="outline" my="7" color="black" w="full">
              Make a payment
            </Button>
            <VStack align="flex-start" spacing="5">
              <Heading fontSize="17px">Payment History</Heading>

              {paymentHistory?.length > 0 ? (
                <>
                  
                  {paymentHistory?.map((x) => {
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
                          <Heading fontSize="16px">1st Instalment</Heading>

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
                'No payment made'
              )}
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewRentRelief;
