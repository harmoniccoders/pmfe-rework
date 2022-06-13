import {
  Box,
  Divider,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import naira from 'lib/styles/customTheme/components/Generics/Naira';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TableData, TableHead } from './Table';

function Validate() {
  const router = useRouter();

  const tx_ref = router.query.tx_ref;
  const transaction_id = router.query.transaction_id;
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);

  const validatePayment = async () => {
    try {
      const data = await (
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/api/payment/validate/${tx_ref}/${transaction_id}`
        )
      ).data;
      setTransaction(data.data.transaction);
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (router.isReady) {
      validatePayment();
    }
  }, [router.isReady]);
  return (
    <>
      {loading ? (
        <Text textAlign="center" fontSize="600" mt="2rem">
          Validating Payment. Please wait...
        </Text>
      ) : (
        <Flex>
          <Flex
            bgColor="brand.100"
            w="50%"
            h="100vh"
            align="center"
            justify="center"
          >
            <Image src="/assets/paids.gif" w="70%" />
          </Flex>
          <Box w="50%" boxShadow="2px 3px 15px 5px rgba(0,0,0,.01)">
            <Box
              w="80%"
              mx="auto"
              p="3rem 2rem 2rem"
              mb="1.5rem"
              //   h="100vh"
              overflow="hidden"
            >
              <Link href="/" passHref>
                <Image
                  cursor="pointer"
                  src="/assets/PropertyMataaz.png"
                  alt="PropertyMataaz"
                  w={['52']}
                  mx="auto"
                  mb="2rem"
                  // p="1rem"
                />
              </Link>

              <Flex align="center">
                <Box h="3rem" w="45%" bgColor="brand.100" />
                <Box w="40%">
                  <Text
                    fontSize="1.3rem"
                    fontWeight="bold"
                    // px=".5rem"
                    textAlign="center"
                  >
                    Payment Receipt
                  </Text>
                </Box>
                <Box h="3rem" w="15%" bgColor="brand.100" />
              </Flex>
              <Text fontSize="1.2rem" fontWeight="700" my="1.5rem">
                Invoice for:
              </Text>
              <VStack w="100%" spacing={5}>
                <Flex justify="space-between" w="full">
                  <Text fontSize=".8rem" fontWeight="600">
                    Name
                  </Text>
                  <Text
                    fontSize=".8rem"
                    fontWeight="400"
                    textTransform="capitalize"
                  >
                    {`${transaction?.user?.firstName || ''}  ${
                      transaction?.user?.lastName || ''
                    }`}
                  </Text>
                </Flex>
                <Flex justify="space-between" w="full">
                  <Text fontSize=".8rem" fontWeight="600">
                    Date Purchased
                  </Text>
                  <Text fontSize=".8rem" fontWeight="400">
                    {`${
                      moment(transaction?.paymentLog?.createdAt).format(
                        'Do MMM YYYY'
                      ) || ''
                    } - ${
                      moment(transaction?.paymentLog?.createdAt?.time).format(
                        'LT'
                      ) || ''
                    }`}
                  </Text>
                </Flex>
                <Flex justify="space-between" w="full">
                  <Text fontSize=".8rem" fontWeight="600">
                    Payment Method
                  </Text>
                  <Text fontSize=".8rem" fontWeight="400">
                    {`${transaction?.paymentLog?.card?.type || ''} - ${
                      transaction?.paymentLog?.card?.first6Digits || ''
                    }`}
                  </Text>
                </Flex>
                <Flex justify="space-between" w="full">
                  <Text fontSize=".8rem" fontWeight="600">
                    Transaction Reference
                  </Text>
                  <Text fontSize=".8rem" fontWeight="400">
                    {transaction?.paymentLog?.transactionReference || ''}
                  </Text>
                </Flex>
              </VStack>
              <Divider my="2rem" />
              <Text fontSize="1rem" fontWeight="700" mb="1.5rem">
                Product
              </Text>
              <TableContainer border="1px solid rgba(0,0,0,.1)">
                <Table variant="striped" colorScheme="blue">
                  <Thead>
                    <Tr>
                      <TableHead title="Item Name" />
                      {/* <TableHead title="Quantity" /> */}
                      <TableHead title="Price" />
                      <TableHead title="Tax" />
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <TableData
                        name={`1. ${transaction?.property?.name || ''} - ${
                          transaction?.property?.lga || ''
                        }`}
                      />
                      {/* <TableData name="1" /> */}
                      <TableData
                        name={naira(transaction?.property?.price || '')}
                      />
                      <TableData
                        name={naira(transaction?.property?.price * 0.075 || '')}
                      />
                    </Tr>
                  </Tbody>
                </Table>
                <Flex
                  justifyContent="space-between"
                  align="center"
                  w="40%"
                  ml="auto"
                  h="3rem"
                  px="2rem"
                  //   mb="1rem"
                  color="white"
                  bgColor="brand.100"
                >
                  <Text fontSize="1.1rem" fontWeight="600">
                    Total
                  </Text>
                  <Text fontSize="1.1rem" fontWeight="400">
                    {naira(transaction?.amount || '')}
                  </Text>
                </Flex>
              </TableContainer>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Validate;
