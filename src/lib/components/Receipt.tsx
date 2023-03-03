import {
  Box,
  Image,
  Flex,
  Text,
  VStack,
  Divider,
  TableContainer,
  Table,
  Tr,
  Thead,
  Tbody,
} from '@chakra-ui/react';
import naira from 'lib/components/Generics/Naira';
import Link from 'next/link';
import React from 'react';
import { TableData, TableHead } from './Table';

type ReceiptProps = {
  name: string | number | undefined | null;
  amount: string | number | undefined | null;
  price: string | number | undefined | null;
  txRef: string | undefined | null;
  property: any;
  date: any;
  card: string | undefined | null;
  mr?: string | [string, string];
  p?: string;
};
function Receipt({
  name,
  amount,
  price,
  txRef,
  property,
  date,
  card,
  mr,
  p = '3rem 2rem 2rem',
}: ReceiptProps) {
  return (
    <Box
      w={['full', '93%']}
      ml="auto"
      mr={mr}
      p={p}
      mb={['1rem', '0rem']}
      minH="50vh"
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
        />
      </Link>
      <Flex align="center">
        <Box h="3rem" w="45%" bgColor="brand.100" />
        <Flex w="40%" alignItems="center" justifyContent="center">
          <Text fontSize="1.3rem" fontWeight="bold" textAlign="center">
            Payment Receipt
          </Text>
        </Flex>
        <Box h="3rem" w="15%" bgColor="brand.100" />
      </Flex>
      <Box>
        <Text fontSize="1.2rem" fontWeight="700" my="1.5rem" px="1rem">
          Invoice for:
        </Text>
        <VStack w="100%" spacing={5} px="1rem">
          <Flex justify="space-between" w="full">
            <Text fontSize=".8rem" fontWeight="600">
              Name
            </Text>
            <Text fontSize=".8rem" fontWeight="400" textTransform="capitalize">
              {name}
            </Text>
          </Flex>
          <Flex justify="space-between" w="full">
            <Text fontSize=".8rem" fontWeight="600">
              Date Purchased
            </Text>
            <Text fontSize=".8rem" fontWeight="400">
              {date}
            </Text>
          </Flex>
          <Flex justify="space-between" w="full">
            <Text fontSize=".8rem" fontWeight="600">
              Payment Method
            </Text>
            <Text fontSize=".8rem" fontWeight="400">
              {card}
            </Text>
          </Flex>
          <Flex justify="space-between" w="full">
            <Text fontSize=".8rem" fontWeight="600">
              Transaction Reference
            </Text>
            <Text fontSize=".8rem" fontWeight="400">
              {txRef}
            </Text>
          </Flex>
        </VStack>
        <Divider my="2rem" />
        <Text fontSize="1rem" fontWeight="700" mb="1.5rem" px="1rem">
          Product
        </Text>
        <TableContainer border="1px solid rgba(0,0,0,.1)">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <TableHead title="Item Name" />

                <TableHead title="Price" />
                <TableHead title="Tax" />
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <TableData name={property} />

                <TableData name={naira(price as unknown as number)} />
                <TableData name={'15%'} />
              </Tr>
            </Tbody>
          </Table>
          <Flex
            justifyContent="space-between"
            align="center"
            w={['full', '30%']}
            ml="auto"
            h="3rem"
            px="2rem"
            mt="1rem"
            color="white"
            bgColor="brand.100"
          >
            <Text fontSize="1.1rem" fontWeight="600">
              Total
            </Text>
            <Text fontSize="1.1rem" fontWeight="400">
              {naira(amount as unknown as number)}
            </Text>
          </Flex>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Receipt;
