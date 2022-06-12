import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { PropertyModel } from 'types/api';
import Icons from './Icons';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import PropertyInfo from './PropertyInfo';
import { InspectionDateView } from 'types/api';

type Props = {
  data: PropertyModel;
  date?: InspectionDateView;
};

const SingleEnquiry = ({ data, date }: Props) => {
  return (
    <HStack w="90%" mx="auto" alignItems="flex-start" py="1rem">
      <Box w="40%">
        <VStack
          w="100%"
          alignItems="flex-start"
          spacing="0rem"
          // borderLeft="2px solid #DCE1E7"
          px="1.2rem"
        >
          <StepOne date={date} />
          <StepTwo />
          <StepThree />
        </VStack>

        <Button
          width="100%"
          my="40px"
          fontSize="15px"
          color="brand.900"
          variant="outline"
        >
          Cancel Request
        </Button>
      </Box>

      <Box w="65%" borderLeft="2px solid #DCE1E7">
        <PropertyInfo data={data} />
      </Box>
    </HStack>
  );
};

export default SingleEnquiry;
