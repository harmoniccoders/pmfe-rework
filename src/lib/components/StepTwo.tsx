import {
  VStack,
  Heading,
  Button,
  Flex,
  Circle,
  Box,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Icons from './Icons';
import { TbHourglassHigh } from 'react-icons/tb';

type Props = {};

const iconStyle = {
  color: '#191919',
};

const StepTwo = (props: Props) => {
  return (
    <>
      <Flex h="100%" justifyContent="space-between" width="100%">
        <VStack w="8px" spacing="0.5rem">
          <Circle size="2rem" p="0.2rem" border="1px solid #DCE1E7">
            <Icon as={TbHourglassHigh} w="100%" color="brand.50" />
          </Circle>
          <Box h="100%" w="2px" bgColor="#DCE1E7"></Box>
        </VStack>

        <VStack
          // border="2px solid blue"
          align="flex-start"
          spacing={3}
          width="100%"
          ml="2rem"
          pb="3.5rem"
        >
          <Heading fontSize="1rem" lineHeight={1.5}>
            Step 2-Payment
          </Heading>

          <Button
            variant="outline"
            width="100%"
            fontSize="15px"
            color="brand.900"
            justifyContent="flex-start"
            role="group"
            display="flex"
            alignItems="center"
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
            fontSize="15px"
            color="brand.900"
            justifyContent="flex-start"
            role="group"
            display="flex"
            alignItems="center"
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
    </>
  );
};

export default StepTwo;
