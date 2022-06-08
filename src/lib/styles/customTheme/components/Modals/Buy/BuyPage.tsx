import { Box, Flex, Heading, HStack } from '@chakra-ui/react';
import Listed from 'lib/components/Listed';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PropertyModel } from 'types/api';

function BuyPage({ data }: { data: PropertyModel[] }) {
  const router = useRouter();
  const [inPage, setInPage] = useState('buy');

  const navigatePage = (url: string) => {
    router.push(`/${url}`);
  };
  return (
    <Box w="100%" mt="30px">
      <Box w="90%" mx="auto">
        {inPage === 'buy' && (
          <Heading fontSize="16px" lineHeight={1.5} mb="2rem">
            Find a property to buy with the safety of 103% money back guarantee
          </Heading>
        )}
        <HStack
          w="full"
          h="3rem"
          borderRadius="8px"
          bgColor="brand.50"
          spacing={0}
          align="center"
          p=".2rem"
          mb="2.5rem"
        >
          <Flex
            w="full"
            align="center"
            justify="center"
            cursor="pointer"
            fontWeight="bold"
            borderRadius="8px"
            color={router.asPath === '/buy' ? 'brand.100' : 'inherit'}
            bgColor={router.asPath === '/buy' ? 'white' : 'transparent'}
            h="full"
            onClick={() => navigatePage('buy')}
          >
            Listed Properties
          </Flex>
          <Flex
            w="full"
            align="center"
            justify="center"
            cursor="pointer"
            fontWeight="bold"
            borderRadius="8px"
            color={router.asPath === '/request' ? 'brand.100' : 'inherit'}
            bgColor={router.asPath === '/request' ? 'white' : 'transparent'}
            h="full"
            onClick={() => navigatePage('request')}
          >
            Request Property
          </Flex>
        </HStack>
        {inPage === 'buy' && <Listed data={data} />}
      </Box>
    </Box>
  );
}

export default BuyPage;
