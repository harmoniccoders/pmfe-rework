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
import { FaCheck } from 'react-icons/fa';

type Props = {
  step: number;
};

const iconStyle = {
  color: '#191919',
};

const StepThree = ({ step }: Props) => {
  return (
    <>
      <Flex
        h={[step !== 1 ? '3rem' : '100%', '100%']}
        overflow="hidden"
        justifyContent="space-between"
        width="100%"
      >
        <VStack w={['fit-content']} spacing="0.5rem">
          <Circle
            size="2rem"
            p="0.2rem"
            border={step >= 3 ? '1px solid #2fdf84' : '1px solid #DCE1E7'}
            bgColor={step >= 3 ? '#2fdf84' : 'unset'}
          >
            <Icon
              as={step >= 3 ? FaCheck : TbHourglassHigh}
              w="100%"
              color={step >= 3 ? 'white' : 'brand.50'}
            />
          </Circle>
          <Box
            h="100%"
            w="2px"
            bgColor={step >= 3 ? '#2fdf84' : '#DCE1E7'}
          ></Box>
        </VStack>
        <VStack
          // border="2px solid blue"
          align="flex-start"
          spacing={3}
          width="100%"
          ml="2rem"
          pb={[step !== 3 ? '0' : '3.5rem', '3.5rem']}
          h={[step !== 3 ? '1rem' : '100%', ' 100%']}
          overflow="hidden"
        >
          <Heading fontSize="1rem" lineHeight={1.5}>
            Step 3-Confirmation
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
            disabled={step < 3}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-scroll" />
            </Box>

            <Text>View Receipt</Text>
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
            disabled={step < 4}
          >
            <Box
              pr="10px"
              _groupHover={{
                color: 'white',
              }}
            >
              <Icons iconClass="fa-file-minus" />
            </Box>
            <Text>View Documentation</Text>
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default StepThree;
